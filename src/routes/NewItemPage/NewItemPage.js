import React, { Component } from 'react'
import ItemApiService from '../../services/item-api-service'
import ItemContext from '../../contexts/ItemContext'
import './NewItemPage.css'

export default class ItemListPage extends Component {
    static contextType = ItemContext
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: '',
                rating: '',
                price: '',
                type: '',
                medium: '',
                description: '',
                favorite: false,
            },
            error: null,

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { item } = { ...this.state };
        const currentState = item;
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        if (target.name === 'price') {
            this.validateNumber(event)
        }

        currentState[name] = value;
        
        this.setState({
                item: currentState
        });
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const newItem = this.state.item

        for (const [key, value] of Object.entries(newItem))
            if (value === '') {
                alert(`Please enter a '${key}'`)
                return
            }

        ItemApiService.postItem(newItem)
            .then(res => {
                this.context.addToList(res)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState((error))
            })

    }

    handleCancel = ev => {
        ev.preventDefault(
            this.props.history.push('/')
        )
    }

    validateNumber = (event) => {
        if (isNaN(Number(event.target.value))) {
            this.setState({error:"Please type a number"})
        }
        else {
            this.setState({error:""})
        }
    }

    render() {

        return (
            <div>
                <h3 className='add-error'>{this.state.error}</h3>
                <form onSubmit={this.handleSubmit} className='NewItemPage'>
                    <input className='formitem' type='text' name='name' placeholder='Beer Name' value={this.state.item.name} onChange={this.handleInputChange}></input>
                    <input className='formitem' type='text' name='type' placeholder='Beer Type' value={this.state.item.type} onChange={this.handleInputChange}></input>
                    <input className='formitem' type='text' name='price' placeholder='Beer Price' value={this.state.item.price} onChange={this.handleInputChange}></input>
                    <select className='formitem' name='rating' value={this.state.item.rating} onChange={this.handleInputChange}>
                        <option>Select Rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <select className='formitem' name='medium' value={this.state.item.medium} onChange={this.handleInputChange}>
                        <option>Select Medium</option>
                        <option>Draft</option>
                        <option>Bottle</option>
                        <option>Can</option>
                        <option>Other</option>
                    </select>
                    <label htmlFor='#favorite'>Favorite</label>
                    <input className='formitem' type='checkbox' id='favorite' name='favorite' checked={this.state.item.favorite} onChange={this.handleInputChange} />
                    <textarea className='formitem' name='description' value={this.state.item.description} onChange={this.handleInputChange} placeholder='Description'></textarea>
                    <button className='formitem' type='submit'>Submit</button>
                    <button className='formitem' onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>

        )
    }
}