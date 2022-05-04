import React from 'react';

class HomePage extends React.Component{
    componentDidMount(){
        fetch('http://localhost:8000/login')
        .then(resp => {
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