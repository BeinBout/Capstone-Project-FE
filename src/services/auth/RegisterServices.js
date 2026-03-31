import api from "../../lib/api";
import { supabase } from "../../lib/supabase";

/**
 * Register
 * @param {{ username: string, email: string, password: string }} registerData
 * @returns {Promise}
 */
export const registerUser = async (registerData) => {
    const response = await api.post("/auth/register", registerData);
    return response.data;
};

/**
 * Register dengan Google OAuth
 * @returns {Promise}
 */
export const RegisterWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/callback`,
        },
    });

    if (error) throw error;
};