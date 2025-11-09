import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const link = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');
  const bar = {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #ddd',
  };

  return (
    <nav style={bar}>
      <NavLink to="/home" className={link}>
        Home
      </NavLink>
      <NavLink to="/list" className={link}>
        List
      </NavLink>
      <NavLink to="/population" className={link}>
        Population
      </NavLink>
      <NavLink to="/custom-route" className={link}>
        Custom
      </NavLink>
    </nav>
  );
}
