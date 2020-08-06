import React from "react";
import renderer from "react-test-renderer";
import MovieNav from "./movie-nav.jsx";

import {Provider} from "react-redux";
import {MovieTabsMap, MovieTabs} from "../../const.js";


describe(`MovieNavTest`, () => {
  it(`render MovieNav`, () => {
    const tree = renderer
      .create(
          <MovieNav
            activeTab={MovieTabsMap.OVERVIEW}
            tabs={MovieTabs}
            onTabItemClick={()=>{}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
