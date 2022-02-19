const Joi = require('joi')
const BaseModel = require('./base-model')
// const { Question } = require('../models')

module.exports = class QuizModel extends BaseModel {
  constructor() {
    super('Quiz', {
      theme: Joi.string().required(),
      name: Joi.string().required(),
    })
  }

  // get() {
  //   const res = []
  //   console.log(Question.get())
  //   const questions = Question.get()
  //   console.log('2')
  //   const quizzes = super.get()
  //   console.log(quizzes, questions)
  //   quizzes.forEach((quiz) => {
  //     let index = 0
  //     res.push({ ...quiz, questions: [] })
  //     questions.forEach((question) => {
  //       if (question.quizId === quiz.id) {
  //         res[index].questions.push(question)
  //       }
  //     })
  //     index += 1
  //   })
  //   return res
  // }
  //
  // getById(id) {
  //   const res = []
  //   const questions = Question.get()
  //   const quiz = super.getById(id)
  //   res.push({ ...quiz, questions: [] })
  //   questions.forEach((question) => {
  //     if (question.quizId === quiz.id) {
  //       res[0].questions.push(question)
  //     }
  //   })
  //   return res
  // }
}
