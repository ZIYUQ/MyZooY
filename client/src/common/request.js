import Cookies from 'js-cookie'


export default function Post(data, url){ 
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

export function Get(url){ 
    const options = {
        method: 'GET',
        credentials: 'include',
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

export function modGet(url){ 
    const options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('modToken')}`
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


