/* eslint-disable no-console */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
export const getOne = model => async (req, res) => {
  try {
    const items = await model.findById(req.params.id)
    if (items.length) {
      res.status(200).json({ data: items[0] })
    } else {
      res.status(404).json({
        message: 'The post with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' })
  }
}

export const getMany = model => async (_req, res) => {
  try {
    const items = await model.find()
    res.status(200).json(items)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' })
  }
}

export const createOne = model => async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    })
  } else {
    try {
      const createdItem = await model.insert(req.body)
      res.status(201).json(createdItem)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      })
    }
  }
}

export const updateOne = model => async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    })
  } else {
    try {
      const updated = await model.update(req.params.id)(req.body)
      if (updated) {
        res.status(200).json((await model.findById(req.params.id))[0])
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: 'The post information could not be modified.',
      })
    }
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const count = await model.remove(req.params.id)
    if (count) {
      res.status(200).json({ message: `This post has been deleted` })
    } else {
      res.status(404).json({
        message: 'The post with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The post could not be removed' })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
