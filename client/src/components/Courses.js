import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Courses extends Component {
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses().then(courses => {
      this.setState({
        courses
      });
    })
    .catch(err => {
      console.log('Ops try again, please: ', err);
      this.props.history.push('/error');
  });
  }
    render() {
      return (
        <div className='bounds'>
          {this.state === null ? (
            <h1>Loading...</h1>
          ) : (
            this.state.courses.map(course => {
              return (
                <div className='grid-33' key={course.id}>
                  <a
                    className='course--module course--link'
                    href={'/courses/' + course.id}
                  >
                    <h4 className='course--label'>Course</h4>
                    <h3 className='course--title'>{course.title}</h3>
                  </a>
                </div>
              );
            })
          )}
  
          <div className="grid-33">
            <Link 
              className="course--module course--link"   
              to={"/courses/create"}>
              <h4 className="course--label">Courses</h4>
              <h3 className="course--add--title">
                <svg  
                  version="1.1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  x="0px" 
                  y="0px" 
                  viewBox="0 0 13 13" 
                  className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      );
    }
  }

export default Courses;