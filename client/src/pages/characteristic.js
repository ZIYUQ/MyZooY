import React from 'react';
import '../css/App.css'
import {Link} from 'react-router-dom'
import {Row, Col, Layout, Typography, Menu, Divider} from 'antd';


class CharacteristicPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {article: '1'}
    }

    render() {
        const items = [
            {label: '', key: '5', icon: 
                <Link to='/'>
                    <img src='/img/logo.svg' alt='logo' style={{height: '30px', paddingLeft: '10px'}}></img>
                </Link>
            },
            { label: 'Zoo Exprience', key: '1' },
            { label: 'Welfare', key: '2' },
            { label: 'Captive Breeding Condition', key: '3' },
            { label: 'Risk of Extinction', key: '4' },
        ];

        const showArticle = () => {
            if (this.state.article === '3'){
                return (
                    <Row justify='center' style={{height: '100vh'}}>
                        <Col>
                            <Divider orientation={'left'} type={'vertical'} style={{height: '100%', marginRight: '50px'}}/>
                        </Col>
                        <Col span={12} style={{paddingTop: '60px'}}>
                            <Row justify='center'>
                                <Col>
                                    <Title level={2} style={{color: 'rgb(42 131 3)'}}>
                                    What conditions are needed for successful captive breeding?
                                    </Title>
                                </Col>
                            </Row>
                            <Row justify='Left' style={{paddingTop: '40px'}}>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>1. “Social”</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                        To teach panda cubs how to "socialize", the keepers will teach them how to get along and communicate with each other in various ways.
                                        For example: play videos of how pandas mate to help them learn how to mate.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>2. Lifestyle</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Wild animals, most suitable for its life is its native environment, including climate, vegetation, terrain, 
                                    and many other factors. Captive breeding should try not to change the living environment of giant pandas, 
                                    "retain the survival habits and life rules of the animals themselves.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>3. Keep Healthy</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    In most wild animals, mating is only possible during estrus. For them, mating and reproduction, 
                                    it's a very exhausting business, it takes a year or even years to accumulate nutrients so that they can be at their peak when they 
                                    come into heat and mate. 
                                    The zoo need to ensure that the physical fitness of giant pandas can complete natural mating.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>4. Environment</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Improve the captive panda cage environment, reasonable layout of the playground, provide panda rocks, perches, 
                                    trees and other objects for climbing, in the stadium layout of a reasonable slope, conditional also increase the pool. 
                                    In addition, the design of the cage gives pandas a place to avoid the attention of visitors when they are under too much pressure, 
                                    so as to reduce the pressure pandas bear. 
                                    So that pandas can have a "home" closer to their native environment.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>5. Diet</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Provide a reasonable "menu" for the panda, let the panda "food" ratio more scientific, 
                                    and change the frequency of feeding. In the past, zoo feeding is often at a fixed time, 
                                    but the wild animals eating time is not fixed, when there is a meal when to eat, and often hungry full meal; 
                                    Some zoos simulate these characteristics to restore the living conditions of wild animals.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>5. The introduction of Feng Rong</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    It will also introduce Feng Rong. Feng Rong is an important work to relieve stress for wild animals in captivity. 
                                    Scientific feng Rong can lead to better physical condition of animals. For example, 
                                    a tire or a wooden stake will be very fresh for a panda 
                                    living in a fixed environment for a long time. It will be very happy to have a new toy.
                                    </Paragraph>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', marginLeft: '50px'}}/>
                        </Col>
                </Row>
                )
            }
            else if (this.state.article === '1'){
                return (
                    <Row justify='center' style={{height: '100vh'}}>
                        <Col>
                            <Divider orientation={'left'} type={'vertical'} style={{height: '100%', marginRight: '50px'}}/>
                        </Col>
                        <Col span={12} style={{paddingTop: '60px'}}>
                            <Row justify='center'>
                                <Col>
                                    <Title level={2} style={{color: 'rgb(42 131 3)'}}>
                                        How panda would experience what it experiences in a zoo?
                                    </Title>
                                </Col>
                            </Row>
                            <Row justify='Left' style={{paddingTop: '40px'}}>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>1. Life Experience</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Feng Rong at the zoo refers to keepers adjusting the living environment or feeding time and mode of 
                                    animals using various means and ways in order to restore the living environment of animals in the wild to the greatest degree possible and 
                                    allow them to exhibit more natural behaviors. Each panda has his or her own caretaker. The keepers are not only in charge of the panda feng Rong labor, 
                                    but they also require regular behavior instruction. Training is a vital daily task since it not only improves the attachment between keepers and pandas, 
                                    but it also improves the animals' and keepers' collaboration. To reduce physical injury to the animals, 
                                    keepers can assist the animals during the medical examination by doing blood draws and other items under the premise of non-anesthesia.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>2. Food Providing</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    An adult panda consumes 12 to 20 kg of bamboo each day. Giant pandas may eat for up to 13 hours a day and sleep for the most of the time. Bamboo plants provide 99 percent of the giant panda's annual diet, with huge arrow bamboo, Huaxi arrow bamboo, and other seven bamboo being the giant panda's favorites. The zoo supplies enough water and food for the big pandas. To maintain the panda's health, keepers will prepare nourishing meals for it.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>3. Environment</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Giant pandas prefer to live alone because they prefer cool, humid environments. As a result, the zoo will provide a semi-open forest in which the giant pandas can move freely while maintaining the proper temperature and humidity.
                                    </Paragraph>
                                </Col>
                            </Row>
                           
                        </Col>
                        <Col>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', marginLeft: '50px'}}/>
                        </Col>
                </Row>
                )
            }
            else if (this.state.article === '2'){
                return (
                    <Row justify='center' style={{height: '100vh'}}>
                        <Col>
                            <Divider orientation={'left'} type={'vertical'} style={{height: '100%', marginRight: '50px'}}/>
                        </Col>
                        <Col span={12} style={{paddingTop: '60px'}}>
                            <Row justify='center'>
                                <Col>
                                    <Title level={2} style={{color: 'rgb(42 131 3)'}}>
                                        What are its welfare needs?
                                    </Title>
                                </Col>
                            </Row>
                            <Row justify='Left' style={{paddingTop: '40px'}}>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>1. Nutrition</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Bamboo specialists: <br></br>
                                    •	More than 99% of diet is bamboo <br></br>
                                    •	Consume 25 species of bamboo <br></br>
                                    •	Protein in leaves, branches, and stems <br></br>
                                    •	Pandas change their foraging behavior to take advantage of key nutrients <br></br>
                                    Other food items: <br></br>
                                    •	Account for c. 1% of diet <br></br>
                                    •	Occasionally eat eggs, small or infant animals, carrion – all opportunistically <br></br>
                                    •	Forage in farmlands for pumpkin, kidney beans, wheat, domestic pig food <br></br>
                                    •	Occasionally eat other plant species<br></br>
                                    •	Consumption of soil observed, but rarely (perhaps for absorbing plant toxins)<br></br>

                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>2. Health</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    •	Provide weekly health check-ups<br></br>
                                    •	Breeding under management care to increase breeding success by managing breeding programs<br></br>
                                    •	Research on the natural behavior of giant pandas has significantly improved the success rate of reproduction, pregnancy and young rearing<br></br>
                                    •	Provide artificial care delivery<br></br>

                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>3. Environment</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    •	Giant pandas live in dense bamboo forests 2,600-3,500 meters above sea level. The air is thin all year round, shrouded by clouds and mist, and the temperature is below 20℃. <br></br>
                                    •	The giant panda is a kind of hygrophilic animal, the habitat climate is cool and humid, the humidity is often above 80%.<br></br>
                                    •	The areas where giant pandas live are mostly in gullies, depressions on the mountainsides, and terraces of river valleys, which are generally on gentle slopes below 20℃. Bamboo grows well in these places, with relatively stable temperature and abundant water sources.<br></br>
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>4. Behavior</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    •	Athletic ability: Lives on the ground, but can climb trees well.
                                    •	Activity cycle: 14.2 hours of daily activity (dawn and dusk), almost all of which is spent eating; Not hibernate.
                                    •	Social group: solitary, breeding from March to May.
                                    •	Communication: smell, sound.
                                    •	Diet: more than 99% bamboo shoots and roots; 1% opportunistic small rodents, carrion, other plants.


                                    </Paragraph>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', marginLeft: '50px'}}/>
                        </Col>
                </Row>
                )
            }
            else if (this.state.article === '4'){
                return (
                    <Row justify='center' style={{height: '100vh'}}>
                        <Col>
                            <Divider orientation={'left'} type={'vertical'} style={{height: '100%', marginRight: '50px'}}/>
                        </Col>
                        <Col span={12} style={{paddingTop: '60px'}}>
                            <Row justify='center'>
                                <Col>
                                    <Title level={2} style={{color: 'rgb(42 131 3)'}}>
                                        Why this animal lacks biosecurity and is at risk of extinction?
                                    </Title>
                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <img src='/img/Figure1.png' alt='figure' style={{height: '450px'}}></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    This figures are gleaned from official Chinese statistics. In addition, they were verified by other sites, such as Statista.com. 
                                    We can see that from the 1970s to the 1980s the population of giant pandas has been declining, and there is a risk of extinction. '
                                    For this situation, we have analyzed the reasons for the extinction of these giant pandas, mainly divided into the following points: 
                                    </Paragraph>
                                </Col>
                            </Row>

                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>1. Habitat Loss</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Human deforestation, which has resulted in irreversible habitat loss in certain regions, is by far the largest threat 
                                    to wild pandas and the main cause for their critically endangered status today. Wild pandas previously inhabited China, Vietnam, 
                                    Laos, and Myanmar's bamboo forests. Wild pandas can now only be found in China, 
                                    and in lesser numbers than in the past. Scientists believe that there are just about 1,800 wild pandas left on the planet. <br></br> <br></br>
                                    The panda has been doomed by habitat loss. The panda's food source disappears when a bamboo forest is removed. Because today's woods are isolated from one another by human cities and towns, migration to another forest is sometimes difficult. Pandas whose forests have been chopped down will starve to death if there is no reliable source of bamboo.

                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>2. Inability to Adapt to Difficulties</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Some animals have evolved ways to adapt to human activities in formerly wild environments. Raccoons, for example, used to reside mostly in forests but now live in many cities and towns, devouring food that people throw away. Raccoons may adapt in this fashion due to physical characteristics such as their digestive systems, which can digest nearly any type of food, and their tiny stature, which allows them to conceal. Other animals, such as pigeons and rats, have evolved to living with humans in a similar fashion. <br></br> <br></br>
                                    Pandas do not have these adaptations. They cannot easily relocate to settlements if their woods are destroyed, owing to their special adaptation to eating bamboo. Other meals are not properly digested by the panda's digestive tract. Because bamboo shoots and leaves are low in nutrition, pandas must eat a lot of them - 20 to 40 pounds each day. Even if pandas could eat something other than bamboo, their great size would prevent them from securely integrating into a city or town. The only habitat in which pandas may survive is the one to which they adapt first.

                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>3. Breeding is Difficult</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    Breeding pandas in captivity is notoriously difficult. Pandas are quite picky about who they mate with, so even if a male and female giant panda are maintained in the same cage for several years, there is no assurance that they will marry. If pandas mate in captivity, their children are generally kept in confinement as well, as imprisonment appears to go against many mother pandas' maternal instincts, prompting them to abandon or even damage their cubs. Conservation initiatives to release pandas into the wild to raise their numbers are just not feasible due to these issues.
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Row justify='Left'>
                                <Col>
                                    <Title level={4} style={{color: 'rgb(42 131 3)'}}>4. Poaching of Wild Giant Pandas</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Paragraph level={1} style={{fontSize: '20px'}}>
                                    It may seem impossible that someone would purposefully murder an endangered species, yet illegal poaching does occur. Poachers may make a lot of money selling panda skins on the illicit market. Poachers face hefty fines in China if they are caught hunting pandas, yet some continue despite the risks. With so few wild pandas left, even one panda murdered by poachers is a heartbreaking loss.                                    </Paragraph>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', marginLeft: '50px'}}/>
                        </Col>
                </Row>
                )
            }
            else{
                
            }
        }
        
        const {Title, Paragraph} = Typography
        return (
            <Layout style={{background: "white", minHeight:'100vh', fontFamily: 'Arial'}}>
                    <Menu items={items} mode="horizontal" defaultSelectedKeys={['1']} onClick={e=>this.setState({article: e.key})}
                    style={{height: '48px', color: 'rgb(42 131 3)', fontSize: '18px'}}></Menu>

                {showArticle()}
            </Layout>
        )
    }

}

export default CharacteristicPage;