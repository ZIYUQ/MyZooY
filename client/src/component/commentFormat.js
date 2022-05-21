import React from 'react';
import {Row, Col, Typography} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'



export default function CommentDetial(props){
    const { Text, Paragraph } = Typography
    const data = props.data
    const avatar = data.userID.avatar.data
    const userName = data.userID.userName
    const date = new Date(data.updatedAt)
    const dateString = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + 
        ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
    const timeString = date.getHours() + ':' + date.getMinutes()
    const content = data.content

    return(

        <div style={{width: '100%', paddingTop: '15px', paddingLeft: '25px'}}>
            <Row style={{width: '100%'}}>
                <Col>
                    <PFP avatar={{data: avatar, size: 48}}></PFP>
                </Col>
                <Col span={20} offset={1} style={{paddingTop: '3px'}}>
                    <Text level={5} style = {{fontWeight: '10px'}}>@{userName}</Text>
                    <Text type='secondary'>  {dateString} {timeString}</Text>
                    <Paragraph >
                        {content}
                    </Paragraph>
                </Col>
            </Row>
        </div>
    )
}
