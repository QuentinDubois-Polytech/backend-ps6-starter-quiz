const { Router } = require('express')
const {
  Quiz,
  Question,
} = require('../../models')

const QuestionsRouter = require('./questions')

const router = new Router()
router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = Quiz.get()
    quizzes.forEach((quiz) => {
      quiz.questions = Question.get().filter((q) => q.quizId !== quiz.quizId)
    })
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId)
    quiz.questions = Question.get().filter((q) => q.quizId !== quiz.quizId)
    res.status(200).json(Quiz.getById(req.params.quizId))
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
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(200).json('Success the quiz has been deleted')
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400).json(err)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.update(req.params.quizId, { ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(400).json(err)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
