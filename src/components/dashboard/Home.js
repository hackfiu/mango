import React from "react";

import DashShell from "../shared/DashShell";
import Card from "../shared/Card";

export default class Home extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <DashShell>
        <Card title="Hey there, hacker">
          <h3> Status: </h3>

          <button
            type="submit"
            className="status"
            onClick={() => history.push("/application")}
          >
            In progress
          </button>
        </Card>
      </DashShell>
    );
  }
}
