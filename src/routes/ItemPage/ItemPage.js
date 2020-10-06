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

  componentDidMount() {
    const { itemId } = this.props.match.params
    this.context.clearError()
    ItemApiService.getItem(itemId)
      .then(this.context.setItem)
      .catch(this.context.setError)
    // ItemApiService.getItemComments(itemId)
    //   .then(this.context.setComments)
    //   .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearItem()
  }

  renderItem() {
    const { item } = this.context
    return <>
      <h2>{item.title}</h2>
      <p>
        <ItemStyle item={item} />
        {item.author.id && <>
          <Hyph />
          <ItemAuthor item={item} />
        </>}
        <Hyph />
        <NiceDate date={item.date_created} />
      </p>
      <ItemContent item={item} />
      {/* <ItemComments comments={comments} />
      <CommentForm /> */}
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
      content = this.renderItem()
    }
    return (
      <Section className='ItemPage'>
        {content}
      </Section>
    )
  }
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