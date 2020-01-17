import Router from 'express'
import {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
} from '../data/db'

const router = Router()

router.post('/', ({ body, body: { title, contents } }, res) =>
  !title || !contents
    ? res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      })
    : insert(body)
        .then(post => res.status(201).json(post))
        .catch(() =>
          res.status(500).json({
            error: 'There was an error while saving the post to the database',
          })
        )
)

router.post('/:id/comments', ({ body, body: { text }, params: { id } }, res) =>
  !text
    ? res
        .status(400)
        .json({ errorMessage: 'Please provide text for the comment.' })
    : findById(id).then(posts =>
        posts.length > 0
          ? insertComment({ ...body, post_id: id })
              .then(comment => res.status(201).json({ comment }))
              .catch(() =>
                res.status(500).json({
                  error:
                    'There was an error while saving the comment to the database',
                })
              )
          : res.status(404).json({
              message: 'The post with the specified ID does not exist.',
            })
      )
)

router.get('/', (_req, res) =>
  find()
    .then(posts => res.status(200).json({ posts }))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' })
    )
)

export default router
