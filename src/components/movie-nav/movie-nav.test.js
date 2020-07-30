import React from "react";
import renderer from "react-test-renderer";
import {MovieNav} from "./movie-nav.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {MovieTabsMap, MovieTabs} from "../../const.js";

const mockStore = configureStore([]);

describe(`MovieNavTest`, () => {
  it(`render MovieNav`, () => {
    const store = mockStore({
      [NameSpace.APP_STATE]: {
        activeMovieTab: MovieTabsMap.OVERVIEW,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MovieNav
              activeTab={MovieTabsMap.OVERVIEW}
              tabs={MovieTabs}
              onTabItemClick={()=>{}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
