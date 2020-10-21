import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import './LoginPage.css'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <h3>Welcome to Beer Critic!</h3>
        <p className='intro'>This app is a way to keep track of all of the craft beers you've had, so you can find it at the store again, or make better conversation about beers with your friends.  Login above using your credentials or the credentials provided below, or sign up using the "Register" link in the top right corner.</p>
        <h4>Username: testUser</h4>
        <h4>Password: password</h4>
      </Section>
    )
  }
}