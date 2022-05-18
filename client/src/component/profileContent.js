import React, { useState } from 'react';
import {Row, Col, Input, Space, Radio,
    Typography, Button, Modal, message, Upload, InputNumber} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'
import { EditOutlined, UploadOutlined, } from '@ant-design/icons';
import { GrLocation } from "react-icons/gr";
import Post from '../common/request.js'

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

export default function ProfileContent(props){
    const user = props.data
    const [avatar, setAvatar] = useState(props.data.avatar.data);
    const [age, setAge] = useState(props.data.age);
    const [location, setLocation] = useState(props.data.location);
    const [gender, setGender] = useState(props.data.gender);

    const {Title, Text} = Typography;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [btnloading, setbtnLoading] = useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false);


    const handleCancel = () => {
        setIsModalVisible(false);
        setbtnLoading(false)
    };

    const editFile =() => {
        setIsModalVisible(true)
        setbtnLoading(true)
    }
    
    const readImage = info =>{
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(info.file.originFileObj);
    }


    const changInfo = ()=>{
        setConfirmLoading(true)
        const req ={
            avatar: avatar,
            location: location,
            age: age,
            gender: gender
        }
        Post(req, '/profile/update/all')
        .then(data => {
            const user_c = {...user}
            user_c.avatar.data = avatar
            user_c.location = location
            user_c.age = age
            user_c.gender = gender
            props.changeUserInfo(user_c)
            setConfirmLoading(false)
            setIsModalVisible(false);
            setbtnLoading(false)
        })
        .catch(error => 
        {message.error(error.message)})
        
    }
    
    const displayUserInfo = ()=>{
        return (
            <div style={{verticalAlign: 'middle'}}>
                <GrLocation/>
                <Text style={{marginLeft: '4px'}}>{user.location}</Text> 
            </div>
        )
    }

    const defaultGender =() => {
        if (gender === ''){
            return undefined
        }
        else{
            return gender
        }
    }

    return(
        <div style={{marginTop: '5%', marginLeft: '20px'}}>
            <Row justify='Left'>
                <Col span={10}>
                    <PFP avatar={{data: user.avatar.data, size: 120}}/>
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <Row justify='Left' style={{marginTop: '20px', paddingLeft: '10px'}}>
                        <Title level={3} style={{fontWeight: '650', marginBottom:'0px'}}>{user.userName}</Title>
                    </Row>
                    <Row justify='Left' style={{marginTop: '2px', paddingLeft: '10px'}}>
                        <Text type="secondary">{user.emailAddress}</Text>
                    </Row>
                </Col>
                <Col span={14}>
                    <div style={{width: '100%', paddingLeft: '50%', marginTop: '20px'}}>
                        <Button shape="round" icon={<EditOutlined />} type="primary" loading={btnloading} size='large' style={{ fontSize:'16px'}}
                            onClick={e=>editFile()}>
                            Edit Profile
                        </Button>

                        <Modal title="Edit Profile" centered={true} visible={isModalVisible} confirmLoading={confirmLoading} 
                            onOk={changInfo} onCancel={handleCancel}>

                            <div style={{width:'120px', margin:'0 auto'}}>
                                <PFP avatar={{data: avatar, size: 120}}/>
                            </div>
                            <div style={{width: '100%', height: '50px', padding: '2% 10%', textAlign: 'center'}}>
                                <div style={{display: 'inline-block' }}>
                                    <Upload  maxCount={1} onChange={readImage} beforeUpload={beforeUpload} showUploadList={false}>
                                        <Button shape="round" icon={<UploadOutlined />}>Upload Your Favourite Avatar</Button>
                                    </Upload>
                                </div>
                            </div>
                    
                            <div style={{width: '100%', height: '50px', padding: '0 10%', marginTop: '5%', verticalAlign: 'baseline'}}>
                                <Row align="bottom">
                                    <Col span={4} style={{verticalAlign: 'baseline'}}>
                                        <Title level={5}>Gender:</Title>
                                    </Col>
                                    <Col span={19}>
                                        <Space>
                                            <Radio.Group onChange={e => setGender(e.target.value)} size="large" defaultValue={defaultGender()}
                                                style={{ verticalAlign: "middle", width: '100%' }}>
                                                <Radio.Button value="Male">Male</Radio.Button>
                                                <Radio.Button value="Female">Female</Radio.Button>
                                                <Radio.Button value="Prefer not to say"> Prefer not to say </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                            

                            <div style={{width: '80%', height: '50px', margin: '3% 10%'}}> 
                                <Row>
                                    <InputNumber size="large" addonBefore={<Title level={5}>Age:</Title>} defaultValue={age} min={1} max={120}
                                        onChange={e => setAge(e.target.value)}/>
                                </Row>
                            </div>

                            <div style={{width: '100%', height: '50px', padding: '0 10%', marginTop: '3%', verticalAlign: 'baseline'}}>
                                <Input size="large" prefix={<GrLocation/>} placeholder='Location' 
                                    onChange={e=>setLocation(e.target.value)} defaultValue={location}
                                    />
                            </div>

                        </Modal>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '5px', marginLeft: '10px'}}>
                <Col span={4}>
                    {displayUserInfo()}
                </Col>
            </Row>
        </div>

    )
}
