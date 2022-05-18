import {Avatar} from 'antd';
import '../css/App.css'
import { UserOutlined } from '@ant-design/icons';

const pfp = (props) => {
    const avatar = props.avatar

    if (avatar.data === undefined || avatar.data === ''){
        return (
            <Avatar size={avatar.size} icon={<UserOutlined />}/>
        )
    }
    else {
        return (
            <Avatar size={avatar.size} src={avatar.data }/>
        )
    }
}

export default pfp