import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import UserList from "./user-list.jsx";

describe(`UserListTest`, () => {
  it(`render UserList`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <UserList />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
