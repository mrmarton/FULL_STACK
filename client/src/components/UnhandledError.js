import React from 'react';
import { Link } from 'react-router-dom';

//This component is for status 500 rendering
const ErrorPage = () => {
  return (
    <div className='bounds'>
      <h1>Error</h1>
      <p>Sorry! Unhandled error.</p>
      <Link className='button button-secondary' to='/'>
        Return to List
      </Link>
    </div>
  );
};

export default ErrorPage;