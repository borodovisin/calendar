/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { inject } from 'mobx-react';
import { nanoid } from 'nanoid';
import get from 'lodash/get';

const Reminder = props => {
    const handleReminderClick = event => {
        const  selectedKey = get(event, 'target.dataset.reminder');
        const currentReminder = get(props, `store.reminder[${selectedKey}]`);
        
       props.store.setSelectedReminder(currentReminder);
       props.store.setSelectedKey(selectedKey);
    };

    const getTooltip = () => `${get(
        props.reminder, 'name', '')} (${get(
            props.reminder, 'startTime.value', '')} - ${get(
                props.reminder, 'endTime.value', '')})`;

    return (<Col lg={3} key={nanoid()}
                style={{ paddingBottom: '20px' }}>
        <OverlayTrigger
            placement='auto'
            overlay={
                <Tooltip>
                    {getTooltip()}
                </Tooltip>
            }
            >
            <i className="fa fa-bell fa-lg hand-cursor"
                style={{ color: get(props, 'reminder.color.hex') }}
                data-reminder={`${props.keyDay}.${props.time}`}
                onClick={handleReminderClick}></i>
        </OverlayTrigger>
    </Col>);
};

Reminder.propTypes = {
    keyDay: PropTypes.string.isRequired,
    reminder: PropTypes.object.isRequired,
    time: PropTypes.string.isRequired
};

export default inject('store')(Reminder);