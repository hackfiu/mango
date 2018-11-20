import React from "react";
import config from "../../config";

const DashShell = props => {
  const useCover = config.USE_COVER;
  const dashCover = config.LOGIN_COVER;

  const hasOverlay = config.USE_OVERLAY;
  const DASH_OVERLAY = hasOverlay
    ? { background: config.LOGIN_OVERLAY_COLOR }
    : null;

  const coverImage = require(`../../assets/images/${dashCover}`);
  const DASH_STYLE = useCover
    ? { backgroundImage: `url(${coverImage})` }
    : null;

  return (
    <div className="dash">
      <div className="cover" style={DASH_STYLE}>
        <div className="overlay" style={DASH_OVERLAY} />
      </div>
      {props.children}
    </div>
  );
};

export default DashShell;
