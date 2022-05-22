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
            height: '700px',
            width: '1000px',
            playerVars: {
                autoplay: 0,
            },
        };
        const {Title, Paragraph} = Typography
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
                <Row justify='center' align="middle" style={{height:'100vh'}}>

                    <Col span={20}>
                            <Title level={1} style={{textAlign: 'center'}}>Panda</Title>
                            <YouTube videoId="JZoUGcuMLk8" opts={opts} style={{width: '1000px', marginLeft: 'auto', marginRight: 'auto', 
                            }}/>;
                            <Row justify='center' style={{marginTop: '20px'}}>
                                <Col style={{width: '279px'}}>
                                    <Link to='/characteristic'>
                                        <Button shape="round" icon={<MdOutlineManageSearch size={18}/>} size={'large'} style={{
                                            backgroundColor: '#fff0',
                                            borderColor: '#504f4fbd',
                                            color: '#504f4fbd'}}>Get more information of Panda</Button>
                                    </Link>
                                </Col>
                            </Row>
                    </Col>
                </Row>
                <Row justify='center' align="middle" style={{height:'100vh'}}>
                     <Col span={16}>
                         <Row justify='center' style={{marginTop: '20px', fontFamily: 'Arial', fontSize: '16px'}}>
                             <Col>
                                <Title level= {1} style={{textAlign: 'center'}}> Social Lisence</Title>
                                 <Paragraph>The giant panda belongs to the carnivora ursinae of a mammal, the body color is black and white. Pandas are endemic to China. Their main habitats are the mountainous areas around the Sichuan Basin in central and western China and the Qinling mountains in southern Shaanxi Province. It is a national treasure of mainland China. The giant panda is also known as a living fossil of the biological world. The panda's black and white fur and cute appearance have made it popular with people and fans all over the world. Since its establishment in 1961, WWF has used the giant panda as its symbol and has become the most important symbol of endangered species protection. After years of conservation efforts in China, the panda population has increased by more than 2,000 in the past four decades (according to official Chinese figures). Finally, in 2016, giant pandas changed from endangered species to vulnerable species, which fully demonstrates the importance of animal protection for endangered species. 
                                     <br></br> 
                                     <br></br>
                                     Pandas like to live alone, and each panda has its own enclosure. The panda's diet consists primarily of bamboo. Bamboo has a bright green color all year, and all portions of the nutritional makeup are normally the same; they consume bamboo heart and shoots, and occasionally bamboo leaves. Pandas, on the other hand, have small intestines and no symbiotic bacteria to digest cellulose. Pandas absorb just 17% of the bamboo they consume, but geese utilise 30% of their food, despite the fact that it travels fast through their digestive systems. This enables pandas to feed for more than ten hours every day. Because the panda feeds on a variety of bamboo species and its environment supports a diverse range of bamboo survival.
                                     <br></br>
                                     <br></br>
                                     Giant panda estrus is very short, estrus only 3-5 days a year, and the number of young, young is not easy to survive. The growth of panda population is very slow due to the highly specialized reproductive ability and child-rearing behavior of panda. So under the condition of the captive in addition to guide the independent pandas mating, panda base also use artificial breeding or artificial rearing, the giant panda base, the main way of breeding is artificial rearing, cubs that mating in the field of production, from base of care, to adulthood, have their own independent life ability, return to the wild.
                                     <br></br>
                                     <br></br>
                                     Due to the particularity of panda species, there are almost no records about pandas abroad. Most of the data and articles about pandas come from China's panda conservation base. So all the information about pandas on the site quotes reports from Panda sanctuaries in China.
                                 </Paragraph>
                             </Col>
                         </Row>
                    </Col>    

                </Row>

            </Layout>
        )
    }

}

export default HomePage;