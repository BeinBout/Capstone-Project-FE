import api from "../../lib/api";
import { supabase } from "../../lib/supabase";

export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

// trigger Supabase OAuth, lalu kirim data ke BE
export const loginWithGoogle = async () => {
    // Trigger Google OAuth via Supabase (redirect-based)
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/callback`,
        },
    });

    if (error) throw error;
    // Supabase akan redirect browser ke Google, lalu balik ke /auth/callback
};

// Dipanggil setelah redirect balik dari Google
export const handleOAuthCallback = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) throw error || new Error('No session');

    const { user } = session;

    // Kirim ke Express BE untuk disimpan ke DB utama
    const response = await api.post("/auth/google-oauth", {
        email: user.email,
        nama_lengkap: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
        google_id: user.user_metadata?.sub || user.id,
    });

    return response.data;
};

export const logoutUser = async () => {
    await supabase.auth.signOut(); // logout dari Supabase juga
    const response = await api.post("/auth/logout");
    return response.data;
};