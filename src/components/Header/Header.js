import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Route } from 'react-router'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hyph } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import Filter from '../Filter/Filter'
import './Header.css'

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.props.history.push('/login')
  }

  handleFilterClick = () => {
    this.setState({ filter: !this.state.filter})
  }

  state ={
    filter: false,
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
        <Hyph />
        <Link
          onClick={this.handleFilterClick}
          to='/'>
            Sort
        </Link>
        <Hyph />
        <Link 
          to='/new-item'>
          Add New Item
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/register'>
          Register
        </Link>
        <Hyph />
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  renderFilterLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
        <Hyph />
        <Link
          onClick={this.handleFilterClick}
          to='/'>
            Sort
        </Link>
        <Filter></Filter>
        <Hyph />
        <Link 
          to='/new-item'>
          Add New Item
        </Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <h1>
          <Link to='/'>
            {/* <FontAwesomeIcon className='green' icon='frog' /> */}
            {' '}
            Beer Critic
          </Link>
        </h1>
        {(!TokenService.hasAuthToken())
          ? this.renderLoginLink()
          : (this.state.filter)
              ? this.renderFilterLink()
              : this.renderLogoutLink()
        }
      </nav>
    )
  }
}

export default withRouter(Header)