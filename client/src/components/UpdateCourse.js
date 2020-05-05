import React, { Component } from 'react';
import Form from './Form';

class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: []
  };

  componentDidMount() {
  //getting course data
    const { context } = this.props;
    context.data.getCourse(this.props.match.params.id)
      .then(singleCourse => {
        if (context.authenticatedUser.id !== singleCourse.userId) {
          console.log('userId of course', singleCourse.userId);
          this.props.history.push('/forbidden');
        }
        else if (singleCourse.userId === null) {
          this.props.history.push('/notfound');
        } else {
          this.setState({
            id: this.props.match.params.id,
            title: singleCourse.title,
            description: singleCourse.description,
            estimatedTime: singleCourse.estimatedTime,
            materialsNeeded: singleCourse.materialsNeeded,
            userId: singleCourse.userId,
            firstName: singleCourse.User.firstName,
            lastName: singleCourse.User.lastName,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/notfound');
      });
  }

//checking inputs and update state
  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

 //updating course state on submit
  submit = () => {
    const { context } = this.props;
    const signedId = context.authenticatedUser.id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      id
    } = this.state;
//updated course payload , grabs needed creds
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    if (userId !== signedId) {
      this.props.history.push(`/forbidden`);
    } else {
      context.data.updateCourse(id, emailAddress, password, course)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push(`/courses/${id}`);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }
  };

  //redirecting to the course detail page
  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  };
  
  render() {
    if (this.state) {
      const {
        errors,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        firstName,
        lastName
      } = this.state;

      return (
        <div>
          <div className='bounds course--detail'>
          <h1>Update course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Update Course'
            elements={() => (
              <React.Fragment>
                <div className='grid-66'>
                  <div className='course--header'>
                    <h4 className='course--label'>Course</h4>
                    <div>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className='input-title course--title--input'
                        placeholder='Title...'
                        value={title}
                        onChange={this.change}
                      />
                    </div>
                    <p>
                      By {firstName} {lastName}
                    </p>
                  </div>
                  <div className='course--description'>
                    <div>
                      <textarea
                        id='description'
                        name='description'
                        className=''
                        placeholder='Description...'
                        value={description}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className='grid-25 grid-right'>
                  <div className='course--stats'>
                    <ul className='course--stats--list'>
                      <li className='course--stats--list--item'>
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id='estimatedTime'
                            name='estimatedTime'
                            type='text'
                            className='course--time--input'
                            placeholder='Hours'
                            value={estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className='course--stats--list--item'>
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id='materialsNeeded'
                            name='materialsNeeded'
                            className=''
                            placeholder='List materials...'
                            value={materialsNeeded}
                            onChange={this.change}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default UpdateCourse; 