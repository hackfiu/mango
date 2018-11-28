import React from 'react';
import config from '../../config';

const Card = props => {
  const CARD_HEADER = { color: config.EVENT_MAIN_COLOR || '#000' };

  return (
    <div className="card">
      <div className="content">
        {props.image && (
          <div className="img-container">
            <img src={props.image} alt="" />
          </div>
        )}
        {props.title && (
          <React.Fragment>
            <h1 style={CARD_HEADER}>{props.title}</h1>
            <hr />
          </React.Fragment>
        )}

        {props.children}
      </div>
    </div>
  );
};

export default Card;
