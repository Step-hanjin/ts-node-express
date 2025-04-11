import React from "react";
import { 
    Grid, 
  } from "@mui/material";
  
interface MainContent {
    children: any
}

const MainContent = ({
    children
}: MainContent) => {
    return (
        <Grid
            size={{ xl: 10.5, lg:10.5, md: 9, sm: 10}}
            sx={{ padding: 5 }}
        >
            {children}
        </Grid>
    )
}

export default MainContent;