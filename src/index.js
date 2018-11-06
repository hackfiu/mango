import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./public/js/serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
