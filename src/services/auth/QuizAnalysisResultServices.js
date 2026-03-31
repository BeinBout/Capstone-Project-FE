import api from "../../lib/api";

/**
 * Mengambil hasil analisis quiz persona awal berdasarkan quiz id
 * Pada flow utama, hasil AI sudah dikembalikan langsung dari setupProfileAndQuiz.
 * @param {number} quizId
 * @returns {Promise}
 */
export const getQuizResult = async (quizId) => {
    const response = await api.get(`/profile-and-inpe/${quizId}`);
    return response.data;
};