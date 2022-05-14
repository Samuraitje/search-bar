import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {cleanup} from '@testing-library/react';

afterEach(cleanup);
test("App renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});