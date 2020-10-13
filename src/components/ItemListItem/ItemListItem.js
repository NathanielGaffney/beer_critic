import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NiceDate, Hyph } from '../Utils/Utils'
// import StyleIcon from '../StyleIcon/StyleIcon'
// import './ArticleListItem.css'

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

function ItemStyle({ item }) {
  return (
    <span className='ItemListItem__style'>
      {/* <StyleIcon style={item.style} /> */}
      {' '}
      {item.style}
    </span>
  )
}

function ItemDate({ item }) {
  return (
    <span className='ItemListItem__date'>
      <NiceDate
        date={item.date_modified}
      />
    </span>
  )
}

function ItemAuthor({ item }) {
  return (
    <span className='ItemListItem__author'>
      {item.author.full_name}
    </span>
  )
}

function ItemCommentCount({ item }) {
  return (
    <span
      className='ItemListItem__comment-count fa-layers fa-fw'
    >
      {/* <FontAwesomeIcon size='lg' icon='comment' /> */}
      <span
        className='fa-layers-text fa-inverse'>
        {item.number_of_comments}
      </span>
    </span>
  )
}
