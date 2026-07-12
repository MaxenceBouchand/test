import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-rose-50 dark:bg-[#221019]">
      <Sidebar />
      <main className="min-w-0 flex-1 pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
