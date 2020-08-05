import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";
import PromoSection from "./promo-section.jsx";

const mockStore = configureStore([]);

const film = {
  genre: `Crime`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  releaseDate: 2002,
  title: `Gangs of new york`,
};

describe(`PromoSectionTest`, () => {
  it(`render PromoSection`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {avatarUrl: `test.jpg`},
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <PromoSection
              film={film}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
