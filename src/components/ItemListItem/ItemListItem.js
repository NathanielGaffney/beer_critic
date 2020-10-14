import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NiceDate, Hyph } from '../Utils/Utils'
// import StyleIcon from '../StyleIcon/StyleIcon'
import './ItemListItem.css'

export default class ItemListItem extends Component {
  render() {
    const { item } = this.props
    return (
      <Link to={`/item/${item.id}`} className='ItemListItem'>
        <header className='ItemListItem__header'>
          <h2 className='ItemListItem__heading'>
            {item.name}
          </h2>
          {/* <ItemDate item={item} /> */}
        </header>
        <footer className='ItemListItem__footer'>
          <h3>{item.medium}</h3>
          <h3>{item.type}</h3>
          <h3>Rating: {item.rating}</h3>
          <h3>Favorite: {ItemFavorite(item)}</h3>
        </footer>
      </Link>
    )
  }
}

function ItemFavorite(item) {
  let bool;
  if (!item.favorite) {
    bool = 'false'
  } else {
    bool = 'true'
  }
  return (
    <span>
      {bool}
    </span>
  )

}
