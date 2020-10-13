import React, { Component } from 'react'
import ItemContext from '../../contexts/ItemContext'
import { Section } from '../Utils/Utils'

export default class Filter extends Component {
    static contextType = ItemContext

    handleChange = ev => {
        const value = ev.target.value;
        let itemList = [...this.context.itemList]
        if (value === 'ABC'){
            itemList.sort((a, b) => {
                let itemA = a.name.toLowerCase()
                let itemB = b.name.toLowerCase()
                if (itemA < itemB)
                return -1
                if (itemA > itemB)
                return 1
                return 0
            });
        } else if (value === 'Favorites'){
            itemList.sort((a, b) => {
                let itemA = a.favorite
                let itemB = b.favorite
                if (itemA === itemB)
                return 0
                if (itemA)
                return -1
                return 1
            });
        } else if (value === 'Rating'){
            itemList.sort((a, b) => {
                let itemA = a.rating
                let itemB = b.rating
                if (itemA > itemB)
                return -1
                if (itemA < itemB)
                return 1
                return 0
            });
        } else if (value === 'Type'){
            itemList.sort((a, b) => {
                let itemA = a.type.toLowerCase()
                let itemB = b.type.toLowerCase()
                if (itemA < itemB)
                return -1
                if (itemA > itemB)
                return 1
                return 0
            });
        }
        this.context.setItemList(itemList)

    }

    renderFilter(){
        return(
            <>
                <select onChange={this.handleChange}>
                    <option>Choose an option</option>
                    <option>ABC</option>
                    <option>Favorites</option>
                    <option>Rating</option>
                    <option>Type</option>
                </select>
            </>
        )
    }

    render(){
        return(
            <Section>
                {this.renderFilter()}
            </Section>
            
        )
    }
}