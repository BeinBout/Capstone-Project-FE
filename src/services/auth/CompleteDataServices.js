import api from "../../lib/api";

/**
 * Setup profil dan kuis persona awal
 * @param {{
 *   nama_lengkap: string,
 *   umur: number,
 *   berat_badan: number,
 *   tinggi_badan: number,
 *   quiz_answers: Array<{ question_id: number, selected_option_id: number }>
 * }} payload
 * @returns {Promise}
 */
export const setupProfileAndQuiz = async (payload) => {
    const response = await api.post("/profile-and-inpe", payload);
    return response.data;
};