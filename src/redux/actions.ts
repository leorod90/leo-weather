export const SET_INDEX = 'SET_INDEX';
export const SET_CITY_NAME = 'SET_CITY_NAME';
export const SEARCH_COORDINATE = 'SEARCH_COORDINATE';

import axios from 'axios';
import image_style from '../data/image_style';
import formatDt from '../functions/formatDt';

const GOOGLE_API = 'AIzaSyCDSBWHgxAUVslf_TqwF2DS8ddY6i6WBSA';
const WEATHER_API = '781c956777135cd195e553d194591727';

const EXCLUDE = ['minutely', 'alerts'];

export const setIndex = (index: number) => (dispatch: any) => {
  dispatch({
    type: SET_INDEX,
    index,
  });
};

export const setCityName = (city: string) => async (dispatch: any) => {
  const location = await geolocation(city);
  const weather = await getWeather(location);
  const threeDay = await getThreeDay(weather);

  dispatch({
    type: SET_CITY_NAME,
    city,
    threeDay,
  });
};

export const searchCoordinate = (coordinates: any) => async (dispatch: any) => {
  const city = await reverseGeolocation();
  const weather = await getWeather(coordinates);
  const threeDay = await getThreeDay(weather);

  dispatch({
    type: SEARCH_COORDINATE,
    city,
    threeDay,
  });
};

const geolocation = async (city: string) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API}`,
    );
    const location = res.data.results[0].geometry.location;
    return location;
  } catch (err) {
    console.error(err);
  }
};

const reverseGeolocation = async () => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GOOGLE_API}`,
    );

    return res.data.results[0].address_components[5].long_name;
  } catch (err) {
    console.error(err);
  }
};

const getWeather = async ({lat, lng}: any) => {
  const oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=${EXCLUDE}&units=imperial&appid=${WEATHER_API}`;

  try {
    const resp = await axios.get(oneCall);
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

const getThreeDay = async (weather: any) => {
  let hourObj: any = {
    0: {
      hourArray: [],
    },
    1: {
      hourArray: [],
    },
    2: {
      hourArray: [],
    },
  };

  let n = 0;

  for (let i = 0; i < weather.hourly.length; i++) {
    const obj: any = {};
    let formatDate = formatDt(weather.hourly[i].dt);

    obj.temp = Math.round(weather.hourly[i].temp);
    obj.hours = formatDate;
    // obj.icon = image_style[weather.hourly[i].weather[0].icon].icon;
    obj.icon = weather.hourly[i].weather[0].icon;

    hourObj[n].hourArray.push(obj);

    if (formatDate == '11:00 PM') {
      n++;
    }
  }

  const current = {
    temp: weather.current.temp,
    color: image_style[weather.current.weather[0].icon].color,
    hourObj: hourObj[0],
    weather: [
      {
        main: weather.current.weather[0].main,
        description: weather.current.weather[0].description,
        icon: weather.current.weather[0].icon,
      },
    ],
  };

  const days = weather.daily.map((item: any, i: number) => {
    const color = image_style[item.weather[0].icon].color;
    return {
      temp: item.temp.day,
      color,
      hourObj: hourObj[i],
      weather: [
        {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        },
      ],
    };
  });
  const slicedArray = days.slice(1, 3);
  return [current, ...slicedArray];
};
