import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {getLoadingStatus} from "../../reducer/films/selectors.js";
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {Operation as DataFilms} from '../../reducer/films/films.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import PropTypes from "prop-types";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

import Preload from "../preload/preload.jsx";
import Main from "../main/main.connect.js";
import MoviePage from "../movie-page/movie-page.connect.js";
import PrivateRoute from "../private-route/private-route.jsx";
import NotFound from "../not-found/not-found.jsx";
import SignIn from "../sign-in/sign-in.connect.js";
import UserList from "../user-list/user-list.jsx";
import AddReview from "../add-review/add-review.connect.js";
import PlayerPage from "../player-page/player-page.connect.js";

import withPlayer from "../../hocs/with-player/with-player.js";

class App extends PureComponent {
  render() {
    const PlayerPageWrapped = withPlayer(PlayerPage);
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
          <Route exact path={`${AppRoute.PLAYER_PAGE}/:id?`} component={PlayerPageWrapped} />
          <PrivateRoute exact path={`${AppRoute.REVIEW}/:id?`} render={(props) => {
            return <AddReview {...props} />;
          }}/>
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => {
              return (
                <UserList />
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
  loadFilms: PropTypes.func.isRequired,
  loadPromo: PropTypes.func.isRequired,
  checkAuthStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFilms() {
    dispatch(DataFilms.loadFilms());
  },
  loadPromo() {
    dispatch(DataOperation.loadPromo());
  },
  checkAuthStatus() {
    dispatch(UserOperation.checkAuth());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
