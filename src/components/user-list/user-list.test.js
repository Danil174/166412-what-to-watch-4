import React from "react";
import renderer from "react-test-renderer";
import UserList from "./user-list.jsx";

describe(`UserListTest`, () => {
  it(`render UserList`, () => {
    const tree = renderer
      .create(
          <UserList />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
