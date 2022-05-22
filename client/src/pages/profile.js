import React from 'react';
import {Row, Col, Layout, Divider, Space, Spin, Typography} from 'antd';
import MenuBar from '../component/menubar.js'
import ProfileContent from '../component/profileContent.js'
import '../css/App.css'
import {Get} from '../common/request.js'
import {useNavigate} from 'react-router-dom'
import PostContent from '../component/postContent.js'
 


class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={loading: true, user: undefined, posts: undefined}
    }

    componentDidMount() {
        Get('/getuserinfo')
        .then(data => {
            this.setState({user: data.user})
            var posts = data.user.posts.reverse()
            posts.map(post => {
                post.userID = {...data.user}
                return post
            })
            this.setState({posts: posts})
            this.setState({loading: false})
        })
        .catch(error => {
            this.props.navigation('/post')
        })
    }

    render(){
        const navigation = this.props.navigation
        const {Title} = Typography

        const changeUserInfo =(newUser)=>{
            this.setState({user: newUser})
        }

        const sendPost = (post_c) => {
            var posts_c = this.state.posts
            for (var i = 0; i < posts_c.length; i ++){
                if (posts_c[i]._id === post_c._id){
                    posts_c[i] = post_c
                    break
                }
            }
            this.setState({posts: posts_c})
        }

        if (this.state.loading) {
            return <Space size='middle' style={{ position: 'relative', marginLeft: '50vw', marginTop: '50vh' }}>
                <Spin size='large' tip="Loading..."/>
            </Space>;
        }

        return (
            <Layout style={{background: "white", minheight:'100vh'}}>
                <div style={{height: '100%'}}>
                    <Row style ={{minheight:'100vh'}}>
                        <Col span={3}>
                        </Col>
                        <Col span={5}>
                            <MenuBar user={this.state.user} navigation={this.props.navigation}></MenuBar>
                        </Col>
                        <div>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', margin:'0 0'}}/>
                        </div>
                        <Col span={10}>
                            <div style={{height: '50px', width: '100%', padding: '10px 15px'}}>
                                <Title level={3} style={{marginBottom: '0'}}>Profile</Title>
                            </div>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <div style={{minHeight: '90vh'}}>
                                <ProfileContent data={this.state.user} 
                                    navigation={navigation}
                                    changeUserInfo ={changeUserInfo}></ProfileContent>
                                <Divider style={{width: '100%', margin:'20px 0 0 0'}}></Divider>
                                <PostContent posts={this.state.posts} navigation={navigation} user={this.state.user} 
                               sendPost={sendPost} sendUser ={changeUserInfo}></PostContent>
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
export default function Profile(props) {  
    return <ProfilePage {...props} navigation={useNavigate()} />;
}