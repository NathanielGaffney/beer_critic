import React, { Component } from 'react'
import ItemContext from '../../contexts/ItemContext'
import ItemApiService from '../../services/item-api-service'
import { Section } from '../../components/Utils/Utils'
import ItemListItem from '../../components/ItemListItem/ItemListItem'
// import Filter from '../../components/Filter/Filter'

export default class ItemListPage extends Component {
  static contextType = ItemContext

  componentDidMount() {
    this.context.clearError()
    ItemApiService.getItems()
      .then(this.context.setItemList)
      .catch(this.context.setError)
  }

  renderItems() {
    const { itemList = [] } = this.context
    return itemList.map(item =>
      <ItemListItem
        key={item.id}
        item={item}
      />
    )
  }

  // renderFilter(){
  //   if(filter){
  //     return(
  //       <>
  //       <Filter/>
  //       {this.renderItems}
  //       </>
  //     )
  //   } else {
  //     return (
  //     <> 
  //     {this.renderItems()}
  //     </>
  //     )
  //   }
  // }

  render() {
    const { error } = this.context
    return (
      <Section list className='ItemListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderItems()}
      </Section>
    )
  }
}