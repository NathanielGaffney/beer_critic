import TokenService from '../services/token-service'
import config from '../config'

const UserApiService = {
  postUser(newUser){
    return fetch(`${config.API_ENDPOINT}/user`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      }),
    })
    .then(res => 
      (!res.ok) 
        ? res.json().then(e => Promise.reject(e)) 
        : res.json()
    )
    .then(res => res)
  },
}

export default UserApiService;