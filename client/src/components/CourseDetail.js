import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  componentDidMount() {
    const { context, courseId } = this.props;
    context.data.getCourse(courseId)
      .then(singleCourse => {
        //redirected to notfound page
        if (singleCourse.title === '') {
          this.props.history.push('/notfound');
        }
        if (context.authenticatedUser !== null) {
          this.setState({
            singleCourse,
            authenticatedUserId: context.authenticatedUser.id
          });
        } else if (context.authenticatedUser === null) {
          this.setState({
            singleCourse
          });
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  //course delete by course owner
  handleDelete = () => {
    const { context, courseId } = this.props;
    const { authenticatedUser } = context;
    const courseOwnerId = this.state.singleCourse.User.id;
    const signedInUserId = authenticatedUser.id;
    const signedInUserEmailAddress = authenticatedUser.emailAddress;
    const signedInUserPassword = authenticatedUser.password;
    
  //course owner can delete the course
    if (courseOwnerId === signedInUserId) {
      context.data.deleteCourse(courseId, signedInUserEmailAddress, signedInUserPassword)
        .then(errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/notfound');
        });
    }
  };

  render() {
    if (this.state) {
      const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
      } = this.state.singleCourse;

      const { authenticatedUserId } = this.state;
      const { firstName, lastName } = this.state.singleCourse.User;
      return (
        <div>
          <div>
            <div className='actions--bar'>
              <div className='bounds'>
                <div className='grid-100'>
                  {/* Delete and update buttons only display for authenticated user */}
                  {userId === authenticatedUserId ? (
                    <span>
                      <Link className='button' to={`/courses/${id}/update`}>
                        Update Course
                      </Link>
                      <a
                        className='button'
                        onClick={() => {
                          this.handleDelete();
                        }}
                        href='/'
                      >
                        {' '}
                        Delete Course
                      </a>
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <Link className='button button-secondary' to='/'>
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='bounds course--detail'>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <h3 className='course--title'>{title}</h3>
                <p>
                  By {firstName} {lastName}
                </p>
              </div>

              <div className='course--description'>
                <ReactMarkdown source={description} />
              </div>
            </div>

            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='course--stats--list'>
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                  </li>

                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <ReactMarkdown source={materialsNeeded} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

}

export default CourseDetail;
