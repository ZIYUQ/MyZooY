import React from 'react';
import post from '../common/request.js'
import Cookie from 'js-cookie'
import { Link } from "react-router-dom";
import {Row, Col, Layout, Input, Button, message} from 'antd';
import '../css/App.css'
import { MailOutlined, KeyOutlined, LoginOutlined} from '@ant-design/icons';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {emailAddress: undefined, password: undefined}
    }

    render() {
        const login = () => {
            const req ={
                emailAddress: this.state.emailAddress,
                password: this.state.password,
            }
            post(req, '/login')
            .then(data => {
                Cookie.set('token', data.token, { expires: 1 })
                
            })
            .catch(error => message.error(error.message))
        }

        return (
            <Layout style={{background: "linear-gradient(135deg, rgb(170 239 198) 10%, rgb(124 148 233) 100%)", minHeight:'100vh'}}>
                <Row justify='center' aligh='middle' style={{height:'100vh'}}>
                    <Col span={8}>
                        <div style={{background: 'white', height: '45vh', position: 'absolute', top:'50%', width:'100%', marginTop: '-30vh', borderRadius:'25px'}}>
                            <div style={{height:'25%', width: '100%', paddingLeft: '25px', paddingTop:'25px'}}>
                                <Link to={'/'}>
                                    <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}} onClick></img>
                                </Link>
                            </div>

                            <div style={{width: '100%', height: '50px', padding: '8% 10%'}}> 
                                <Input size="large" prefix={<MailOutlined />} placeholder="Email" 
                                    onChange={e => this.setState({emailAddress: e.target.value})}/>
                            </div>

                            <div style={{width: '100%', height: '50px', padding: '5% 10%'}}>
                                <Input.Password placeholder="Password" size="large" prefix={<KeyOutlined />}
                                    onChange={e => this.setState({password: e.target.value})}/>
                            </div>

                            <div style={{width:'100%', paddingTop: '8%'}}> 
                                <Row justify='end'>
                                    <Col span={6}>
                                        <Button type="round" icon={<LoginOutlined />} size={80} onClick={()=>login()}>
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}