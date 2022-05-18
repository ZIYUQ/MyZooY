import React from 'react';
import {Row, Col, Layout,} from 'antd';
import '../css/App.css'
import RegisterContent from '../component/registerContent.js'

export default class Register extends React.Component{


    render(){
        return (
            <Layout style={{background: "linear-gradient(135deg, rgb(170 239 198) 10%, rgb(124 148 233) 100%)", minHeight:'100vh'}}>
                <Row justify='center' aligh='middle' style={{height:'100vh'}}>
                    <Col span={8}>
                        <RegisterContent/>
                    </Col>
                </Row>
            </Layout>
        )
    }
}