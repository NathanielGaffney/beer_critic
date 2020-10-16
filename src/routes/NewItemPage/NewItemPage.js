import React, { Component } from 'react'
import ItemApiService from '../../services/item-api-service'
import ItemContext from '../../contexts/ItemContext'
import './NewItemPage.css'

export default class ItemListPage extends Component {
    static contextType = ItemContext
    constructor(props) {
        super(props);
        this.state ={
            name:'',
            rating:'',
            price:'',
            type:'',
            medium:'',
            description:'',
            favorite: false,
            user_id: 1,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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
        ItemApiService.postItem(newItem)
            .then(res => {
                this.context.addToList(res)
                this.props.history.push('/')
            })
          .catch(this.context.setError)
        
      }

    handleCancel = ev => {
        ev.preventDefault(
            this.props.history.push('/')
        )
    }

    render() {
        
        return (
            <form onSubmit={this.handleSubmit} className='NewItemPage'>
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
                <input type='checkbox' id='favorite' name='favorite' checked={this.state.favorite} onChange={this.handleInputChange}/>
                <textarea name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='Description'></textarea>
                <button type='submit'>Submit</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </form>
        )
    }
}