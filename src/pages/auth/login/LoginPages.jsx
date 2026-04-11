import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../../../services/auth/LoginServices";
import DiagonalPattern from "../../../components/ui/pattern/DiagonalPattern";

const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
);

export default function LoginPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.data.token);
            if (data.data.has_completed_quiz) {
                navigate("/dashboard");
            } else {
                navigate("/quiz");
            }
        } catch (err) {
            const message = err.response?.data?.message || "Login failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch {
            setError("Gagal memulai login Google. Coba lagi.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: "#A8C4E9" }}
        >
            {/* Card */}
            <div
                className="relative w-full max-w-[560px] rounded-3xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#B8D0EE" }}
            >
                <DiagonalPattern />

                {/* Content */}
                <div className="relative z-10 px-6 sm:px-10 md:px-16 py-10 sm:py-12">
                    {/* Title */}
                    <h1
                        className="text-center text-2xl sm:text-3xl font-semibold mb-1"
                        style={{ color: "#2d3748", fontFamily: "'Segoe UI', sans-serif" }}
                    >
                        Login
                    </h1>
                    <p className="text-center text-sm mb-8" style={{ color: "#5a7a9c" }}>
                        Welcome back! Please log in to access your account.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div
                            className="mb-4 px-4 py-2 rounded-xl text-sm text-center"
                            style={{ backgroundColor: "rgba(255, 100, 100, 0.15)", color: "#c0392b" }}
                        >
                            {error}
                        </div>
                    )}

                    {/* Fields */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                        {/* Email */}
                        <div
                            className="flex-1 min-w-0 flex items-center rounded-full px-5 py-3"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.75)",
                                border: "1.5px solid #1a1a1a",
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none border-0"
                                style={{ color: "#4a6285" }}
                            />
                        </div>

                        {/* Password */}
                        <div
                            className="flex-1 min-w-0 flex items-center rounded-full px-5 py-3"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.75)",
                                border: "1.5px solid #1a1a1a",
                            }}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                className="flex-1 min-w-0 bg-transparent text-sm outline-none border-0"
                                style={{ color: "#4a6285" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 hover:bg-black/10 transition-colors"
                            >
                                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-center mb-5">
                        <a href="#" className="text-sm underline" style={{ color: "#5a7a9c" }}>
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full rounded-full py-3 text-white font-medium text-sm mb-3 transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#8FD6B4", border: "1.5px solid #1a1a1a" }}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {/* Sign Up Button */}
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full rounded-full py-3 font-medium text-sm mb-6 transition-colors hover:bg-white/30"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.6)",
                            color: "#4a6285",
                            border: "1.5px solid #1a1a1a",
                        }}
                    >
                        Sign Up
                    </button>

                    {/* Or Continue With */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(90,122,156,0.3)" }} />
                        <span className="text-xs" style={{ color: "#5a7a9c" }}>Or Continue with</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(90,122,156,0.3)" }} />
                    </div>

                    {/* Google Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
                                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.2 33.6 29.7 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.4 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.8 0 20-7.7 20-21 0-1.3-.2-2.7-.5-4z"/>
                                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.5 5.4 29.6 3 24 3c-7.6 0-14.2 4.3-17.7 10.7z"/>
                                <path fill="#FBBC05" d="M24 45c5.5 0 10.5-1.9 14.3-5l-6.6-5.4C29.7 36.3 27 37 24 37c-5.7 0-10.5-3.6-12.3-8.6l-7 5.4C8.2 40.9 15.5 45 24 45z"/>
                                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.7 2-2 3.8-3.7 5.1l6.6 5.4C42.7 35.5 45 30.1 45 24c0-1.3-.2-2.7-.5-4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}