import api from '../../lib/api.js'

const getQuestions = async (type_quiz) => {
  const quiz = await api.get(`/showing-questions?type=${type_quiz}`)
  return quiz
}

export default getQuestions