import Cookies from 'js-cookie'


export default function post(data, url){ 
    const options = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`
        },
    }
    return fetch('http://localhost:8000' + url,options)
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return res.json().then(res => {console.log(res)
            throw new Error(res.error)})
    })
}
