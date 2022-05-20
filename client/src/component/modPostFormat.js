import React, { useState } from 'react';
import {Row, Col, Typography, Button } from 'antd';
import '../css/App.css'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import PFP from './pfp.js'
import { modGet } from '../common/request';



export default function PostFormat(props){
    const {Title, Text, Paragraph } = Typography
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)
    const sendPost = props.sendPost
    const data = props.data
    const avatar = data.userID.avatar.data
    const userName = data.userID.userName
    const date = new Date(data.updatedAt)
    const dateString = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + 
        ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
    const timeString = date.getHours() + ':' + date.getMinutes()
    const title = data.title
    const content = data.content
    const postID = data._id

    const acceptPost = () => {
        setAcceptLoading(true)
        setRejectLoading(true)
        modGet('/mod/allow?postid=' + postID)
        .then(data=>{
            sendPost(postID)
            setRejectLoading(false)
            setAcceptLoading(false)
        })
    }

    const rejectPost = () => {
        setAcceptLoading(true)
        setRejectLoading(true)
        modGet('/mod/reject?postid=' + postID)
        .then(data=>{
            sendPost(postID)
            setRejectLoading(false)
            setAcceptLoading(false)
        })
    }
 
    return(
        <div>
            <div style={{height: 'auto', width: '100%', paddingTop: '15px', paddingLeft: '25px', 
                textAlign: 'left', whiteSpace: 'pre-wrap', userSelect: 'text'}}>
                <Row style={{width: '100%'}}>
                    <Col>
                        <PFP avatar={{data: avatar, size: 48}}></PFP>
                    </Col>
                    <Col span={20} offset={1} style={{paddingTop: '3px'}}>
                        <Text level={5} style = {{fontWeight: '10px'}}>@{userName}</Text>
                        <Text type='secondary'>  {dateString} {timeString}</Text>
                        <Title level={5}>
                            {title}
                        </Title>
                        <Paragraph >
                            {content}
                        </Paragraph>
                    </Col>
                </Row>
                <Row style={{width: '100%', paddingBottom: '4px'}} justify="space-evenly" align="middle">
                    <Col>
                            <Button icon={<CheckOutlined />} type='text' 
                                loading={acceptLoading} onClick={e=> acceptPost()}>Allow</Button>
                    
                    </Col>
                    <Col>
   
                        <Button  icon={<CloseOutlined />} type='text' loading={rejectLoading}
                        onClick={e=> rejectPost()}> Reject </Button>

                    </Col>
                </Row>
            </div>
        </div>
    )
}
