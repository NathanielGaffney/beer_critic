import TokenService from '../services/token-service'
import config from '../config'

const ItemApiService = {
  getItems() {
    return fetch(`${config.API_ENDPOINT}/items`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
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
  // getItemComments(articleId) {
  //   return fetch(`${config.API_ENDPOINT}/articles/${articleId}/comments`, {
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  // postComment(articleId, text) {
  //   return fetch(`${config.API_ENDPOINT}/comments`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       article_id: articleId,
  //       text,
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default ItemApiService