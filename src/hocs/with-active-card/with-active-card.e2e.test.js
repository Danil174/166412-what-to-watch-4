import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveCard from "./with-active-card.js";

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveCard(MockComponent);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Small Movie card hovered`, () => {
  const card = shallow(
      <MockComponentWrapped
        id={1}
        isPlaying={false}
        onCardMouseEnter={() => {}}
        onCardMouseLeave={() => {}}
      />
  );

  card.simulate(`mouseOver`);
  expect(card.props().isPlaying).toEqual(true);

  card.simulate(`mouseOut`);
  expect(card.props().isPlaying).toEqual(false);
});
