import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { BookOutlined, LoginOutlined, AuditOutlined, LogoutOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import PFP from './pfp.js'
import Cookies from 'js-cookie'

export default function MenuBar(props){
    const {Text} = Typography
    const user = props.user
    
    const toProfile = () => {
        props.navigation('/profile')
    }

    const logout = (e) => {
        e.stopPropagation();
        Cookies.remove('token')
        props.navigation('/post')
    }


    if (user === undefined){
        return (
            <div>
                <div style={{height: '100px', width:'100px', padding: '10px 15px'}}>
                    <Link to={'/'}>
                        <Button type="text" shape="circle" icon={ 
                            <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}}></img>}
                            size={'large'} style={{height: '72px', width:'72px'}}/>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Link to={'/post'}>
                        <Button shape="round" icon={<BookOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                            fontSize:'18px', textAlign:'left'}}>
                            Post
                        </Button>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Link to={'/login'}>
                        <Button shape="round" icon={<LoginOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                            fontSize:'18px', textAlign:'left'}}>
                            Login
                        </Button>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Link to={'/register'}>
                        <Button shape="round" icon={<AuditOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                            fontSize:'18px', textAlign:'left'}}>
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <div style={{height: '100px', width:'100px', padding: '10px 15px'}}>
                    <Link to={'/'}>
                        <Button type="text" shape="circle" icon={ 
                            <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}}></img>}
                            size={'large'} style={{height: '72px', width:'72px'}}/>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Link to={'/post'}>
                        <Button shape="round" icon={<BookOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                            fontSize:'18px', textAlign:'left'}}>
                            Post
                        </Button>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Link to={'/login'}>
                        <Button shape="round" icon={<LoginOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                            fontSize:'18px', textAlign:'left'}}>
                            Write Post
                        </Button>
                    </Link>
                </div>

                <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                    <Button shape="round" size='large' type="text" style={{height: '80px', width:'100%', 
                        textAlign:'left'}} onClick={() => toProfile()}>
                            <Row align='middle'>
                                <Col>
                                    <PFP avatar={{data: user.avatar.data, size: 60}}></PFP>
                                </Col>
                                <Col offset={1} style={{fontSize: '12px'}}>
                                    <Text style={{fontWeight: 'bold'}}>
                                        {user.userName}
                                    </Text>
                                    <br/>
                                    <Text type='secondary'>
                                        {user.emailAddress}
                                    </Text>
                                </Col>
                                <Col offset={1}>
                                    <Button shape="circle" size='large' type="text" icon={<LogoutOutlined />}
                                    onClick={e => logout(e)}/>
                                </Col>
                            </Row>
                    </Button>
                </div>
            </div>
        )
    }


}