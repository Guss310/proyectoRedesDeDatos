import { AdminPanel } from '../components/AdminPanel'
import { AlertSystem } from '../components/AlertSystem'

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <AdminPanel />
      <AlertSystem />
    </main>
  )
}

