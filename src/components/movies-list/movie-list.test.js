import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const testFilmsList = [
  {
    id: 11,
    title: `Orlando`,
    src: `img/orlando.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 12,
    title: `Pulp Fiction`,
    src: `img/pulp-fiction.jpg`,
    source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 13,
    title: `Revenant`,
    src: `img/revenant.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 14,
    title: `Seven Years in Tibet`,
    src: `img/seven-years-in-tibet.jpg`,
    source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
];

describe(`MoviesListTest`, () => {
  it(`render MoviesList`, () => {
    const tree = renderer
      .create(
          <MoviesList
            filmsList = {testFilmsList}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onTitleOrImgClickHandler={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
