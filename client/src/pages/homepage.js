import React from 'react';

class HomePage extends React.Component{
    componentDidMount(){
        const req = {
            emailAddress: "ziyuq@student.unimelb.edu.au",
            password:"12345678"
        }
        fetch('http://localhost:8000/login', {
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                emailAddress: "ziyuq@student.unimelb.edu.au",
                password:"12345678"
            })
        }) .then(resp => {
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