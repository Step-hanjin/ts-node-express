import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Grid } from '@mui/material';

import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Sidebar from './components/layout/Sidebar';

import { 
  sidebarItemList
 } from './app/data';

 // import component in features
import CountryComponent from './components/features/countryComponent';
import paymonthComponent from './components/features/paymonthComponent';
import ContactComponent from './components/features/contactComponent';

import 'bootstrap';
import './App.css';

const App = () => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Countries');

  const setHeaderTitle = (value: string) => {
    setSelectedSidebarItem(value);
  };

  return (
    <Router>
      <div className="App container">
        <Header title={selectedSidebarItem} />
        <Grid container direction="row">
          <Sidebar itemList={sidebarItemList} setHeaderTitle={setHeaderTitle} />
          <MainContent>
            <Routes>
              <Route path="/countries" Component={CountryComponent} />
              <Route path="/paymonths" Component={paymonthComponent} />
              <Route path="/contacts" Component={ContactComponent} />
            </Routes>
          </MainContent>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
