import api from "../../lib/api.js";

// Get all journals
export const getAllJournals = async (month = null, year = null) => {
    const response = await api.get("/daily-journal", {
        params: {
            ...(month && { month }), 
            ...(year && { year })
        }
    });
    return response.data;
};

// Get journal by ID
export const getJournalById = async (id) => {
    const response = await api.get(`/daily-journal/${id}`);
    return response.data;
};

// Create new journal
export const createJournal = async (payload) => {
    const response = await api.post("/daily-journal", payload);
    return response.data;
};