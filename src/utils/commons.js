import range from 'lodash/range';

const setHourByMeridian = () => {
    const hourList = [];

    range(0, 24).forEach(value => {
        const hour = value < 10 ? `0${value}` : value;

        hourList.push({ value: `${hour}:00`, label: `${hour}:00` });
        hourList.push({ value: `${hour}:15`, label: `${hour}:15` });
        hourList.push({ value: `${hour}:30`, label: `${hour}:30` });
        hourList.push({ value: `${hour}:45`, label: `${hour}:45` });
    });
    return hourList;
};

export const getHours = () => setHourByMeridian();

export const bodyClick = () => {
    document.body.click();
};