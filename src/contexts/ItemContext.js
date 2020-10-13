import React, { Component } from 'react'

export const nullItem = {
  author: {},
  tags: [],
}

const ItemContext = React.createContext({
  itemList: [],
  item: nullItem,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setItemList: () => {},
  setItem: () => {},
  clearItem: () => {},
  setComments: () => {},
  addComment: () => {},
  addToList: () => {},
})

export default ItemContext

export class ItemProvider extends Component {
  state = {
    itemList: [],
    item: nullItem,
    error: null,
  };

  setItemList = itemList => {
    this.setState({ itemList })
  }

  addToList = newItem => {
    this.setState([ ...this.state.itemList, newItem])
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setItem = item => {
    this.setState({ item })
  }

  setComments = comments => {
    this.setState({ comments })
  }

  clearItem = () => {
    this.setItem(nullItem)
    this.setComments([])
  }

  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    const value = {
      itemList: this.state.itemList,
      item: this.state.item,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setItem: this.setItem,
      setComments: this.setComments,
      clearItem: this.clearItem,
      addComment: this.addComment,
      setItemList: this.setItemList,
      addToList: this.addToList,
    }
    return (
      <ItemContext.Provider value={value}>
        {this.props.children}
      </ItemContext.Provider>
    )
  }
}