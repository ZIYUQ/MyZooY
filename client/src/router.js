import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js'
import Post from './pages/post.js'
import Detail from './pages/detail.js'
import ModeratorLogin from './pages/moderatorLogin.js'
import ModeratorPost from './pages/modPost.js'
import ModeratorUser from './pages/modUser.js'
import CharacteristicPage from './pages/characteristic.js';

// router switch 
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/characteristic' element={<CharacteristicPage />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/post' element={<Post />}></Route>
                    <Route path='/detail' element={<Detail />}></Route>
                    <Route path='/mod/login' element={<ModeratorLogin />}></Route>
                    <Route path='/mod/post' element={<ModeratorPost />}></Route>
                    <Route path='/mod/user' element={<ModeratorUser />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}


export default Router;