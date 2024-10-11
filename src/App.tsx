import { useEffect, useState } from 'react'
import baseLogo from '/base.svg'
import './App.css'
import WebApp from '@twa-dev/sdk'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

function App() {
  const [count, setCount] = useState(0)

  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])

  return (
    <>

      <h2>Telegram Mini app</h2>

      <img src={baseLogo} className="logo" alt="Vite logo" onClick={() => setCount((count) => count + 1)} />

      <div className="p-4">
        {userData ? (
          <>
            <h4 className="text-2xl font-bold mb-4">User Data</h4>
            <ul>
              <li>ID: {userData.id}</li>
              <li>First Name: {userData.first_name}</li>
              <li>Last Name: {userData.last_name || 'N/A'}</li>
              <li>Username: {userData.username || 'N/A'}</li>
              <li>Language Code: {userData.language_code}</li>
              <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
            </ul>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="card">
      <button>the count is {count}</button>
      </div>
      <p className="read-the-docs">Tap on Base Icon</p>

    </>
  )
}

export default App
