import { LoginForm } from './components/LoginForm'
import { AlertSystem } from './components/AlertSystem'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Demo de Autenticación Segura</h1>
      <LoginForm onSuccessfulLogin={(username) => console.log(`${username} ha iniciado sesión`)} />
      <AlertSystem />
    </main>
  )
}

