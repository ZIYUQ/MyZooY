import React, {useState} from 'react';
import {Spin, Divider, List, Row, Col, Typography, Input, Button, message} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'
import CommentDetial from './commentFormat.js';
import {CommentOutlined, HeartTwoTone, MessageTwoTone} from '@ant-design/icons'
import Post, {Get} from '../common/request.js'

export default function DetialContent(props){
    const post = props.post
    const comments = props.comments
    const user = props.user

    const {Title, Text, Paragraph} = Typography;
    const [writeComment, setWriteComment] = useState('');
    const [commentloading, setCommentLoading] = useState(false)
    const [likeloading, setLikeLoading] = useState(false)
    const {TextArea} = Input
    if (post ===undefined){
        return (
            <div style={{margin: '45vh auto 0 auto', verticalAlign: 'middle', width: '45px'}}>
                <Spin size="large" />
            </div>
        )
    }
    const sendData = props.sendData
    const sendUser = props.sendUser
    const avatar = post.userID.avatar.data
    const userName = post.userID.userName
    const date = new Date(post.updatedAt)
    const dateString = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + 
        ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
    const timeString = date.getHours() + ':' + date.getMinutes()
    const title = post.title
    const content = post.content
    const postID = post._id
    const likeNum = post.like
    const commentNum = post.comments.length

    const toLike = () => {
        setLikeLoading(true)
        if (user !== undefined){
            if (ifLike()){
                Get('/post/cancel_like?postid=' + postID)
                .then(data => {
                    var post_c = {...post}
                    post_c.like = post_c.like - 1
                    var user_c = {...user}
                    var likes = user.likes
                    likes.splice(likes.indexOf(postID), 1)
                    user_c.likes = likes
                    sendUser(user_c)
                    sendData({post: post_c, comments: comments})
                    setLikeLoading(false)
                }).catch(err =>message.error(err))
            }
            else{
                Get('/post/like_post?postid=' + postID)
                .then(data => {
                    var post_c = {...post}
                    post_c.like = post_c.like + 1
                    var user_c = {...user}
                    var likes = user.likes
                    likes.push(postID)
                    user_c.likes = likes
                    sendUser(user_c)
                    sendData({post: post_c, comments: comments})
                    setLikeLoading(false)
                }).catch(err =>message.error(err))
            }
        }
        else {
            message.error('Please Login')
            setLikeLoading(false)
        }
    }

    const ifLike= () => {
        if (user.likes.includes(postID) || user === undefined){
            return true
        }

        return false
    }

    const likeColor = () => {
        if (ifLike()){
            return "#eb2f96"
        }
        return 'rgb(171 168 168)'
    }


    const toComment = () => {
        setCommentLoading(true)
        const req = {
            content: writeComment
        }
        Post(req, '/post/comment?postid=' + postID)
        .then(data =>{
            console.log(data)
            Get('/post/select?postid=' + postID)
            .then(data => {
                setWriteComment('')
                sendData(data)
                message.success('Successfully Comment')
                setCommentLoading(false)
            })
            .catch(error => {
                
            })
        })
        .catch(error => message.error(error))
    }

    const commentPart= ()=>{
        if (props.user !== undefined){
            return (
                <Row style={{width: '100%', padding: '15px 50px'}}>
                    <Col>
                        <PFP avatar={{data: props.user.avatar.data, size: 40}}></PFP>
                    </Col>
                    <Col offset={1} span={20}>
                        <TextArea autoSize={true} placeholder="Comment" bordered={false} style={{width: '100%'}} 
                            onChange={e=>setWriteComment(e.target.value)} value={writeComment}/>
                        <Divider style={{width: '100%', margin: '0 0', paddingTop: '20px'}}></Divider>
                        <Button shape='round' icon={<CommentOutlined />} type='primary'
                        onClick={e => toComment()} loading={commentloading}>
                            Write Comment
                        </Button>
                    </Col>
                </Row>
            )
        }
    }



    return(
        <div>
            <Row style={{width: '100%', padding: '15px 25px'}}>
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
                        <Button shape='circle' icon={<HeartTwoTone twoToneColor={likeColor()}/>} type='text' 
                        onClick={e=>toLike(e)} loading={likeloading}/>
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
            <Divider style={{width: '100%', margin: '0 0', paddingTop: '20px'}}></Divider>
            {commentPart()}
            <Divider style={{width: '100%', margin: '0 0'}} orientation='left' children='Comment'></Divider>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                locale={{emptyText: 'No Comments Now'}}
                renderItem={item => (
                    <div>
                        <CommentDetial data={item} navigation={props.navigation}>
                        </CommentDetial>
                        <Divider style={{width: '100%', margin: '0 0'}}></Divider>
                    </div>
                )}/>
        </div>

    )
}
