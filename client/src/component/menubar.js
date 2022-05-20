import React, {useState}from 'react';
import { Typography, Button, Row, Col, Modal, Input, message} from 'antd';
import { BookOutlined, LoginOutlined, AuditOutlined, LogoutOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import PFP from './pfp.js'
import Cookies from 'js-cookie'
import Post from '../common/request.js'

export default function MenuBar(props){
    const {Text, Title} = Typography
    const user = props.user
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [btnloading, setbtnLoading] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');


    const handleCancel = () => {
        setIsModalVisible(false);
        setbtnLoading(false)
    };

    const onWriring =() => {
        setIsModalVisible(true)
        setbtnLoading(true)
    }

    const writePost = () => {
        setConfirmLoading(true)
        if (content !== '' && title !== ''){
            const req = {
                title: title,
                content: content
            }
            Post(req, '/post/create')
            .then(data => {
                props.navigation(0)
            })
            .catch(error => message.error(error))
        }
        else{
            message.error('Please Fill the post')
        }
        
    }

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

                    <Button shape="round" icon={<LoginOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                        fontSize:'18px', textAlign:'left'}} onClick={e=>onWriring()} loading={btnloading}>
                        Write Post
                    </Button>

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
                <Modal title="Write Post" centered={true} visible={isModalVisible} confirmLoading={confirmLoading} 
                            onOk={writePost} onCancel={handleCancel}>
                    <Row align="middle" style={{width: '100%'}}>
                        <Col span={4}>
                            <Title level={5} style={{marginBottom: '0'}}>Title: </Title>
                        </Col>
                        <Col span={18}>
                            <Input.TextArea  prefix={<Text>Title: </Text>} autoSize={true} placeholder='Title' 
                            onChange={e=>setTitle(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row align="middle" style={{width: '100%', paddingTop: '20px'}}>
                        <Col span={4}>
                            <Title level={5} style={{marginBottom: '0'}}>Content: </Title>
                        </Col>
                        <Col span={18}>
                            <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} prefix={<Text>Title: </Text>} placeholder='Title' 
                            onChange={e=>setContent(e.target.value)}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }


}