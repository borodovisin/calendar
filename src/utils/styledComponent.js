import styled from 'styled-components';
import { Row, Spinner } from 'react-bootstrap';

export const StyledRow = styled(Row)`
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

export const StyledSpinner = styled(Spinner)`
&& {
    position: absolute;
    left: 5px;
    top: 11px;
}
`;