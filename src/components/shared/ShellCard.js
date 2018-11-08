import React from "react";

import config from "../../config";

const ShellCard = props => {
  const LOGO_NAME = config.EVENT_LOGO;
  const LOGO_PATH = require(`../../assets/images/${LOGO_NAME}`);

  return (
    <div className="login-container">
      <div className="login-img-container">
        <img src={LOGO_PATH} />
      </div>
      {props.children}
    </div>
  );
};

export default ShellCard;
