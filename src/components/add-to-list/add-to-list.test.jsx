import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";

import {AddToList} from "./add-to-list.jsx";

const mockStore = configureStore([]);

describe(`AddToList`, () => {
  it(`render AddToList`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <AddToList
              authorizationStatus={`AUTH`}
              id={1}
              isFavorite={true}
              onMyListBtnClick={()=>{}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
