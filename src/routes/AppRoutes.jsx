import { Routes, Route } from 'react-router-dom'

// Auth
import LoginPages from '../pages/auth/login/LoginPages'
import RegisterPage from '../pages/auth/register/RegisterPages'
import CompleteData from '../pages/auth/complete/CompleteData'
import QuizAnalysisResult from '../pages/auth/quiz-analysis/QuizAnalysisResult'

// Dashboard & Features
import Dashboard from '../pages/Dashboard'
import DailyJournal from '../pages/DailyJournal'
import WeeklyCheckup from '../pages/WeeklyCheckup'

// landing
// import HeroSections from '../pages/landing/HeroSections.jsx'

// Not Found
import NotFound from '../pages/404/NotFound'

function AppRoutes() {
    return (
        <Routes>
            {/* Auth */}
            <Route path="/login" element={<LoginPages />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/complete-data" element={<CompleteData />} />
            <Route path="/quiz-analysis" element={<QuizAnalysisResult />} />

            {/* Dashboard & Features */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<DailyJournal />} />
            <Route path="/checkup" element={<WeeklyCheckup />} />

            {/* landing */}
            {/* <Route path="/" element={<Home />} /> */}

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes