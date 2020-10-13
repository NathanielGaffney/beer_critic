import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ItemContext, { nullItem } from '../../contexts/ItemContext'
import ItemApiService from '../../services/item-api-service'
import { NiceDate, Hyph, Section } from '../../components/Utils/Utils'
// import StyleIcon from '../../components/StyleIcon/StyleIcon'
// import CommentForm from '../../components/CommentForm/CommentForm'
// import './ItemPage.css'

export default class ItemPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = ItemContext

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: '',
      price: '',
      type: '',
      medium: '',
      description: '',
      favorite: false,
      user_id: 1,
      edit: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { itemId } = this.props.match.params
    this.context.clearError()
    ItemApiService.getItem(itemId)
      .then(item => { this.context.setItem(item) })
      .then(console.log(this.context.item))
      .then()
      .catch(this.context.setError)
    // ItemApiService.getItemComments(itemId)
    //   .then(this.context.setComments)
    //   .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearItem()
  }

  handleEditPage = ev => {
    ev.preventDefault()
    this.setState({
      id: this.context.item.id,
      name: this.context.item.name,
      rating: this.context.item.rating,
      price: this.context.item.price,
      type: this.context.item.type,
      medium: this.context.item.medium,
      description: this.context.item.description,
      favorite: this.context.item.favorite,
      user_id: 1,
      edit: !this.state.edit
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
    console.log(this.state.name)
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const newItem = this.state
    ItemApiService.patchItem(newItem)
        .then(window.location.reload())
      .catch(this.context.setError)
    
  }

  handleDelete = ev => {
    ev.preventDefault()
    const id = this.context.item.id
    ItemApiService.deleteItem(id)
      .then(res => {
        const num = this.context.itemList.findIndex(item => item.id === res.item.id)
        this.context.itemList.splice(num, 1)
        this.props.history.push('/')
      })
  }

  renderItem() {
    const { item } = this.context
    return <>
      <h2>{item.name}</h2>
      <h3>Rating: {item.rating}</h3>
      <h3>Price: {item.price}</h3>
      <h3>{item.medium}</h3>
      <h3>{item.type}</h3>
      <h3>Favorite: {ItemFavorite(item)}</h3>
      <p>{item.description}</p>
      <button onClick={this.handleEditPage}>Edit</button>
      <button onClick={this.handleDelete}>Delete</button>
    </>
  }

  renderEditItem() {

    console.log(this.state)
    return <>
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='name' placeholder='Beer Name' value={this.state.name} onChange={this.handleInputChange}></input>
        <input type='text' name='type' placeholder='Beer Type' value={this.state.type} onChange={this.handleInputChange}></input>
        <input type='text' name='price' placeholder='Beer Price' value={this.state.price} onChange={this.handleInputChange}></input>
        <select name='rating' value={this.state.rating} onChange={this.handleInputChange}>
          <option>Select Rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select name='medium' value={this.state.medium} onChange={this.handleInputChange}>
          <option>Select Medium</option>
          <option>Draft</option>
          <option>Bottle</option>
          <option>Can</option>
          <option>Other</option>
        </select>
        <label htmlFor='#favorite'>Favorite</label>
        <input type='checkbox' id='favorite' name='favorite' checked={this.state.favorite} onChange={this.handleInputChange} />
        <textarea name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='Description'></textarea>
        <button type='submit'>Submit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </form>
    </>
  }

  render() {
    const { error, item } = this.context
    let content
    if (error) {
      content = (error.error === `Item doesn't exist`)
        ? <p className='red'>Item not found</p>
        : <p className='red'>There was an error</p>
    } else if (!item.id) {
      content = <div className='loading' />
    } else {
      this.state.edit
        ? content = this.renderEditItem()
        : content = this.renderItem()
    }
    return (
      <Section className='ItemPage'>
        {content}
      </Section>
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
    <span className='ItemPage__style'>
      {/* <StyleIcon style={item.style} />
      {' '}
      {item.style} */}
    </span>
  )
}

function ItemAuthor({ item = nullItem }) {
  return (
    <span className='ItemPage__author'>
      {item.author.full_name}
    </span>
  )
}

function ItemContent({ item }) {
  return (
    <p className='ItemPage__content'>
      {item.content}
    </p>
  )
}

// function ItemComments({ comments = [] }) {
//   return (
//     <ul className='ItemPage__comment-list'>
//       {comments.map(comment =>
//         <li key={comment.id} className='ItemPage__comment'>
//           <p className='ItemPage__comment-text'>
//             <FontAwesomeIcon
//               size='lg'
//               icon='quote-left'
//               className='ItemPage__comment-icon blue'
//             />
//             {comment.text}
//           </p>
//           <p className='ItemPage__comment-user'>
//             {comment.user.full_name}
//           </p>
//         </li>
//       )}
//     </ul>
//   )
// }