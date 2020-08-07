import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import PropTypes, { string } from "prop-types";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

import Preload from "../preload/preload.jsx";
import Main from "../main/main.connect.js";
import MoviePage from "../movie-page/movie-page.connect.js";
import PrivateRoute from "../private-route/private-route.connect.js";
import NotFound from "../not-found/not-found.jsx";
import SignIn from "../sign-in/sign-in.connect.js";
import MyList from "../my-list/my-list.connect.js";
import AddReview from "../add-review/add-review.connect.js";
import PlayerPage from "../player-page/player-page.connect.js";

import withReview from "../../hocs/with-review/with-review.js";
import withPlayer from "../../hocs/with-player/with-player.js";

class App extends PureComponent {
  render() {
    const PlayerPageWrapped = withPlayer(PlayerPage);
    const AddReviewWrapped = withReview(AddReview);
    console.log(this.props.films);
    if (this.props.loading) {
      return <Preload />;
    }
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main />
          </Route>
          <Route exact path={`${AppRoute.MOVIE_PAGE}/:id?`} component={MoviePage} />
          <Route exact path={`${AppRoute.PLAYER_PAGE}/:id?`} render={(props) => {
            return <PlayerPageWrapped films={this.props.films} {...props} />;
          }}/>
          <PrivateRoute exact path={`${AppRoute.REVIEW}/:id?`} render={(props) => {
            return <AddReviewWrapped {...props} />;
          }}/>
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => {
              return (
                <MyList />
              );
            }}
          />
          <Route exact path={AppRoute.LOGIN}>
            <SignIn />
          </Route>
          <Route exact path={AppRoute.NOT_FOUND}>
            <NotFound />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        actors: PropTypes.arrayOf(PropTypes.string).isRequired,
        bgColor: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        genre: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        movieScore: PropTypes.number.isRequired,
        poster: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        releaseDate: PropTypes.number.isRequired,
        source: PropTypes.string.isRequired,
        synopsis: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default App;
