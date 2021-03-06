import React from "react";
import config from "../../config";

const Shell = props => {
  const useCover = config.USE_COVER;
  const loginCover = config.LOGIN_COVER;

  const coverImage = require(`../../assets/images/${loginCover}`);
  const LOGIN_STYLE = useCover
    ? { backgroundImage: `url(${coverImage})` }
    : null;

  const hasOverlay = config.USE_OVERLAY;
  const LOGIN_OVERLAY = hasOverlay
    ? { background: config.LOGIN_OVERLAY_COLOR }
    : null;

  return (
    <div className="access" style={LOGIN_STYLE}>
      <div className="access-overlay" style={LOGIN_OVERLAY}>
        {props.children}
      </div>
    </div>
  );
};

export default Shell;
