import TokenService from '../services/token-service'
import config from '../config'

const ItemApiService = {
  getItems(user_id) {
    return fetch(`${config.API_ENDPOINT}/items`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>{
       return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
  },
  getItem(itemId) {
    return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postItem(newItem){
    return fetch(`${config.API_ENDPOINT}/items`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: newItem.name,
        rating: Number(newItem.rating),
        price: Number(newItem.price),
        type: newItem.type,
        medium: newItem.medium,
        description: newItem.description,
        favorite: newItem.favorite,
        user_id: Number(newItem.user_id)
      }),
    })
    .then(res => 
      (!res.ok) 
        ? res.json().then(e => Promise.reject(e)) 
        : res.json()
    )
    .then(res => res)
  },
  patchItem(newItem){
    return fetch(`${config.API_ENDPOINT}/items/${newItem.id}`,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: newItem.name,
        rating: Number(newItem.rating),
        price: Number(newItem.price),
        type: newItem.type,
        medium: newItem.medium,
        description: newItem.description,
        favorite: newItem.favorite,
        user_id: Number(newItem.user_id)
      }),
    })
    .then(res => 
      (!res.ok) 
        ? res.json().then(e => Promise.reject(e)) 
        : res.json()
    )
    .then(res => res)
  },
  deleteItem(id){
    return fetch(`${config.API_ENDPOINT}/items/${id}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>{
      return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })

  },
}

export default ItemApiService