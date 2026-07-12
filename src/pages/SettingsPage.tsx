import { ProfileSettings } from '../components/settings/ProfileSettings'
import { DataManagement } from '../components/settings/DataManagement'
import { ThemeToggle } from '../components/settings/ThemeToggle'

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Paramètres</h1>
      <div className="flex flex-col gap-4">
        <ProfileSettings />
        <ThemeToggle />
        <DataManagement />
      </div>
    </div>
  )
}
