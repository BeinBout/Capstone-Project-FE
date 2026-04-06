import api from '../../lib/api.js'

export const getWeeklyQuestions = async () => {
  const response = await api.get('/showing-questions?type=weekly')
  return response
}

export const submitWeeklyCheckup = async (payload) => {
  const response = await api.post('/weekly-checkup', payload)
  return response
}
