import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage.js';


// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}


export default Router;