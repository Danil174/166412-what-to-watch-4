import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`AppTest`, () => {
  it(`render App`, () => {
    const tree = renderer
      .create(
          <App
            loading={true}
            loadFilms={()=>{}}
            loadPromo={()=>{}}
            checkAuthStatus={()=>{}}
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
