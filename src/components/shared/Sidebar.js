import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import config from '../../config';

const LOGO_NAME = config.EVENT_LOGO;
const LOGO_PATH = require(`../../assets/images/${LOGO_NAME}`);
const ACTIVE_TAB = {
  background: config.EVENT_MAIN_COLOR,
  color: '#FFF',
  borderRadius: '10px'
};
const INACTIVE_TAB = {
  color: config.EVENT_MAIN_COLOR
};

const tabs = [
  {
    title: 'Home',
    icon: 'fa-home',
    redirect: '/dashboard',
    active: true
  },
  {
    title: 'Application',
    icon: 'fa-file-alt',
    redirect: '/application',
    active: false
  },
  {
    title: 'Settings',
    icon: 'fa-cog',
    redirect: '/settings',
    active: false
  }
];

const Sidebar = props => (
  <nav className="sidebar">
    <img className="logo" src={LOGO_PATH} alt="logo" />

    <hr />

    <ul className="nav flex-column">
      {tabs.map((tab, i) => (
        <Link to={tab.redirect} key={i}>
          <NavItem
            className="nav-item"
            style={tab.active ? ACTIVE_TAB : INACTIVE_TAB}
          >
            <i className={`fas ${tab.icon} fa-lg`} aria-hidden="true" />
            {tab.title}
          </NavItem>
        </Link>
      ))}
    </ul>
  </nav>
);
export default Sidebar;
