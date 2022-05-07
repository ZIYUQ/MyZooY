import React from 'react';
import post from '../common/request.js'
import Cookie from 'js-cookie'
import { Link, useNavigate } from "react-router-dom";
import {Row, Col, Input, Button, Typography, Avatar, Upload, message } from 'antd';
import '../css/App.css'
import { UserOutlined, KeyOutlined, LoginOutlined, MailOutlined, SafetyCertificateOutlined, UploadOutlined } from '@ant-design/icons';


// Check the Upload file size and type  
function beforeUpload(file) {
    const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
}

class RegisterContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {emailAddress: undefined, password: undefined, username: undefined, step: 0, verifyCode: undefined, avatar: undefined}
    }


    render(){
        const {Title} = Typography
        const register = () =>{
            const req ={
                userName: this.state.username,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
            }
            post(req, '/register')
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
            post(req, '/register/verification')
            .then(data => {
                Cookie.set('token', data.token, { expires: 1 })
                this.setState({step: 2})
            })
            .catch(error => message.error(error.message))
        }

        const readImage = info =>{
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({avatar: reader.result})
            }
            reader.readAsDataURL(info.file.originFileObj);
        }

        const uploadImage = () =>{
            console.log(this.state.avatar)
            const req ={
                avatar: this.state.avatar
            }
            post(req, '/profile/update/avatar')
            .then(data => {
                this.props.navigation('/')
            })
            .catch(error => message.error(error.message))
        }

        

        const pfp = () => {
            if (this.state.avatar === undefined){
                return (
                    <div style={{margin: '0 auto', width: '150px'}}>
                        <Avatar size={150} icon={<UserOutlined />} style={{margin: '0 auto'}}/>
                    </div>
                )
            }
            else {
                return (
                    <div style={{margin: '0 auto', width: '150px'}}>
                        <Avatar size={150} src={this.state.avatar} style={{margin: '0 auto'}}/>
                    </div>
                )
            }
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
        else if (this.state.step === 2){
            return (
                <div style={{background: 'white', height: '45vh', position: 'absolute', top:'50%', width:'100%', marginTop: '-30vh', borderRadius:'25px'}}>
                    <div style={{height:'25%', width: '100%', paddingLeft: '25px', paddingTop:'25px'}}>
                        <Link to={'/'}>
                            <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}} />
                        </Link>
                    </div>

                    <div style={{width: '100%', height: '150px'}}>
                        <Row justify='center'>
                            <Col span={9}>
                                {pfp()}
                            </Col>
                        </Row>
                    </div>

                    <div style={{width: '100%', height: '50px', padding: '2% 10%', textAlign: 'center'}}>
                        <div style={{display: 'inline-block' }}>
                            <Upload  maxCount={1} onChange={readImage} beforeUpload={beforeUpload} showUploadList={false}>
                                <Button shape="round" icon={<UploadOutlined />}>Upload Your Favourite Avatar</Button>
                            </Upload>
                        </div>
                    </div>

                    <div style={{width:'100%', paddingTop: '5%'}} > 
                        <Row justify='end'>
                            <Col span={6}>
                                <Button shape="round" type="primary" icon={<LoginOutlined />} size={80} onClick={() => uploadImage()}>
                                    Finish
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
export default function(props) {  
    return <RegisterContent {...props} navigation={useNavigate()} />;
}