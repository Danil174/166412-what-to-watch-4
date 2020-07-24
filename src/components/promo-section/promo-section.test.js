import React from "react";
import renderer from "react-test-renderer";
import PromoSection from "./promo-section.jsx";

const film = {
  genre: `Crime`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  releaseDate: 2002,
  title: `Gangs of new york`,
};

describe(`PromoSectionTest`, () => {
  it(`render PromoSection`, () => {
    const tree = renderer
      .create(
          <PromoSection
            film={film}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
