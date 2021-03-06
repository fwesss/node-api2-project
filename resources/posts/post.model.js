import knex from 'knex'
import config from '../../knexfile'

const db = knex(config.development)

export const find = () => db('posts')

export const findById = id => db('posts').where({ id: Number(id) })

export const insert = post =>
  db('posts')
    .insert(post, 'id')
    .then(ids => ({ id: ids[0] }))

export const update = id => post =>
  db('posts')
    .where('id', Number(id))
    .update(post)

export const remove = id =>
  db('posts')
    .where('id', Number(id))
    .del()

export const findPostComments = postId =>
  db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId)

export const findCommentById = id =>
  db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id)

export const insertComment = comment =>
  db('comments')
    .insert(comment)
    .then(ids => ({ id: ids[0] }))

export default {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
}
