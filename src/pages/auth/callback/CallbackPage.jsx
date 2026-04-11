import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleOAuthCallback } from "../../../services/auth/LoginServices";
import useAuth from "../../../hooks/useAuth";

export default function CallbackPage() {
    const navigate = useNavigate();
    const { refreshAuth } = useAuth();
    const [error, setError] = useState("");

    useEffect(() => {
        const processCallback = async () => {
            try {
                const data = await handleOAuthCallback();

                localStorage.setItem("token", data.data.token);

                const authOk = await refreshAuth();
                if (!authOk) {
                    setError("Gagal memverifikasi sesi login. Silakan coba lagi.");
                    setTimeout(() => navigate("/login"), 2000);
                    return;
                }

                if (data.data.has_completed_quiz) {
                    navigate("/dashboard");
                } else {
                    navigate("/quiz");
                }
            } catch {
                setError("Login Google gagal. Silakan coba lagi.");
                setTimeout(() => navigate("/login"), 3000);
            }
        };

        processCallback();
    }, [navigate, refreshAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#A8C4E9" }}>
            <div className="text-center">
                {error ? (
                    <p style={{ color: "#c0392b" }}>{error}</p>
                ) : (
                    <p style={{ color: "#4a6285" }}>Memproses login Google...</p>
                )}
            </div>
        </div>
    );
}