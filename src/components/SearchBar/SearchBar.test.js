import React from 'react';
import ReactDom from "react-dom";
import SearchBar from './SearchBar';
import {render, screen, cleanup, getByTestId, getByText} from '@testing-library/react';
import mockdata from '../../__mocks__/data_mock.json'
import userEvent from '@testing-library/user-event';

beforeEach(() => {
   render(<SearchBar data={mockdata}/>)
})

afterEach(cleanup);

test("SearchBar renders without crashing", () => {
   const div = document.createElement('div');
   ReactDom.render(<SearchBar />, div);
   ReactDom.unmountComponentAtNode(div);
});

test("when rendering the inital html elements, they should be visible to the user", () => {
   expect(getByTestId(document.documentElement, "form")).toBeInTheDocument();
   expect(getByTestId(document.documentElement, "input")).toBeInTheDocument();
   expect(getByTestId(document.documentElement, "searchButton")).toBeInTheDocument();
})

test("when the input element with the type submit is rendered, it should be hidden", () => {
   expect(getByTestId(document.documentElement, "input-submit")).not.toBeVisible();
})

test("when the search input element is rendered, it should have the placeholder text 'Zoeken'", () => {
   expect(getByTestId(document.documentElement, "input")).toHaveAttribute("placeholder", "Zoeken");
})

test("when the search input field is empty, the search button should be disabled", () => {
   expect(getByTestId(document.documentElement, "searchButton")).toBeDisabled();
})

test("when the search input field is not empty, the search button should be enabled", () => {   
   userEvent.type(getByTestId(document.documentElement, "input"), "test");

   expect(getByTestId(document.documentElement, "searchButton")).toBeEnabled();
})

test("when inserting the search input, only alphabetic characters and spaces can be entered", () => {
   userEvent.type(getByTestId(document.documentElement, "input"), "az AZ*!<:");

   expect(getByTestId(document.documentElement, "input")).toHaveValue("az AZ");
})

test("when inserting 2 or more valid characters in the search query, items suggestions should appear", () => {
   userEvent.type(getByTestId(document.documentElement, "input"), "tr");

   expect(getByTestId(document.documentElement, "searchResult")).toBeInTheDocument();
   expect(getByText(document.documentElement, "heren truien")).toBeInTheDocument();
   expect(getByText(document.documentElement, "kenzo trui")).toBeInTheDocument();
})

test("when inserting 1 or less charaters or more in the search query, search result should be empty", () => {
   userEvent.type(getByTestId(document.documentElement, "input"), "t");
   const searchResultElement = screen.queryByText("kenzo trui");
   
   expect(searchResultElement).not.toBeInTheDocument();
})

test("when inserting at least 1 valid character, the clear input field button should appear", () => {
   userEvent.type(getByTestId(document.documentElement, "input"), "a");

   expect(getByTestId(document.documentElement, "cancelButton")).toBeInTheDocument();
})

test("when the search input field is empty, the clear input field button should be hidden", () => {
   const cancelButtonElement = screen.queryByAltText("cancel-icon");
   
   expect(cancelButtonElement).not.toBeInTheDocument();
})

