import React from 'react';
import {Row, Col, Layout, Divider, Space, Spin, message, Typography} from 'antd';
import MenuBar from '../component/menubar.js'
import PostContent from '../component/postContent.js'
import '../css/App.css'
import {Get} from '../common/request.js'
import {useNavigate} from 'react-router-dom'

class PostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={loading: true, user: undefined}
    }

    componentDidMount() {
        Get('/getuserinfo')
        .then(data => {
            this.setState({user: data.user})
            this.setState({loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    render(){
        const navigation = this.props.navigation
        const {Title} = Typography
        const changeUserInfo =(newUser)=>{
            this.setState({user: newUser})
        }

        if (this.state.loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' />
                <h3>Loading</h3>
            </Space>;
        }

        return (
            <Layout style={{background: "white", minheight:'100vh'}}>
                <div style={{height: '100%'}}>
                    <Row style ={{minheight:'100vh'}}>
                        <Col span={3}>
                        </Col>
                        <Col span={4} style={{height: '100vh'}}>
                            <MenuBar user={this.state.user} navigation={this.props.navigation}></MenuBar>
                        </Col>
                        <div>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', margin:'0 0'}}/>
                        </div>
                        <Col span={10}>
                            <div style={{height: '50px', width: '100%', padding: '10px 15px'}}>
                                <Title level={3} style={{marginBottom: '0'}}>Post</Title>
                            </div>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <div>
                               <PostContent></PostContent>
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
export default function Post(props) {  
    return <PostPage {...props} navigation={useNavigate()} />;
}