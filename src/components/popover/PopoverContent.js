/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { inject, observer } from 'mobx-react';
import { SliderPicker } from 'react-color';

import getWeatherApi from '../../api/openWeatherApi';
import getIcon from '../../utils/icons';
import { getHours, bodyClick } from '../../utils/commons';
import { StyledSpinner } from '../../utils/styledComponent';
import { defaultColor } from '../../utils/constants';

const PopoverContent = props => {
    const selectOptions = getHours();
    const [name, setName] = useState(props.store.selectedReminder.name || '');
    const [startTime, setStartTime] = useState(props.store
        .selectedReminder.startTime || '');
    const [endTime, setEndTime] = useState(props.store
        .selectedReminder.endTime || '');
    const [city, setCity] = useState(props.store.selectedReminder.city || '');
    const [icon, setIcon] = useState(props.store.selectedReminder.icon || '');
    const [color, setColor] = useState(props.store.selectedReminder.color ||
        defaultColor);
    const [spinner, setSpinner] = useState(null);

    const findCityWeather = debounce(event => {
        getWeatherApi(event.target.value).then(icon => {
            setIcon(getIcon(icon));
            setSpinner(null);
        });
    }, 1000);

    const handleCityChange = event => {
        event.persist();
        setCity(event.target.value);
        setSpinner(<StyledSpinner animation="grow" size="sm"
            variant="secondary" />);
        findCityWeather(event);
    };

    const handleStartTimeChange = ({ value }) => {
        setStartTime(selectOptions.find(item => item.value  === value));
        setEndTime(null);
    };

    const handleEndTimeChange = ({ value }) => {
        setEndTime(selectOptions.find(item => item.value  === value));
    };

    const getEndTimeOptions = () => {
        const index = selectOptions
            .findIndex(item => item.value === startTime.value);

        return selectOptions.filter((_, idx) => idx > index);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() && !isEmpty(startTime) &&
            !isEmpty(endTime) && !isEmpty(icon)) {
            props.store.setReminder(props.dayKey,
                { name, startTime, endTime, city, icon, color });
            bodyClick();
        }
    };
    const handleRemove = () => {
        if (!isEmpty(props.store.selectedKey)) {
            props.store.removeReminder(props.store.selectedKey);
            bodyClick();
        }
    };

    return (    
        <Form noValidate validated={true} onSubmit={handleSubmit}>
            <Form.Group controlId="reminder">
                <Form.Control
                    type="text"
                    placeholder="Reminder description"
                    maxLength="30"
                    required
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                />
                <Form.Control.Feedback type="invalid">
                    Empty reminder name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="startTime">
                <Row>   
                    <Col lg={6}>
                        <Select
                            options={selectOptions}
                            placeholder="Start"
                            value={startTime}
                            required
                            onChange={handleStartTimeChange}
                        />
                        <Form.Control.Feedback type="invalid"
                            style={{ display: isEmpty(startTime) ? 'block' : 'none' }}>
                            Empty start time
                        </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                        <Select
                            options={getEndTimeOptions()}
                            placeholder="End"
                            value={endTime}
                            isDisabled={isEmpty(startTime)}
                            required
                            onChange={handleEndTimeChange}
                        />
                        <Form.Control.Feedback type="invalid"
                            style={{ display: isEmpty(endTime) ? 'block' : 'none' }}>
                            Empty end time
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group controlId="city">
                <Row>
                    <Col lg={10}>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            maxLength="30"
                            required
                            value={city}
                            isInvalid={isEmpty(icon)}
                            onChange={handleCityChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid city
                        </Form.Control.Feedback>
                    </Col>
                    <Col lg={2}>
                        {icon ?
                            <img className="weather-icon" src={icon} /> :
                                spinner
                        }
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <div className="color-picker">
                    <SliderPicker
                        color={color}
                        onChange={value => setColor(value)}
                    />
                </div>
            </Form.Group>
            <Form.Group style={{ height: '20px' }}>
                <Button className="float-right" type="submit">
                        <i className="fa fa-save"></i>
                </Button>
                <Button className="float-right"
                    variant="danger"
                    style={{ marginRight: '5px' }}
                    onClick={handleRemove}
                    >
                    <i className="fa fa-trash"></i>
                </Button>
        </Form.Group>
        </Form>
    );
};

PopoverContent.propTypes = {
    dayKey: PropTypes.string.isRequired,
    store: PropTypes.object
};

export default inject('store')(observer(PopoverContent));