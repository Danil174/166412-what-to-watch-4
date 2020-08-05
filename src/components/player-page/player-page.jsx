import React from "react";
import PropTypes from "prop-types";
import history from "../../history.js";

import Preload from "../preload/preload.jsx";

const prettifyRemainingTime = (time) => {
  const hours = Math.round(time / 3600).toString();
  const min = Math.round((time % 3600) / 60).toString().padStart(2, `0`);
  const sec = (time % 60).toString().padStart(2, `0`);

  return (`${hours}:${min}:${sec}`);
};

const getRemainingTime = (duration, progress) => {
  return Math.round(duration - progress);
};

const getProgressPercent = (duration, progress) => {
  return duration === 0 ? 0 : (100 * progress / duration).toFixed(1);
};

const PlayerPage = (props) => {
  const {film, children, onFullScreenBtnClick, playPauseSetter, progress, isPlaying, duration} = props;

  if (!film) {
    return <Preload />;
  }

  const {title} = film;

  const remainingTime = getRemainingTime(duration, progress);
  const prettyTime = prettifyRemainingTime(remainingTime);
  const filmProgress = getProgressPercent(duration, progress);

  return (
    <div className="player">
      {children}

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          history.goBack();
        }}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration}></progress>
            <div
              className="player__toggler"
              style={{left: filmProgress + `%`}}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{prettyTime}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={playPauseSetter}
          >
            {
              isPlaying ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
                :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
            }
          </button>
          <div className="player__name">{title}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenBtnClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

PlayerPage.propTypes = {
  playPauseSetter: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  film: PropTypes.shape({
    title: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onFullScreenBtnClick: PropTypes.func.isRequired,
};


export default PlayerPage;
