import React, { useState } from 'react';
import {Row, Col, Typography, Button, message, Alert} from 'antd';
import '../css/App.css'
import {HeartTwoTone, MessageTwoTone} from '@ant-design/icons'
import PFP from './pfp.js'
import { Get } from '../common/request';



export default function PostFormat(props){
    const {Title, Text, Paragraph } = Typography
    const [likeLoading, setLikeLoading] = useState(false)
    const sendPost = props.sendPost
    const sendUser = props.sendUser
    const user = props.user
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
    const allowed = data.allowed

    const toLike = (e) => {
        e.stopPropagation();
        setLikeLoading(true)
        if (!allowed){
            message.error('Waiting for moderator allow')
            setLikeLoading(false)
            return 
        }

        if (user !== undefined){
            if (ifLike()){
                Get('/post/cancel_like?postid=' + postID)
                .then(a => {
                    var post_c = {...data}
                    post_c.like = post_c.like - 1
                    var user_c = {...user}
                    var likes = user.likes
                    likes.splice(likes.indexOf(postID), 1)
                    user_c.likes = likes
                    sendUser(user_c)
                    sendPost(post_c)
                    setLikeLoading(false)
                }).catch(err =>message.error(err))
            }
            else{
                Get('/post/like_post?postid=' + postID)
                .then(a => {
                    var post_c = {...data}
                    post_c.like = post_c.like + 1
                    var user_c = {...user}
                    var likes = user.likes
                    likes.push(postID)
                    user_c.likes = likes
                    sendUser(user_c)
                    sendPost(post_c)
                    setLikeLoading(false)
                }).catch(err =>message.error(err))
            }
        }
        else {
            message.error('Please Login')
            setLikeLoading(false)
        }
    }

    const pendingAlert = () => {
        if (!allowed){
            return (
                <Alert message="Pending..." type="warning" showIcon style={{width: '113px', backgroundColor: 'white', border: '0'}}/>
            )
        }
    }
    
    const ifLike= () => {
        if (user === undefined || !user.likes.includes(postID)){
            return false
        }

        return true
    }

    const likeColor = () => {
        if (ifLike()){
            return "#eb2f96"
        }
        return 'rgb(171 168 168)'
    }


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
        else if (!allowed){
            message.error('Waiting for moderator allow')
        }
        else{
            props.navigation('/detail?id=' + postID)
        }
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
                {pendingAlert()}
                <Row style={{width: '100%', paddingBottom: '4px'}} justify="space-evenly" align="middle">
                    <Col>
                        <span>
                            <Button shape='circle' icon={<HeartTwoTone twoToneColor={likeColor()}/>} type='text' onClick={e=>toLike(e)} 
                                loading={likeLoading}/>
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
