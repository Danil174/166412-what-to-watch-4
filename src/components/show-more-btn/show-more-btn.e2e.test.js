import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreBtn from "./show-more-btn.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

it(`ShowMoreBtn clicked`, () => {
  const onShowMoreBtnClick = jest.fn();

  const component = mount(
      <ShowMoreBtn
        onClick={onShowMoreBtnClick}
      />
  );

  const button = component.find(`.catalog__button`);

  button.simulate(`click`, mockEvent);
  expect(onShowMoreBtnClick).toHaveBeenCalledTimes(0);
});
