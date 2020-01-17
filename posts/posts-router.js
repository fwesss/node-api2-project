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
  title && contents
    ? insert(body)
        .then(post => res.status(201).json(post))
        .catch(() =>
          res.status(500).json({
            error: 'There was an error while saving the post to the database',
          })
        )
    : res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      })
)

router.post('/:id/comments', ({ body, body: { text }, params: { id } }, res) =>
  text
    ? findById(id).then(posts =>
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
    : res
        .status(400)
        .json({ errorMessage: 'Please provide text for the comment.' })
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

router.get('/:id', ({ params: { id } }, res) =>
  findById(id)
    .then(posts =>
      posts.length > 0
        ? res.status(200).json({ post: posts[0] })
        : res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    )
)

router.get('/:id/comments', ({ params: { id } }, res) =>
  findById(id).then(posts =>
    posts.length > 0
      ? findPostComments(id)
          .then(comments => res.status(200).json({ comments }))
          .catch(() =>
            res.status(500).json({
              error: 'The comments information could not be retrieved.',
            })
          )
      : res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' })
  )
)

export default router
