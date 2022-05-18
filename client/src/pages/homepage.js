import React from 'react';
import '../css/App.css'
import {Link} from 'react-router-dom'
import {Row, Col, Layout, Button, Typography} from 'antd';
import { BsFillDoorOpenFill } from "react-icons/bs";
import YouTube from 'react-youtube';
import { MdOutlineManageSearch } from "react-icons/md";


class HomePage extends React.Component{
    render() {
        const opts = {
            height: '400px',
            width: '708px',
            playerVars: {
                autoplay: 0,
            },
        };
        const {Title, Text} = Typography
        return (
            <Layout style={{background: "linear-gradient(135deg, rgb(124 148 233) 10%, rgb(170 239 198) 100%)", minHeight:'100vh'}}>
                <Row align="middle" justify="center" style={{height:'75vh', marginBottom: '25vh'}}>
                    <Col span ={10}>
                            <Row align="middle" justify="center">
                                <Col>
                                    <img src='/img/logo.svg' alt='logo' style={{height: '150px'}}></img>
                                </Col>
                            </Row>
                            <Row align="middle" justify="center">
                                <Col>
                                    <Title style={{fontFamily: 'Acre-Medium'}} level={1}>Zoo Y</Title>
                                </Col>
                            </Row>
                            <Row align="middle" justify="center" style={{marginTop: '100px'}}>
                                <Col>
                                    <Link to={'/post'}>
                                        <Button shape="round" icon={<BsFillDoorOpenFill size={20}/>} style={{
                                            backgroundColor: '#fff0',
                                            borderColor: '#504f4fbd',
                                            color: 'rgb(28 28 28 / 74%)',
                                            width: '200px',
                                            height: '50px',
                                            fontSize: '22px'
                                            }}>
                                            Enter Zoo Y
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                    </Col>
                </Row>
                    {/* <div style={{height: '64px', width: '136px', marginRight: '50px', 
                        marginLeft: '85%', marginTop:'50px'}}>
                        <Button shape="round" icon={<BsFillDoorOpenFill/>} size={'large'} style={{
                            backgroundColor: '#fff0',
                            borderColor: '#504f4fbd',
                            color: '#504f4fbd'}}>
                            Enter ZooY
                        </Button>
                    </div>
                    <div className="texty-demo" style={{paddingLeft:"7vw", paddingTop:"45vh", height:"30vh", width:"70vw"}}>
                        <Texty style={{fontSize:"110px", color:"#524e529c", fontFamily:'Helvetica'}}>Zoo Y</Texty>
                        <Texty style={{fontSize:"30px", color:"white", fontFamily:'Helvetica'}}> 1111</Texty>
                    </div> */}
                <Row align="middle" style={{height:'100vh'}}>

                    <Col span={11}>
                            <YouTube videoId="JZoUGcuMLk8" opts={opts} style={{width: '708px', marginLeft: 'auto', marginRight: 'auto', 
                            }}/>;
                    </Col>
                    <Col span={11} offset={1}>
                        <Row justify='center'>
                            <Col style={{width: '115px'}}>
                                <Title>Panda</Title>
                            </Col>
                        </Row>
                        <Row justify='center' style={{marginTop: '20px'}}>
                            <Col style={{width: '150px'}}>
                                <Text>asndinasldnlasdnkasndlknaslkdnlkasndknasnkldasndklnaslkdnasdklsandksakdnklasndknaskdlkandklsndkasndklnaksdnksndlknnsdnkasdnl</Text>
                            </Col>
                            <Col style={{width: '150px', paddingLeft:'20px'}}>
                                <Text>asndinasldnlasdnkasndlknaslkdnlkasndknasnkldasndklnaslkdnasdklsandksakdnklasndknaskdlkandklsndkasndklnaksdnksndlknnsdnkasdnl</Text>
                            </Col>
                        </Row>
                        <Row justify='center' style={{marginTop: '20px'}}>
                            <Col style={{width: '320px'}} >
                                <Text>asndinasldnlasdnkasndlknaslkdnlkasndknasnkldasndklnaslkdnasdklsandksakdnklasndknaskdlkandklsndkasndklnaksdnksndlknnsdnkasdnl</Text>
                            </Col>
                        </Row>
                        <Row justify='center' style={{marginTop: '20px'}}>
                            <Col style={{width: '279px'}}>
                                <Button shape="round" icon={<MdOutlineManageSearch size={18}/>} size={'large'} style={{
                                    backgroundColor: '#fff0',
                                    borderColor: '#504f4fbd',
                                    color: '#504f4fbd'}}>Get more information of Panda</Button>
                            </Col>
                        </Row>
                    </Col>    

                </Row>

            </Layout>
        )
    }

}

export default HomePage;