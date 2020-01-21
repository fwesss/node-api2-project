/* eslint-disable no-console */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
export const getOne = model => itemName => async (req, res) => {
  try {
    const items = await model.findById(req.params.id)
    if (items.length) {
      res.status(200).json({ data: items[0] })
    } else {
      res.status(404).json({
        message: `The ${itemName} with the specified ID does not exist.`,
      })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: `The ${itemName} information could not be retrieved.` })
  }
}

export const getMany = model => itemName => async (_req, res) => {
  try {
    const items = await model.find()
    res.status(200).json(items)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: `The ${itemName} information could not be retrieved.` })
  }
}

export const createOne = model => itemNames => async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.state(400).json({
      errorMessage: `Please provide ${itemNames[0]} and ${itemNames[1]} for the ${itemNames[2]}.`,
    })
  } else {
    try {
      const createdItem = await model.insert(req.body)
      res.status(201).json(createdItem)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: `There was an error while saving the ${itemNames[2]} to the database`,
      })
    }
  }
}

export const updateOne = model => itemNames => async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.state(400).json({
      errorMessage: `Please provide ${itemNames[0]} and ${itemNames[1]} for the ${itemNames[2]}.`,
    })
  } else {
    try {
      const updatedPost = await model.update(req.params.id)(req.body)
      if (updatedPost) {
        res.status(200).json(updatedPost)
      } else {
        res.status(404).json({
          message: `The ${itemNames[2]} with the specified ID does not exist.`,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: `The ${itemNames[2]} information could not be modified.`,
      })
    }
  }
}

export const removeOne = model => itemName => async (req, res) => {
  try {
    const count = await model.remove(req.params.id)
    if (count.length) {
      res.status(200).json({ message: `This ${itemName} has been deleted` })
    } else {
      res.status(404).json({
        message: `The ${itemName} with the specified ID does not exist.`,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `The ${itemName} could not be removed` })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
