import { Routes, Route } from "react-router-dom";

// Auth
import LoginPages from '../pages/auth/login/LoginPages'
import RegisterPages from '../pages/auth/register/RegisterPages'
import CompleteData from '../pages/auth/complete/CompleteData'
import QuizAnalysisResult from '../pages/auth/quiz-analysis/QuizAnalysisResult'
import CallbackPage from '../pages/auth/callback/CallbackPage'

// landing Pages
import LandingPages from "../../src/layouts/LandingLayouts";
import Quiz from "../pages/landing/quiz/QuizPages";
import About from "../pages/landing/about/AboutPages";

// Dashboard & Features
import Dashboard from '../pages/user/Dashboard'
import DailyJournal from '../pages/user/DailyJournal'
import WeeklyCheckup from '../pages/user/WeeklyCheckup'

// Not Found
import NotFound from "../pages/404/NotFound";

// Middleware
import { AuthOnly, NewUserOnly } from './Middleware'

function AppRoutes() {
    return (
        <Routes>

            {/* Auth (NEW USER ONLY) */}
            <Route element={<NewUserOnly />}>
                <Route path="/login" element={<LoginPages />} />
                <Route path="/register" element={<RegisterPages />} />
                <Route path="/complete-data" element={<CompleteData />} />
                <Route path="/quiz-analysis" element={<QuizAnalysisResult />} />
                <Route path="/callback" element={<CallbackPage />} />
            </Route>

            {/* Dashboard & Features (AUTH ONLY) */}
            <Route element={<AuthOnly />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/journal" element={<DailyJournal />} />
                <Route path="/checkup" element={<WeeklyCheckup />} />
            </Route>

            {/* Landing Page */}  
            <Route path="/" element={<LandingPages />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/about" element={<About />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;