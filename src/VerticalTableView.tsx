import './VerticalTableView.css';

interface Item {
  id: number;
  icon: string;
  title: string;
  description: string;
  buttonLabel: string;
  link: string;
}

interface VerticalTableViewProps {
  items: Item[];
}

const VerticalTableView = ({ items }: VerticalTableViewProps) => {
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
              className="vertical-table-button"
              onClick={() => window.open(item.link, '_blank')}
            >
              {item.buttonLabel}
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTableView;
