import api from '../../lib/api.js'

export const getWeeklyQuestions = async () => {
  const response = await api.get('/showing-questions?type=weekly')
  return response
}

export const submitWeeklyCheckup = async (quizAnswers) => {
  const response = await api.post('/weekly-checkup', {
    quiz_answers: quizAnswers
  })
  return response
}
