import React, { useState } from 'react';
import {Row, Col, Typography, Button, message} from 'antd';
import '../css/App.css'
import {HeartTwoTone, MessageTwoTone} from '@ant-design/icons'
import PFP from './pfp.js'



export default function PostFormat(props){
    const {Title, Text, Paragraph } = Typography
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
    const likeNum = data.like
    const commentNum = data.comments.length


    const getSelected = () => {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else if (document.getSelection) {
            return document.getSelection().toString();
        } else {
            var selection = document.selection && document.selection.createRange();
            if (selection.text) {
                return selection.text.toString();
            }
            return "";
        }
    }

    const toPost = () => {
        if (getSelected()){
            
        }
        else{
            props.navigation('/detail?id=' + postID)
        }
    }

    const toLike = (e) => {
        e.stopPropagation();
    }


    return(
        <div>
            <Button style={{height: 'auto', width: '100%', paddingTop: '15px', paddingLeft: '25px', 
                textAlign: 'left', whiteSpace: 'pre-wrap', userSelect: 'text'}} onClick={e => toPost()}
                type="text">
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
                        <span>
                            <Button shape='circle' icon={<HeartTwoTone twoToneColor={'rgb(171 168 168)'}/>} type='text' onClick={e=>toLike(e)}/>
                        </span>
                        <Text type='secondary' style={{marginLeft: '10px'}}>
                            {likeNum}
                        </Text>
                    </Col>
                    <Col>
                        <span>
                            <Button shape='circle' icon={<MessageTwoTone twoToneColor={'rgb(171 168 168)'}/>} type='text'/>
                        </span>
                        <Text type='secondary' style={{marginLeft: '10px'}}>
                            {commentNum}
                        </Text>
                    </Col>
                </Row>
            </Button>
        </div>
    )
}
