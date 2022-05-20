import React from 'react';
import { Button } from 'antd';
import { BookOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


export default function MenuBar(props){


    return (
        <div>
            <div style={{height: '100px', width:'100px', padding: '10px 15px'}}>
                <Button type="text" shape="circle" icon={ 
                    <img src='/img/logo.svg' alt='logo' style={{maxHeight: '100%'}}></img>}
                    size={'large'} style={{height: '72px', width:'72px'}}/>
            </div>

            <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                <Link to={'/mod/post'}>
                    <Button shape="round" icon={<BookOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                        fontSize:'18px', textAlign:'left'}}>
                        Post
                    </Button>
                </Link>
            </div>

            <div style={{height: '70px', width:'100%', padding: '10px 15px'}}>
                <Link to={'/mod/user'}>
                    <Button shape="round" icon={<LoginOutlined /> } size='large' type="text" style={{height: '60px', width:'100%', 
                        fontSize:'18px', textAlign:'left'}}>
                        User
                    </Button>
                </Link>
            </div>
        </div>
    )

    


}