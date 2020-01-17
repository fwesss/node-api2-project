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

export default router
