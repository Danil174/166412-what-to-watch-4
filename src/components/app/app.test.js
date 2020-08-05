import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

describe(`AppTest`, () => {
  it(`render App`, () => {
    const store = mockStore({
      [NameSpace.FILMS]: {
        loading: true,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              loading={true}
              loadFilms={()=>{}}
              loadPromo={()=>{}}
              checkAuthStatus={()=>{}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
