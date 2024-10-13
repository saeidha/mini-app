import './VerticalTableView.css';
import React, { useState, useEffect } from 'react';
interface Item {
  id: number;
  icon: string;
  title: string;
  description: string;
  state: 'open' | 'claim' | 'disable';
  link: string;
}

interface VerticalTableViewProps {
  items: Item[];
  userId: number;
  onLinkClick: (id: number) => void;
}

const VerticalTableView = ({ items , userId, onLinkClick }: VerticalTableViewProps) => {

  const [itemStates, setItemStates] = useState<Record<number, 'open' | 'claim' | 'disable'>>({});

  useEffect(() => {
    const storedStates: Record<number, 'open' | 'claim' | 'disable'> = {};
    items.forEach(item => {
      const state = localStorage.getItem(`task_id_${userId}_${item.id}`);
      storedStates[item.id] = state ? (state as 'open' | 'claim' | 'disable') : 'open';
    });
    setItemStates(storedStates);
  }, [items, userId]);



  const handleButtonClick = (item: Item) => {
    if (itemStates[item.id] === 'open') {
      window.open(item.link, '_blank');
      setItemStates(prevStates => ({
        ...prevStates,
        [item.id]: 'claim'
      }));
      localStorage.setItem(`task_id_${userId}_${item.id}`, 'claim');
    } else if (itemStates[item.id] === 'claim') {
      onLinkClick(item.id);
      setItemStates(prevStates => ({
        ...prevStates,
        [item.id]: 'disable'
      }));
      localStorage.setItem(`task_id_${userId}_${item.id}`, 'disable');
    }
  };


  return (
    <div className="vertical-table-view">
      {items.map((item) => (

        <div key={item.id} className='vertical-table-item'>
          <div className="vertical-table-icon">
            <img src={item.icon} style={{ height: '2em', width: '2em' }} />
          </div>
          <div className="vertical-table-content">
            <h3 className="vertical-table-title">{item.title}</h3>
            <p className="vertical-table-description">{item.description}</p>
          </div>
          <div>

          <button
              className={`vertical-table-button ${itemStates[item.id] === 'disable' ? 'disabled' : ''}`}
              onClick={() => handleButtonClick(item)}
              disabled={itemStates[item.id] === 'disable'}
            >
              {itemStates[item.id] === 'disable' ? 'Claimed' : (itemStates[item.id] === 'claim' ? 'Claim' : 'Open')}
            </button>
{/*             
            <button
              className="vertical-table-button"
              onClick={() => window.open(item.link, '_blank')}
            >
              {item.state}
            </button> */}

          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTableView;
