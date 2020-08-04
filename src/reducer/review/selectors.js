import NameSpace from "../name-space.js";


export const getPending = (state) => {
  return state[NameSpace.REVIEW].pending;
};

export const getError = (state) => {
  return state[NameSpace.REVIEW].error;
};
