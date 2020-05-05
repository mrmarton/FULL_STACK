import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './css/index.css';
//importing components
import Header from "./components/Header";

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import Authenticated from './components/Authenticated';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
//importing user auth
import withContext from "./Context";
import PrivateRoute from './PrivateRoute';
//user sign up with context api
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const AuthWithContext = withContext(Authenticated);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {

  render() {
    return(
      <Router>
        <div>
          <HeaderWithContext />

          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <PrivateRoute 
              exact 
              path="/courses/create" 
              component={CreateCourseWithContext} 
            />
            <PrivateRoute 
              exact 
              path="/courses/:id/update" 
              component={UpdateCourseWithContext}
            />
            <Route
              exact
              path='/courses/:id'
              render={props => (
                <CourseDetailWithContext
                  {...props}
                  courseId={props.match.params.id}
                />
              )}
            />
            <PrivateRoute 
              path="/authenticated" 
              component={AuthWithContext}
            />
            <Route
              exact 
              path="/signin" 
              component={UserSignInWithContext}
            />
            <Route 
              exact 
              path="/signout" 
              component={UserSignOutWithContext}
            />
            <Route
              exact 
              path="/signup" 
              component={UserSignUpWithContext}
            />
            <Route path='/notfound' component={NotFound} />
            <Route path='/forbidden' component={Forbidden} />
            <Route path='/error' component={UnhandledError} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;