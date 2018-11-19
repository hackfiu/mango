import React from 'react';
import Card from './shared/Card';
import config from '../config';

export default class Dashboard extends React.Component {
  render() {
    const useCover = config.USE_COVER;
    const dashCover = config.LOGIN_COVER;

    const coverImage = require(`../assets/images/${dashCover}`);
    const DASH_STYLE = useCover
      ? { backgroundImage: `url(${coverImage})` }
      : null;

    const hasOverlay = config.USE_OVERLAY;
    const DASH_OVERLAY = hasOverlay
      ? { background: config.LOGIN_OVERLAY_COLOR }
      : null;

    return (
      <div className="dash-container">
        <div className="dash-cover-container" style={DASH_STYLE}>
          <div className="dash-cover-overlay" style={DASH_OVERLAY} />
        </div>
        <Card>
          <h1> Hey there hacker you a bitch! </h1>
          <hr />
          <h3> Status: </h3>
          <h3 class="status">In progress</h3>
          <p>chart</p>
          <small>please finish up your application</small>
        </Card>
      </div>
    );
  }
}
