import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className='bounds'>
      <h1>Forbidden</h1>
      <p>Sorry! You can not access this page.</p>
      <Link className='button button-secondary' to='/'>
        Return to List
      </Link>
    </div>
  );
};

export default Forbidden;