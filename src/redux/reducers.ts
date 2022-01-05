import {SET_CITY_NAME, SEARCH_COORDINATE, SET_INDEX} from './actions';

const initialState = {
  city: null,
  threeDay: [],
};

interface Props {
  type: string;
  city: string;
  threeDay: any;
}

export default (state = initialState, {type, city, threeDay}: Props) => {
  switch (type) {
    case SET_CITY_NAME:
      return {...state, city, threeDay};
    case SEARCH_COORDINATE:
      return {...state, city, threeDay};
    default:
      return state;
  }
};
