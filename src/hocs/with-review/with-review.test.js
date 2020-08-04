import React from "react";
import renderer from "react-test-renderer";
import withReview from "./with-review.js";
import PropTypes from "prop-types";

const MockComponent = (props) => {
  const {children} = props;
  return (
    <>
        {children}
    </>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withReview(MockComponent);

it(`withReview is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      changeRating={()=>{}}
      changeComment={()=>{}}
      rating={3}
      comment={`comment test test`}
      blocked={false}
      onBtnClick={()=>{}}
      onOkBtnClick={()=>{}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
