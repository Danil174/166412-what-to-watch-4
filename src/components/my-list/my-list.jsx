import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Preload from "../preload/preload.jsx";
import Header from "../header/header.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Footer from "../footer/footer.jsx";

class MyList extends PureComponent {
  componentDidMount() {
    this.props.fetchMyList();
  }

  render() {
    const {loadStatus, myFilms, error} = this.props;

    if (loadStatus) {
      return <Preload />;
    }

    return (
      <div className="user-page">
        <Header userPage={true} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MoviesList
            loadFilmsError={error}
            filmsList={myFilms}
          />
        </section>

        <Footer />
      </div>
    );
  }
}

MyList.propTypes = {
  loadStatus: PropTypes.bool.isRequired,
  myFilms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.number
};

export default MyList;
