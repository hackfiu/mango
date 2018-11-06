import React from "react";
import config from "../../config";

export default function Shell(props) {
  const useCover = config.USE_COVER;
  const loginCover = config.LOGIN_COVER;

  const coverImage = require(`../../assets/images/${loginCover}`);
  const LOGIN_STYLE = useCover
    ? { backgroundImage: `url(${coverImage})` }
    : null;

  const hasOverlay = config.USE_OVERLAY;
  const LOGIN_OVERLAY = hasOverlay
    ? {
        background: config.LOGIN_OVERLAY_COLOR
      }
    : null;

  return (
    <div className="login" style={LOGIN_STYLE}>
      <div className="login-overlay" style={LOGIN_OVERLAY}>
        {props.children}
      </div>
    </div>
  );
}
