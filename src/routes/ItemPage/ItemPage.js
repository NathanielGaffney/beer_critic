import React, { Component } from 'react'
import ItemContext from '../../contexts/ItemContext'
import ItemApiService from '../../services/item-api-service'
import { Section } from '../../components/Utils/Utils'
import './ItemPage.css'

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
      edit: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { itemId } = this.props.match.params
    this.context.clearError()
    ItemApiService.getItem(itemId)
      .then(item => { this.context.setItem(item) })
      .then()
      .catch(this.context.setError)
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
    return <div>
      <h2>{item.name} {ItemFavorite(item)}</h2>
      <h3>Rating: {item.rating}</h3>
      <h3>Price: {item.price}</h3>
      <h3>{item.medium}</h3>
      <h3>{item.type}</h3>
      <p>{item.description}</p>
      <button onClick={this.handleEditPage}>Edit</button>
      <button onClick={this.handleDelete}>Delete</button>
    </div>
  }

  renderEditItem() {
    return <div>
      <form onSubmit={this.handleSubmit} className='editItem'>
        <input className='formitem' type='text' name='name' placeholder='Beer Name' value={this.state.name} onChange={this.handleInputChange}></input>
        <input className='formitem' type='text' name='type' placeholder='Beer Type' value={this.state.type} onChange={this.handleInputChange}></input>
        <input className='formitem' type='text' name='price' placeholder='Beer Price' value={this.state.price} onChange={this.handleInputChange}></input>
        <select className='formitem' name='rating' value={this.state.rating} onChange={this.handleInputChange}>
          <option>Select Rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select className='formitem' name='medium' value={this.state.medium} onChange={this.handleInputChange}>
          <option>Select Medium</option>
          <option>Draft</option>
          <option>Bottle</option>
          <option>Can</option>
          <option>Other</option>
        </select>
        <label htmlFor='#favorite'>Favorite</label>
        <input className='formitem' type='checkbox' id='favorite' name='favorite' checked={this.state.favorite} onChange={this.handleInputChange} />
        <textarea className='formitem' name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='Description'></textarea>
        <button className='formitem' type='submit'>Submit</button>
        <button className='formitem' onClick={this.handleDelete}>Delete</button>
      </form>
    </div>
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