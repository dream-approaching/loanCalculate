import { useState, useEffect } from 'react';
import './index.less';

type Props = {
  tabList: string[];
  size?: 'small' | 'large';
  active?: number;
  onClick?: (index: number) => void;
  style?: React.CSSProperties;
};
const SwitchTab = ({ tabList, size = 'large', active = 0, onClick, style }: Props) => {
  const [activeTab, setActiveTab] = useState(active);

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const handleClick = (index: number) => {
    if (activeTab === index) return;
    if (onClick) {
      onClick(index);
    } else {
      setActiveTab(index);
    }
  };

  return (
    <div className="tab-list" style={style}>
      {tabList.map((item, index) => (
        <div className={`tab-item ${activeTab === index ? 'active' : ''} ${size === 'small' ? 'small' : ''}`} key={index} onClick={() => handleClick(index)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SwitchTab;
