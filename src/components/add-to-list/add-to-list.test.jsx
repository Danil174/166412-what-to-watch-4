import React from "react";
import renderer from "react-test-renderer";

import AddToList from "./add-to-list.jsx";

describe(`AddToList`, () => {
  it(`render AddToList`, () => {
    const tree = renderer
      .create(
          <AddToList
            authorizationStatus={`AUTH`}
            id={1}
            isFavorite={true}
            onMyListBtnClick={()=>{}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
