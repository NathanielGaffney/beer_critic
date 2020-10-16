import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ItemListItem.css'

export default class ItemListItem extends Component {
  render() {
    const { item } = this.props
    return (
      <Link to={`/item/${item.id}`} className='ItemListItem'>
        <header className='ItemListItem__header'>
          <h2 className='ItemListItem__heading'>
            {item.name} {ItemFavorite(item)}
          </h2>
        </header>
        <footer className='ItemListItem__footer'>
          <h3>{item.medium}</h3>
          <h3>{item.type}</h3>
          <h3>Rating: {item.rating}</h3>
        </footer>
      </Link>
    )
  }
}

function ItemFavorite(item) {
  let bool;
  if (!item.favorite) {
    bool = ''
  } else {
    bool = <i className="fas fa-heart"></i>
  }
  return (
    <span>
      {bool}
    </span>
  )

}
