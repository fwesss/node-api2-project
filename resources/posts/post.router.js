/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import Router from 'express'
import controllers, { getComments, createComment } from './post.controllers'

const router = Router()

router
  .route('/')
  .get(controllers.getMany('post'))
  .post(controllers.createOne(['title, contents, post']))

router
  .route('/:id')
  .get(controllers.getOne('post'))
  .put(controllers.updateOne(['title, contents, post']))
  .delete(controllers.removeOne('post'))

router
  .route('/:id/comments')
  .get(getComments(['post, comment']))
  .post(createComment(['comment, post']))

export default router
