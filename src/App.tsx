import { useEffect, useState } from 'react'
import baseLogo from '/base.png'
import verified from '/verified.png'
import './App.css'
import WebApp from '@twa-dev/sdk'
import VerticalTableView from './VerticalTableView'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const items = [
  {
    id: 1,
    icon: baseLogo,
    title: 'Follow Fracaster',
    description: '+1000 B',
    buttonLabel: 'Open',
    onButtonClick: () => alert('Edit User Profile'),
  },
  {
    id: 2,
    icon: baseLogo,
    title: 'Follow Instagram',
    description: '+1000 B',
    buttonLabel: 'Open',
    onButtonClick: () => alert('View Wallet'),
  },
  {
    id: 3,
    icon: baseLogo,
    title: 'Follow Twitter',
    description: '+1000 B',
    buttonLabel: 'Open',
    onButtonClick: () => alert('Open Tasks'),
  },
];


function App() {
  const [count, setCount] = useState(0)

  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {

      let user = WebApp.initDataUnsafe.user as UserData
      setUserData(user);
      const storedCount = localStorage.getItem(`count_${user.id}`);
      setCount(storedCount ? parseInt(storedCount, 10) : 0);
    }

    // let user = {
    //   id: 11,
    //   first_name: 'asds',
    //   last_name: 'new',
    //   username: 'hahaha',
    //   language_code: 'en',
    //   is_premium: true,
    // }
    // setUserData(user);
    //  // Load count from localStorage
    //  const storedCount = localStorage.getItem(`count_${user.id}`);
    //  setCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, [])

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (userData) {
      // Save count to localStorage whenever it changes
      localStorage.setItem(`count_${userData.id}`, count.toString());
    }
  }, [userData, count]);

  return (
    <>

      <h2 className='roboto-bold'>Based Bet Bot</h2>

      <img src={baseLogo} className="logo" alt="Base logo" onClick={incrementCount} />

      <div className="p-4">
        {userData ? (
          <>
          <div className="name-div">
          {userData.is_premium ?(<img src={verified} width="30" height="30"/>):(<></>)}
          <h3 className="text-2xl font-bold mb-4 username">@{userData.username}</h3>
            </div>
            <p className='roboto'> Welcome {userData.first_name} {userData.last_name} </p>
            
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <p className='score-header-text'>{count} B</p>

      <div>
      <h3 className='task-header-text'>Tasks</h3>
      <VerticalTableView items={items} />
    </div>
    </>
  )
}

export default App
