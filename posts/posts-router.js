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

export default router
