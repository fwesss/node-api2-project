/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import Router from 'express'
import controllers, { getComments, createComment } from './post.controllers'

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

router
  .route('/:id/comments')
  .get(getComments)
  .post(createComment)

export default router
