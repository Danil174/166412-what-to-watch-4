const configureFilm = (data) => {
  return ({
    id: data.id,
    title: data.name,
    preview: data.preview_image,
    poster: data.poster_image,
    cover: data.background_image,
    bgColor: data.background_color,
    source: data.video_link,
    previewVideoLink: data.preview_video_link,
    synopsis: data.description,
    movieScore: data.rating,
    ratingCount: data.scores_count,
    director: data.director,
    actors: data.starring,
    duration: data.run_time,
    genre: data.genre,
    releaseDate: data.released,
    isFavorite: data.is_favorite
  });
};

export default configureFilm;
