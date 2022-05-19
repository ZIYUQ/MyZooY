import React from 'react';
import {Row, Col, Layout, Divider, Space, Spin, message, Typography} from 'antd';
import MenuBar from '../component/menubar.js'
import DetailContent from '../component/detailContent.js'
import '../css/App.css'
import {Get} from '../common/request.js'
import {useNavigate, useLocation } from 'react-router-dom'

class PostDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state={loading: true, user: undefined, post: undefined}
    }

    componentDidMount() {
        const id = this.props.postID
        Get('/getuserinfo')
        .then(data => {
            console.log(data)
            this.setState({user: data.user})
            this.setState({loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
        })

        Get('/post/select?postid=' + id)
        .then(data => {
            this.setState({post: data.post})
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    render(){
        const navigation = this.props.navigation
        const {Title} = Typography

        const sendData = (post) => {
            this.setState({post: post})
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
                        <Col span={5} style={{height: '100vh'}}>
                            <MenuBar user={this.state.user} navigation={this.props.navigation}></MenuBar>
                        </Col>
                        <div>
                            <Divider orientation={'right'} type={'vertical'} style={{height: '100%', margin:'0 0'}}/>
                        </div>
                        <Col span={10}>
                            <div style={{height: '50px', width: '100%', padding: '10px 15px'}}>
                                <Title level={3} style={{marginBottom: '0'}}>Detail</Title>
                            </div>
                            <Divider style={{width: '100%', margin:'0 0'}}/>
                            <div>
                               <DetailContent post={this.state.post} navigation={navigation} 
                                user={this.state.user}
                                sendData={sendData}></DetailContent>
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
export default function PostDetail(props) {
    
    const location = useLocation()
    
    const GetQueryString = (name) => {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
        
    return <PostDetailPage {...props} navigation={useNavigate()} postID={GetQueryString('id')}/>;
}