import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.style.css";
import ROUTES from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext";
import PrimaryButton from "../PrimaryButton";

const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className="header">
      <div className="topbar">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className="row">
        <div className="routes">
          <NavLink to={ROUTES.DASHBOARD} className={({ isActive }) => (isActive ? "route active" : "route")}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.TASK_LIST} className={({ isActive }) => (isActive ? "route active" : "route")}>
            Task list
          </NavLink>
        </div>
        {isAuthenticated && <PrimaryButton label="Sign out" onClick={logout} />}
      </div>
    </div>
  );
};

export default React.memo(Header);
