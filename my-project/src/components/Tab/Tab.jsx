import React from 'react';
import './Tab.css';

const Tab = (props) => {
  const { allTabs, currentTabIndex, setCurrentTabIndex } = props;

  return (
    <div className="Tab">
      {
        allTabs.map((item, index) => (
          <div className={`tab tb ${ index === currentTabIndex ?"selectedTab" : "nonSelectedTab"  }`} 
          onClick={(e) => setCurrentTabIndex(index) }>
            { item.title }
          </div>
        ))
      }
    </div>
  )
}


export default Tab;
