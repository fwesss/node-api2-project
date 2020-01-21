/* eslint-disable no-console */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
import { crudControllers } from '../../utils/crud'
import Post, {
  findPostComments,
  findById,
  insertComment,
  findCommentById,
} from './post.model'

export const getComments = itemNames => async (req, res) => {
  try {
    const comments = await findPostComments(req.params.id)
    if (comments.length) {
      res.status(200).json(comments)
    } else {
      res.status(404).json({
        message: `The ${itemNames[0]} with the specified ID does not exist.`,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: `The ${itemNames[1]} information could not be retrieved.`,
    })
  }
}

export const createComment = itemNames => async (req, res) => {
  if (req.body.text) {
    try {
      const posts = await findById(req.params.id)
      if (posts.length) {
        try {
          const addedComment = await insertComment({
            ...req.body,
            post_id: req.params.id,
          })
          const updateRes = await findCommentById(addedComment.id)
          res.status(201).json(updateRes)
        } catch {
          res.status(500).json({
            error: `There was an error while saving the ${itemNames[0]} to the database`,
          })
        }
      } else {
        res.status(404).json({
          message: `The ${itemNames[1]} with the specified ID does not exist.`,
        })
      }
    } catch {
      res.status(500).json({
        error: `The ${itemNames[1]} information could not be retrieved.`,
      })
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: `Please provide text for the ${itemNames[0]}.` })
  }
}

export default crudControllers(Post)
