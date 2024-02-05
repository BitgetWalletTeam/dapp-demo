import React, { useEffect, useState }  from 'react';
import {
  BrowserRouter, HashRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './App.css';

import SuiDApp from './dapps/sui';
import CosmosDApp from './dapps/cosmos';
import AptosDApp from './dapps/aptos';

export default function App() { 
    return (<>
        <BrowserRouter>
            <div className="dapps">
                <a href="/sui">sui test</a>
                <a href="/cosmos">cosmos test</a>
                <a href="/aptos">aptos test</a>
            </div>

            <Routes>
                <Route exact path="/" element={ <SuiDApp /> } />
                <Route exact path="/sui" element={ <SuiDApp /> } />
                <Route exact path="/cosmos" element={ <CosmosDApp /> } />
                <Route exact path="/aptos" element={ <AptosDApp /> } />
            </Routes>
        </BrowserRouter>
    </>);
}