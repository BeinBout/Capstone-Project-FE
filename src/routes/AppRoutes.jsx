import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { FullPageLoading } from "../components/Loading";

// Auth
const LoginPages = lazy(() => import('../pages/auth/login/LoginPages'));
const RegisterPages = lazy(() => import('../pages/auth/register/RegisterPages'));
const CompleteData = lazy(() => import('../pages/auth/complete/CompleteData'));
const QuizAnalysisResult = lazy(() => import('../pages/auth/quiz-analysis/QuizAnalysisResult'));
const CallbackPage = lazy(() => import('../pages/auth/callback/CallbackPage'));

// landing Pages
const LandingPages = lazy(() => import('../../src/layouts/LandingLayouts'));
const Quiz = lazy(() => import('../pages/landing/quiz/QuizPages'));

// Dashboard & Features
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const DailyJournal = lazy(() => import('../pages/dashboard/DailyJournal'));
const JournalList = lazy(() => import('../pages/dashboard/JournalList'));
const JournalDetail = lazy(() => import('../pages/dashboard/JournalDetail'));
const WeeklyCheckup = lazy(() => import('../pages/dashboard/WeeklyCheckup'));

// Not Found
const NotFound = lazy(() => import('../pages/404/NotFound'));

// Middleware
import { AuthOnly, NewUserOnly } from './Middleware'

function AppRoutes() {
    return (
        <Suspense fallback={<FullPageLoading />}>
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

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;