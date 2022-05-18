import React from 'react';
import Requst from '../common/request.js'
import Cookie from 'js-cookie'
import { Link, useNavigate } from "react-router-dom";
import {Row, Col, Input, Button, Typography, 
    message} from 'antd';
import '../css/App.css'
import { UserOutlined, KeyOutlined, LoginOutlined, MailOutlined, 
    SafetyCertificateOutlined } from '@ant-design/icons';


class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {emailAddress: undefined, password: undefined, username: undefined, step: 0, verifyCode: undefined, avatar: undefined, address: undefined}
    }


    render(){
        const {Title} = Typography
        const register = () =>{
            const req ={
                userName: this.state.username,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
            }
            Requst.post(req, '/register')
            .then(data => {
                this.setState({step: 1})
            })
            .catch(error => message.error(error.message))
        }
        


        const verify = () =>{
            const req ={
                emailAddress: this.state.emailAddress,
                verificationCode: this.state.verifyCode.toString(),
            }
            Request.post(req, '/register/verification')
            .then(data => {
                Cookie.set('token', data.token, { expires: 1 })
                this.props.navigation('/profile')
            })
            .catch(error => message.error(error.message))
        }


        if (this.state.step === 0){
            return (
                <div style={{background: 'white', height: '45vh', position: 'absolute', top:'50%', width:'100%', marginTop: '-30vh', borderRadius:'25px'}}>
                    <div style={{height:'25%', width: '100%', paddingLeft: '25px', paddingTop:'25px'}}>
                        <Link to={'/'}>
                            <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}}></img>
                        </Link>
                    </div>

                    <div style={{width: '100%', height: '50px', padding: '5% 10%'}}> 
                        <Input placeholder="Email" size="large" prefix={<MailOutlined />}
                                onChange={e => this.setState({emailAddress: e.target.value})}/>
                    </div>

                    <div style={{width: '100%', height: '50px', padding: '5% 10%'}}>
                        <Input placeholder="Username" size="large" prefix={<UserOutlined />}
                            onChange={e => this.setState({username: e.target.value})}/>
                    </div>

                    <div style={{width: '100%', height: '50px', padding: '5% 10%'}}>
                        <Input.Password placeholder="Password" size="large" prefix={<KeyOutlined />}
                            onChange={e => this.setState({password: e.target.value})}/>
                    </div>

                    <div style={{width:'100%', paddingTop: '8%'}}> 
                        <Row justify='end'>
                            <Col span={6}>
                                <Button type="round" icon={<LoginOutlined />} size={80} onClick={()=>register()}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }
        else if (this.state.step === 1){
            return (
                <div style={{background: 'white', height: '45vh', position: 'absolute', top:'50%', width:'100%', marginTop: '-30vh', borderRadius:'25px'}}>
                    <div style={{height:'25%', width: '100%', paddingLeft: '25px', paddingTop:'25px'}}>
                        <Link to={'/'}>
                            <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}} ></img>
                        </Link>
                    </div>

                    <div style={{width: '100%', height: '80px', padding: '5% 10%'}}>
                        <Title level={2}>Verify Your Email</Title>
                    </div>

                    <div style={{width: '100%', height: '50px', padding: '5% 10%'}}>
                        <Input placeholder="Verify Code" size="large" prefix={<SafetyCertificateOutlined />}
                            onChange={e => this.setState({verifyCode: e.target.value})}/>
                    </div>

                    <div style={{width:'100%', paddingTop: '8%'}}> 
                        <Row justify='end'>
                            <Col span={6}>
                                <Button type="round" icon={<LoginOutlined />} size={80} onClick={()=>verify()}>
                                    Verify
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }
    
    }


}

// Wrap and export
export default function Register(props) {  
    return <RegisterPage {...props} navigation={useNavigate()} />;
}