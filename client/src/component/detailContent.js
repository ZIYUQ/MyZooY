import React, {useState} from 'react';
import {Spin, Divider, List, Row, Col, Typography, Input, Button, message} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'
import CommentDetial from './commentFormat.js';
import {CommentOutlined} from '@ant-design/icons'
import Post, {Get} from '../common/request.js'

export default function DetialContent(props){
    const post = props.post
    console.log(post)
    const {Title, Text, Paragraph} = Typography;
    const [writeComment, setWriteComment] = useState(undefined);
    const [loading, setLoading] = useState(false)
    const {TextArea} = Input
    if (post ===undefined){
        return (
            <div style={{margin: '45vh auto 0 auto', verticalAlign: 'middle', width: '45px'}}>
                <Spin size="large" />
            </div>
        )
    }
    const sendData = props.sendData
    
    const avatar = post.userID.avatar.data
    const userName = post.userID.userName
    const date = new Date(post.updatedAt)
    const dateString = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + 
        ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
    const timeString = date.getHours() + ':' + date.getMinutes()
    const title = post.title
    const content = post.content
    const postID = post._id
    const comment = post.comments

    const toComment = () => {
        setLoading(true)
        const req = {
            content: writeComment
        }
        Post(req, '/post/comment?postid=' + postID)
        .then(data =>{
            console.log(data)
            Get('/post/select?postid=' + postID)
            .then(data => {
                sendData(data.post)
                message.success('Successfully Comment')
                setLoading(false)
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
                            onChange={e=>setWriteComment(e.target.value)}/>
                        <Divider style={{width: '100%', margin: '0 0', paddingTop: '20px'}}></Divider>
                        <Button shape='round' icon={<CommentOutlined />} type='primary'
                        onClick={e => toComment()} loading={loading}>
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
            <Divider style={{width: '100%', margin: '0 0', paddingTop: '20px'}}></Divider>
            {commentPart()}
            <Divider style={{width: '100%', margin: '0 0', paddingTop: '20px'}}></Divider>
            <List
                itemLayout="horizontal"
                dataSource={comment}
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
