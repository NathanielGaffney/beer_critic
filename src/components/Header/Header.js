import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
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

  handleSingleState = () => {
    this.setState(this.singleHeader())
  }

  singleHeader(){
      let bool;
      if(this.props.location.pathname.startsWith('/item/')){
        bool = true;
      } else {
        bool = false;
      }
      return bool;
  }

  testHeader(){
    return true;
  }


  state ={
    filter: false,
    single: false,
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
        <Hyph />
        <Link
          onClick={this.handleFilterClick}
          to='/'>
            <i className="fas fa-sort-amount-down-alt"></i>
            <Hyph />
            Sort
        </Link>
        <Hyph />
        <Hyph />
        <Hyph />
        <Link aria-label='add new beer'
          to='/new-item'>
          <i className="fas fa-beer fa-2x"></i>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
    )
  }

  renderSingleLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
        <Hyph />
        <Hyph />
        <Hyph />
        <Link aria-label='add new beer'
          to='/new-item'>
          <i className="fas fa-beer fa-2x"></i>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link className='headerItem'
          to='/register'>
          Register
        </Link>
        <Hyph />
        <Link className='headerItem'
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  renderFilterLink() {
    return (
      <div className='filter'>
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
        <Hyph />
        <Hyph />
        <Link
          onClick={this.handleFilterClick}
          to='/'>
            <i className="fas fa-sort-amount-down-alt"></i>
            <Hyph />
            Sort
        </Link>
        <Hyph />
        <Hyph />
        <Hyph />
        <Link aria-label='add new beer'
          to='/new-item'>
          <i className="fas fa-beer fa-2x"></i>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div>
        <Filter></Filter>
      </div>
      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <h1>
          <Link to='/'>
            {' '}
            Beer Critic
          </Link>
        </h1>
        {(!TokenService.hasAuthToken())
          ? this.renderLoginLink()
          : (this.singleHeader())
            ? this.renderSingleLink()
              : (this.state.filter)
                ? this.renderFilterLink()
                : this.renderLogoutLink()
        }
      </nav>
    )
  }
}

export default withRouter(Header)