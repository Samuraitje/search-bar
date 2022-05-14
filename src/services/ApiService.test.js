import React from 'react';
import ReactDOM from "react-dom";
import {render, cleanup} from '@testing-library/react';
import axiosMock from 'axios';
import ApiService from './ApiService';

afterEach(cleanup);
test("ApiService renders without crashing", () => {
   const div = document.createElement('div');
   ReactDOM.render(<ApiService />, div);
   ReactDOM.unmountComponentAtNode(div);
 });

test("when the ApiService component is rendered, the API should have been called 1 time", async() => {
   render(<ApiService />);
   expect(axiosMock.get).toHaveBeenCalledTimes(1);
})
