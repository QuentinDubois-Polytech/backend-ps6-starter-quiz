const { Router } = require('express')
const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = Question.getById(req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400).json(err)
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body, quizId: parseInt(req.params.quizId, 10) })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = Question.update(req.params.questionId, { ...req.body })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400).json(err)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    Question.delete(req.params.questionId)
    res.status(200).json('Success the question has been deleted')
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400).json(err)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
