import React from 'react';
import {Row, Col, Layout, Divider, Space, Spin, Typography, Input} from 'antd';
import ModMenuBar from '../component/modMenubar.js'
import '../css/App.css'
import {modGet} from '../common/request.js'
import {useNavigate} from 'react-router-dom'
import ModUserContent from '../component/modUserContent.js'

class ModPostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={loading: true, allUsers: undefined, users: undefined }
    }

    componentDidMount() {
        modGet('/mod/users')
        .then(data => {
            this.setState({allUsers: data.users})
            this.setState({users: data.users})
            this.setState({loading: false})
        })
        .catch(error => {
            this.navigation('/modlogin')
        })
    }  


    render(){
        const {Title, Text} = Typography
        if (this.state.loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' tip="Loading..."/>
            </Space>;
        }

        const sendUser = (id) => {
            var users_c = this.state.users
            for (var i = 0; i < users_c.length; i ++){
                if (users_c[i]._id === id){
                    users_c[i].ban = (!users_c[i].ban)
                    break
                }
            }
            console.log(users_c)
            this.setState({users: users_c})
        }

        const searchKeyword = (e) => {
            var keyword = e.target.value.toLowerCase()
            if (keyword === ''){
                this.setState({users: this.state.allUsers})
            }
            else{
                var users_c = []
                for (var i = 0; i < this.state.allUsers.length; i ++){
                    var userName = this.state.allUsers[i].userName.toLowerCase()
                    var email = this.state.allUsers[i].emailAddress.toLowerCase()
                    if (userName.includes(keyword) || email.includes(keyword)){
                        users_c.push(this.state.allUsers[i])
                    }
                }
                console.log(users_c)
                this.setState({users: users_c})
            }
        }

        return (
            <Layout style={{background: "white", minheight:'100vh'}}>
                <div style={{height: '100%'}}>
                    <Row style ={{minheight:'100vh'}}>
                        <Col span={3}>
                        </Col>
                        <Col span={5} style={{height: '100vh'}}>
                            <ModMenuBar navigation={this.props.navigation}></ModMenuBar>
                        </Col>
                        <div>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', margin:'0 0'}}/>
                        </div>
                        <Col span={10}>
                            <div style={{height: '50px', width: '100%', padding: '10px 15px'}}>
                                <Title level={3} style={{marginBottom: '0'}}>Ban User</Title>
                            </div>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <Row align='middle' style={{padding: '10px 20px', width: '100%'}}>
                                <Col>
                                    <Text>Search User: </Text>
                                </Col>
                                <Col span={20} offset={1}>
                                    <Input placeholder='Email or Username' onChange={e => searchKeyword(e)}></Input>
                                </Col>
                            </Row>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <div>
                               <ModUserContent users={this.state.users} 
                               sendUser={sendUser}></ModUserContent>
                            </div>
                        </Col>
                        <div>
                            <Divider orientation={'left'} type={'vertical'} style={{height: '100%', margin:'0 0'}}/>
                        </div>
                    </Row>
                </div>
            </Layout>
        )
    }
}

// Wrap and export
export default function ModPost(props) {  
    return <ModPostPage {...props} navigation={useNavigate()} />;
}