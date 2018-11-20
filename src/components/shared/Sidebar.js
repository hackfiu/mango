import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import config from "../../config";

const LOGO_NAME = config.EVENT_LOGO;
const LOGO_PATH = require(`../../assets/images/${LOGO_NAME}`);
const ACTIVE_TAB = {
  background: config.EVENT_MAIN_COLOR
};
const INACTIVE_TAB = {
  color: config.EVENT_MAIN_COLOR
};

const tabs = [
  {
    title: "Home",
    icon: "fa-home",
    redirect: "/dashboard",
    active: false
  },
  {
    title: "Application",
    icon: "fa-file-alt",
    redirect: "/application",
    active: false
  },
  {
    title: "Settings",
    icon: "fa-cog",
    redirect: "/settings",
    active: false
  }
];

const Sidebar = props => {
  const { pathname } = props.location;

  tabs.map(tab => (tab.active = tab.redirect === pathname));

  const logout = () => {
    localStorage.removeItem("JWT");
    props.history.push("/");
  };

  return (
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
        <button className="logout" onClick={() => logout()}>
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Sidebar;
