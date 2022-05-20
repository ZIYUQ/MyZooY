import React from 'react';
import {Spin, Divider, List} from 'antd';
import '../css/App.css'

import ModUserFormat from './modUserFormat.js';


export default function ModUserContent(props){
    const users = props.users
    if (props.users===undefined){
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
                dataSource={users}
                renderItem={item => (
                    <div>
                        <ModUserFormat data={item} navigation={props.navigation}
                        sendUser={props.sendUser}>
                        </ModUserFormat>
                        <Divider style={{width: '100%', margin: '0 0'}}></Divider>
                    </div>
                )}/>
        </div>

    )
}
