import { useEffect, useState } from 'react'
import baseLogo from '/base.png'
import verified from '/verified.png'
import discord from '/discord.png';
import farcaster from '/farcaster.svg';
import twitter from '/twitter.png';
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
    icon: twitter,
    title: 'Follow Base on X',
    description: '+1000 B',
    buttonLabel: 'Open',
    link: 'https://x.com/base',
    state: 'open' as 'open' | 'claim' | 'disable'
  },
  {
    id: 2,
    icon: farcaster,
    title: 'Follow Base on Farcaster',
    description: '+1000 B',
    buttonLabel: 'Open',
    link: 'https://warpcast.com/base',
    state: 'open' as 'open' | 'claim' | 'disable'
  },
  {
    id: 3,
    icon: discord,
    title: 'Join Base on Discord',
    description: '+1000 B',
    buttonLabel: 'Open',
    link: 'https://discord.gg/buildonbase',
    state: 'open' as 'open' | 'claim' | 'disable'
  },
  {
    id: 4,
    icon: farcaster,
    title: 'Follow Jesse on Farcaster',
    description: '+1000 B',
    buttonLabel: 'Open',
    link: 'https://warpcast.com/jessepollak',
    state: 'open' as 'open' | 'claim' | 'disable'
  }
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
    setCount(prevCount => prevCount + 1000);
  };

  useEffect(() => {
    if (userData) {
      // Save count to localStorage whenever it changes
      localStorage.setItem(`count_${userData.id}`, count.toString());
    }
  }, [userData, count]);

  const handleLinkClick = () => {
    incrementCount();
  };

  return (
    <>

      {/* <h2 className='roboto-bold'>Based Bet Bot</h2> */}

      <img src={baseLogo} className="logo" alt="Base logo"/>
      <div className="p-4">
        {userData ? (
          <>
          <div className="name-div">
          {userData.is_premium ?(<img src={verified} width="30" height="30"/>):(<></>)}
          <h3 className="text-2xl font-bold mb-4 username">@{userData.username}</h3>
            </div>
            {/* <p className='roboto'> Welcome back to {userData.first_name} {userData.last_name} </p> */}  
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <p className='score-header-text'>{count} B</p>

      <div>
      <h3 className='task-header-text'>Tasks</h3>
      {userData ? (
      <VerticalTableView items={items} userId={userData.id} onLinkClick={handleLinkClick}  />
      ) : (<></>)}
    </div>
    </>
  )
}

export default App
