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
import Dashboard from '../pages/dashboard/Dashboard'
import DailyJournal from '../pages/dashboard/DailyJournal'
import JournalList from '../pages/dashboard/JournalList'
import JournalDetail from '../pages/dashboard/JournalDetail'
import WeeklyCheckup from '../pages/dashboard/WeeklyCheckup'

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
                <Route path="/callback" element={<CallbackPage />} />
            </Route>

            {/* Dashboard & Features (AUTH ONLY) */}
            <Route element={<AuthOnly />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/journal" element={<JournalList />} />
                <Route path="/journal/new" element={<DailyJournal />} />
                <Route path="/journal/:id" element={<JournalDetail />} />
                <Route path="/checkup" element={<WeeklyCheckup />} />
                <Route path="/quiz-analysis" element={<QuizAnalysisResult />} />
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