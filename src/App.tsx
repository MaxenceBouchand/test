import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useBudgetStore } from './store/useBudgetStore'
import { AppShell } from './components/layout/AppShell'
import { OnboardingPage } from './pages/OnboardingPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { LearnIndexPage } from './pages/LearnIndexPage'
import { LearnArticlePage } from './pages/LearnArticlePage'
import { GoalsPage } from './pages/GoalsPage'
import { SettingsPage } from './pages/SettingsPage'

// Recharts pulls in a sizeable chunk, so the chart-heavy pages are code-split.
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const HistoryPage = lazy(() => import('./pages/HistoryPage').then((m) => ({ default: m.HistoryPage })))

function PageFallback() {
  return <div className="py-10 text-center text-sm text-stone-400">Chargement…</div>
}

function useSyncThemeClass() {
  const theme = useBudgetStore((state) => state.settings.theme)

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && prefersDark.matches)
      root.classList.toggle('dark', isDark)
    }

    apply()
    if (theme === 'system') {
      prefersDark.addEventListener('change', apply)
      return () => prefersDark.removeEventListener('change', apply)
    }
  }, [theme])
}

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboardingCompleted = useBudgetStore((state) => state.settings.onboardingCompleted)
  if (!onboardingCompleted) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function RedirectIfOnboarded({ children }: { children: React.ReactNode }) {
  const onboardingCompleted = useBudgetStore((state) => state.settings.onboardingCompleted)
  if (onboardingCompleted) return <Navigate to="/" replace />
  return <>{children}</>
}

function AppRoutes() {
  useSyncThemeClass()

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={
          <RedirectIfOnboarded>
            <OnboardingPage />
          </RedirectIfOnboarded>
        }
      />
      <Route
        element={
          <RequireOnboarding>
            <AppShell />
          </RequireOnboarding>
        }
      >
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/apprendre" element={<LearnIndexPage />} />
        <Route path="/apprendre/:slug" element={<LearnArticlePage />} />
        <Route path="/objectifs" element={<GoalsPage />} />
        <Route
          path="/historique"
          element={
            <Suspense fallback={<PageFallback />}>
              <HistoryPage />
            </Suspense>
          }
        />
        <Route path="/parametres" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
