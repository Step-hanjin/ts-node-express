import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import '../../assests/css/Sidebar.scss';

interface SidebarProps {
    itemList: sidebarItemListType;
    setHeaderTitle: (value: string) => void
}

function Sidebar({
    itemList,
    setHeaderTitle
}: SidebarProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        setHeaderTitle(itemList[index].name);
    }

  return (
    <Grid
        className="sidebar"
        size={{ xl: 1.5, lg:1.5, md: 3, sm: 2}}
    >
        <ProSidebar>
            <Menu>
                {itemList.map((item, index) => 
                    <MenuItem
                        className={`sidebar-item ${activeIndex === index ? 'active': ''}`}
                        key={index}
                        component={<Link to={item.url} className="link" />}
                        onClick={() => handleClick(index)}
                    > 
                        {item.name}
                    </MenuItem>            
                )}
            </Menu>
        </ProSidebar>
   </Grid>
  );
}

export default Sidebar;