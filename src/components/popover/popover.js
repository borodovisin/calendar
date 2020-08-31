/* eslint-disable no-unused-vars */
import React from 'react';
import { Popover } from 'react-bootstrap';

import PopoverContent from './PopoverContent';

const popover = key => (
    <Popover>
      <Popover.Content>
        <PopoverContent dayKey={key}/>
      </Popover.Content>
    </Popover>
);

export default popover;
