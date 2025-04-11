import { 
    Grid,
    Paper,
    styled
 } from "@mui/material";
import React from "react";
// import '../../assests/css/Header';

const CustomHeader = styled(Grid)(({ theme }) => ({
    backgroundColor: '#2d3a81',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

interface HeaderProps { 
    title: string
}

const Header = ({
    title = 'Country'
}: HeaderProps) => {
    return (
        <CustomHeader
            className="nav"
            container
            size={{ xl: 12, lg: 12, md: 12}}
        >
            <p>{title}</p>
        </CustomHeader>
    );
};

export default Header;