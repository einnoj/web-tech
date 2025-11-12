import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className='bg-dark text-light justify-content-center align-items-center text-center vh-100 m-0 p-0'>
      <h1 className='display-1 fw-bold mb-3 mt-0'>Welcome to my website</h1>
      <p className='fs-2'>This app uses React Router and it is composed of several links</p>
    </section>
  );
}
 