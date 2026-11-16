import { Dashboard } from './app/Dashboard'
import { Header } from './app/Header'
import { Rooms } from './app/Rooms'
import { Settings } from './app/Settings'
import { useRoute } from './app/useRoute'

function App() {
  const [route, navigate] = useRoute()

  return (
    <>
      <Header route={route} onNavigate={navigate} />
      {route === 'dashboard' && <Dashboard />}
      {route === 'rooms' && <Rooms />}
      {route === 'settings' && <Settings />}
    </>
  )
}

export default App
