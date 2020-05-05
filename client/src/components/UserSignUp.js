import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

//setting up state
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }
//change method handling capturing input for value
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
//dynamically captures form field and value
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
  
  submit = () => {
    const { context } = this.props;
    const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
    } = this.state;
//create user
    const user = {
        firstName,
        lastName,
        emailAddress,
        password
    };
//submit the form
    if (confirmPassword === password) {
//create new user
        context.data.createUser(user)
        .then(errors => {
            if (errors.length) {
                this.setState({ errors });
            } else {
                console.log(`${emailAddress} is succesfully signed up and authenticated!`);
//sign in
                context.actions.signIn(emailAddress, password);
                this.props.history.push('/');
            }
        })
        .catch(err => {
//handle error
            console.log('Something went wrong: ', err)
//redirect to error page
            this.props.history.push('/error');
        });        
    } else {
//throw a validation error if passwords not match
        this.setState({ 
            errors: 'Passwords do not match.' 
        });
    }
}
cancel = () => {
//redirecting to home page
    this.props.history.push('/');
}

  render() {
//setting up state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                  <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  className=''
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={this.change} />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

}