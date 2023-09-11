import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className="py-12">
      <div className='container flex flex-col justify-center items-center gap-4'>
        <h1 className='text-4xl font-bold'>Error 404</h1>
        <p>Oops, Page is not found</p>
        <Link to="/" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>Return to home</Link>
      </div>
    </section>
  )
}

export default PageNotFound;