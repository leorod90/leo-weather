import {SET_INDEX} from './actions';

const initialState = {
  index: 0,
};

interface Props {
  type: string;
  index: number;
}

export default (state = initialState, {type, index}: Props) => {
  switch (type) {
    case SET_INDEX:
      return {...state, index};
    default:
      return state;
  }
};
