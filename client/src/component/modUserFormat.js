import React, { useState } from 'react';
import {Row, Col, Typography, Button } from 'antd';
import '../css/App.css'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import PFP from './pfp.js'
import { modGet } from '../common/request';



export default function ModUserFormat(props){
    const { Text } = Typography
    const [acceptLoading, setAcceptLoading] = useState(false)
    const sendUser = props.sendUser
    const data = props.data
    const avatar = data.avatar.data
    const userName = data.userName
    const email = data.emailAddress
    const userID = data._id

    const Ban = () => {
        setAcceptLoading(true)
        modGet('/mod/ban?userid=' + userID)
        .then(data=>{
            sendUser(userID)
            setAcceptLoading(false)
        })
    }

    const Unban = () => {
        setAcceptLoading(true)
        modGet('/mod/unban?userid=' + userID)
        .then(data=>{
            sendUser(userID)
            setAcceptLoading(false)
        })
    }

    const checkBan = () => {
        if (data.ban){
            return (<Button icon={<CheckOutlined />} type='text' 
            loading={acceptLoading} onClick={e=> Unban()}>Unban</Button>)
        }
        return (
            <Button icon={<CloseOutlined />} type='text' 
            loading={acceptLoading} onClick={e=> Ban()}>Ban</Button>
        )
    }
 
    return(
        <div>
            <div style={{height: 'auto', width: '100%', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '25px', 
                textAlign: 'left', whiteSpace: 'pre-wrap', userSelect: 'text'}}>
                <Row style={{width: '100%'}} align='middle'>
                    <Col>
                        <PFP avatar={{data: avatar, size: 48}}></PFP>
                    </Col>
                    <Col span={15} offset={1} style={{paddingTop: '3px'}}>
                        <Text level={5} style = {{fontWeight: '10px'}}>@{userName}</Text>
                        <br></br>
                        <Text level={5} type='secondary' style = {{fontWeight: '10px'}}>{email}</Text>
                    </Col>
                    <Col>
                        {checkBan()}
                    </Col>
                </Row>
            </div>
        </div>
    )
}
