import React from 'react';

const Card = props => {
  return (
    <div className="card-container">
      <div className="card-content-container">
        <div className="card-content"> {props.children} </div>
      </div>
    </div>
  );
};

export default Card;
