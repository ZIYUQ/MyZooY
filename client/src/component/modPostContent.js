import React from 'react';
import {Spin, Divider, List} from 'antd';
import '../css/App.css'

import ModPostFormat from './modPostFormat.js';


export default function ProfileContent(props){
    const posts = props.posts
    if (posts===undefined){
        return (
            <div style={{margin: '45vh auto 0 auto', verticalAlign: 'middle', width: '45px'}}>
                <Spin size="large" />
            </div>
        )
    }

    return(
        <div>
             <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={item => (
                    <div>
                        <ModPostFormat data={item} navigation={props.navigation}
                        sendPost={props.sendPost}
                        sendUser={props.sendUser}>
                        </ModPostFormat>
                        <Divider style={{width: '100%', margin: '0 0'}}></Divider>
                    </div>
                )}/>
        </div>

    )
}
