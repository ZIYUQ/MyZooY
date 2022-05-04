import React from 'react';
import post from '../common/request.js'


class HomePage extends React.Component{
    componentDidMount(){
        const req = {
            emailAddress: "ziyuq@student.unimelb.edu.au",
            password:"1234578"
        }
        post(req, '/login').then(resp => {
            return resp.json();
        })
        .then(data => {
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