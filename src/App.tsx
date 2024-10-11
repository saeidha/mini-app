import { useEffect, useState } from 'react'
import baseLogo from '/base.svg'
import verified from '/verified.png'
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
    setUserData({
      id: 12,
      first_name: 'asds',
      last_name: 'new',
      username: 'hahaha',
      language_code: 'en',
      is_premium: true,
    });
  }, [])

  return (
    <>

      <h2>Telegram Mini app</h2>

      <img src={baseLogo} className="logo" alt="Base logo" onClick={() => setCount((count) => count + 1)} />

      <div className="p-4">
        {userData ? (
          <>
          <div className="name-div">
          {userData.is_premium ?(<img src={verified} width="30" height="30"/>):(<></>)}
          <h3 className="text-2xl font-bold mb-4 username">@{userData.username}</h3>
            </div>
            <p> Welcome {userData.first_name} {userData.last_name} </p>
            
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
