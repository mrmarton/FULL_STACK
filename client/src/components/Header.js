import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  console.log(props);
  const authUser = props.context.authenticatedUser;
    return (
      <div>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;400&display=swap" rel="stylesheet" type="text/css"/>
          <title>Courses</title>
      <div className="header">
        <div className="bounds">
          <Link to='/'>
            <h1 className="header--logo">Courses</h1>
          </Link>
          <nav>
            {authUser === null ? (
              <React.Fragment>

                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>Welcome, {`${authUser.firstName}  ${authUser.lastName}`} (*_*)</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
      </div>
    );
  }

export default Header;