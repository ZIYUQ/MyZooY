import React, { useState } from 'react';
import {Row, Col, Input, Space, Radio,
    Typography, Button, Modal, message, Divider, List} from 'antd';
import '../css/App.css'
import PFP from './pfp.js'
import { EditOutlined, UploadOutlined, } from '@ant-design/icons';
import { GrLocation } from "react-icons/gr";
import Post from '../common/request.js'
import PostFormat from './postFormat.js';


export default function ProfileContent(props){
   
    const data = [{userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'},
    {userName: '111', updateAt: '111', avatar: undefined, title: 'Title', content: '1111111'}]
    
    return(
        <div>
             <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <div>
                        <PostFormat data={item}>
                        </PostFormat>
                        <Divider style={{width: '100%', margin: '0 0'}}></Divider>
                    </div>
                )}/>
        </div>

    )
}
