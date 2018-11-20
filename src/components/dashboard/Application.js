import React from "react";

import DashShell from "../shared/DashShell";
import Card from "../shared/Card";

export default class Application extends React.Component {
  render() {
    return (
      <DashShell>
        <Card title="Application" />
      </DashShell>
    );
  }
}
