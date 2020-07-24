import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  const {errorStatus, errorMessage} = props;

  return (
    <div className="error">
      <p>{errorMessage}</p>
      <p>Обратитесь в техподдержку, код ошибки:&nbsp;
        <strong>{errorStatus}</strong>
      </p>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorStatus: PropTypes.number.isRequired,
};

export default ErrorMessage;
