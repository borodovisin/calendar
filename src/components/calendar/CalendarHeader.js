/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { inject, observer }  from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';

const StyledRow = styled(Row)`
    && {
        background: #cce5ff;
        color: #004085;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 10px 5px 0 5px;
        border: 1px solid #004085;
        font-weight: bold;
    }
`;

const CalendarHeader = props => {
    const monthName = moment().month(props.store.month).format('MMMM');

    return (<React.Fragment>
        <Row className="text-center">
            <Col lg={true}>{monthName}</Col>
        </Row>
        <StyledRow className="text-center">
            <Col lg={true}>Sunday</Col>
            <Col lg={true}>Monday</Col>
            <Col lg={true}>Tuesday</Col>
            <Col lg={true}>Wednesday</Col>
            <Col lg={true}>Thursday</Col>
            <Col lg={true}>Friday</Col>
            <Col lg={true}>Saturday</Col>
        </StyledRow>
    </React.Fragment>);
};

export default inject('store')(observer(CalendarHeader));