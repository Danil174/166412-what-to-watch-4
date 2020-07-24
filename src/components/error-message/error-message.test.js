import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message.jsx";
import {LoadErrorsTexts} from "../../const.js";

describe(`ErrorMessageTest`, () => {
  it(`render ErrorMessage`, () => {
    const tree = renderer
      .create(
          <ErrorMessage
            errorStatus={404}
            errorMessage={LoadErrorsTexts.LIST_FAIL}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
