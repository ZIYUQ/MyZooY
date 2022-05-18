import React, { useState } from 'react';
import {Row, Col, Typography, Button} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'



export default function PostFormat(props){
    const {Title, Text, Paragraph } = Typography
    const data = props.data
    const avatar = data.avatar
    const userName = data.userName
    const updateTime = data.updatedAt
    const title = data.title
    const content = data.content

    return(
        <Button style={{height: 'auto', width: '100%', paddingTop: '15px', paddingLeft: '25px'}} type="text">
            <Row style={{width: '100%'}}>
                <Col>
                    <PFP avatar={{data: avatar, size: 48}}></PFP>
                </Col>
                <Col offset={1} style={{paddingTop: '3px'}}>
                    <Text level={5} style = {{fontWeight: '10px'}}>@{userName}</Text>
                    <Text type='secondary'> 111</Text>
                    <Title level={5}>
                        {title}
                    </Title>
                    <Paragraph >
                        {content}
                    </Paragraph>
                </Col>
            </Row>
        </Button>
    )
}
