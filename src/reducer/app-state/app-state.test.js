import {reducer, ActionType, ActionCreator} from "./app-state.js";
import {DEFAULT_GENRE} from "../../const.js";

const genres = [`All genres`, `Crime`, `Adventure`, `Action`, `Comedy`];

const fakeFilms = [{
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  bgColor: `#A6B7AC`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  director: `Martin Scorsese`,
  duration: 167,
  genre: `Crime`,
  id: 1,
  isFavorite: false,
  movieScore: 8.8,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 370881,
  releaseDate: 2002,
  source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  title: `Gangs of new york`,
}, {
  actors: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
  bgColor: `#D8E3E5`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/bacskground/Moonrise_Kingdom.jpg`,
  director: `Wes Anderson`,
  duration: 94,
  genre: `Adventure`,
  id: 2,
  isFavorite: false,
  movieScore: 7.9,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 291183,
  releaseDate: 2012,
  source: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  synopsis: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  title: `Moonrise Kingdom`,
}
];

describe(`app-state reducer test`, () => {
  it(`Reducer without additional parameters should return initial stat`, () => {
    expect(reducer(void 0, {})).toEqual({
      selectedFilmID: null,
      activeGenre: DEFAULT_GENRE,
    });
  });

  it(`Reducer should change genre filter`, () => {
    expect(reducer({
      selectedFilmID: null,
      activeGenre: DEFAULT_GENRE,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Dramas`,
    })).toEqual({
      selectedFilmID: null,
      activeGenre: `Dramas`,
    });

    expect(reducer({
      selectedFilmID: null,
      activeGenre: `Dramas`,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Kids & Family`,
    })).toEqual({
      selectedFilmID: null,
      activeGenre: `Kids & Family`,
    });
  });

  it(`Reducer should return get selected film id`, () => {
    expect(reducer({
      selectedFilmID: null,
      activeGenre: DEFAULT_GENRE,
    }, {
      type: ActionType.GET_SELECT_FILM_ID,
      payload: 1,
    })).toEqual({
      selectedFilmID: fakeFilms[0].id,
      activeGenre: DEFAULT_GENRE,
    });

    expect(reducer({
      selectedFilmID: 1,
      activeGenre: DEFAULT_GENRE,
    }, {
      type: ActionType.GET_SELECT_FILM_ID,
      payload: 2,
    })).toEqual({
      selectedFilmID: fakeFilms[1].id,
      activeGenre: DEFAULT_GENRE,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changeFilter`, () => {
    expect(ActionCreator.changeFilter(`Documentary`)).toEqual({
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Documentary`,
    });
  });

  it(`Action creator for getSelectedFilmID returns id`, () => {
    expect(ActionCreator.getSelectedFilm(5)).toEqual({
      type: ActionType.GET_SELECT_FILM_ID,
      payload: 5,
    });
  });
});
