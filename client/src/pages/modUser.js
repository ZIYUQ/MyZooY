import React from 'react';
import {Row, Col, Layout, Divider, Space, Spin, Typography} from 'antd';
import ModMenuBar from '../component/modMenubar.js'
import '../css/App.css'
import {modGet} from '../common/request.js'
import {useNavigate} from 'react-router-dom'
import ModUserContent from '../component/modUserContent.js'

class ModPostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={loading: true, users: undefined}
    }

    componentDidMount() {
        modGet('/mod/users')
        .then(data => {
            this.setState({users: data.users})
            this.setState({loading: false})
        })
        .catch(error => {
            this.navigation('/modlogin')
        })
    }

    render(){
        const {Title} = Typography
        if (this.state.loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' tip="Loading..."/>
            </Space>;
        }

        const sendPost = (id) => {
            var posts_c = this.state.posts
            for (var i = 0; i < posts_c.length; i ++){
                if (posts_c[i]._id === id){
                    posts_c.splice(i, 1)
                    break
                }
            }
            console.log(posts_c)
            this.setState({posts: posts_c})
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
                                <Title level={3} style={{marginBottom: '0'}}>Pending Post</Title>
                            </div>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <div>
                               <ModUserContent users={this.state.users} 
                               sendPost={sendPost}></ModUserContent>
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