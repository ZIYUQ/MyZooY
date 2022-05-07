import React from 'react';
import post from '../common/request.js'
import Cookie from 'js-cookie'


class HomePage extends React.Component{
    componentDidMount(){
        const req = {
            emailAddress: "ziyuq@student.unimelb.edu.au",
            password:"12345678"
        }
        post(req, '/login').then(resp => {
            return resp.json();
        })
        .then(data => {
            Cookie.set('token', data.token, { expires: 1 })
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        });
        
    }


    render() {
        return (
            <h1>HI</h1>
        )
    }

}

export default HomePage;