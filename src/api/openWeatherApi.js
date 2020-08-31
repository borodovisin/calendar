import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { key } from '../../apiKey.json';

const getUrl = city => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

const getWeatherApi = async (city) => {
    try {
        if (isEmpty(city)) return '';
        const result = await fetch(getUrl(city));
        const response = await result.json();
        return get(response, 'weather[0].icon', '');
    } catch (ex) {
        return '';
    }
};

export default getWeatherApi;