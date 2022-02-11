/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react';
import React from 'react';

import PopoverContent from '../../components/popover/PopoverContent';
import createStore from '../../mst/createStore';

describe('PopoverContent suite test', () => {
    const mockStore = createStore();

    test('Should has error messages', () => {
        render(<PopoverContent
            store={mockStore} dayKey={'2020-08-1'} />);

        expect(screen.getByText('Empty reminder name')).toBeInTheDocument();
        expect(screen.getByText('Empty start time')).toBeInTheDocument();
        expect(screen.getByText('Empty end time')).toBeInTheDocument();
        expect(screen.getByText('Invalid city')).toBeInTheDocument();
    });

    test('Should render component', () => {
        const { container } = render(<PopoverContent
            store={mockStore} dayKey={'2020-08-1'} />);

        expect(container.querySelector('#reminder')).toBeInTheDocument();
        expect(container.querySelector('#city')).toBeInTheDocument();
        expect(container.querySelector('.color-picker')).toBeInTheDocument();
        expect(container.querySelector('[type=submit]')).toBeInTheDocument();
        expect(container.querySelector('.btn-danger')).not.toBeInTheDocument();
    });


    test('Should render component with data', () => {
        const selectedkey = '2020-08-9.00:00';
        const selectedReminder = {
            "name": "test", "startTime": {
                "value": "00:00",
                "label":"00:00" 
            },
            "endTime": {
                "value": "00:15",
                "label":"00:15"
            },
            "city": "quito",
            "icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABd0lEQVRoge2Xvy5FQRCHPzeiYqORqFRyCxIajURBJESn0N2oREKn9KfR4B1Ed6OS0FPgASi8wy00wiERErkyydEQzOzZc0QyX7szO/Pbmc3s4jiO4ziO4ziO80d0aMNmWaYxGwSWgVmgD7gDLoF94CZGYghBZZdSyBJw8MP6FrCrjfeBVkjNuvE3NH4RIewAa4nifSFFRbqBR0PMfuBWa1xlRRpG+1KqkkLInNF+HFgEzoAr4BAYKZpEitY6AhYK5tEGxoDrzwva1uosEFxOdiDv+aLIgTaB4dh9YoTIndjOZ0ZKhoAu4LUKIRsxs0CJDM+3WGfLZR8tUQR5NeTynwMrVmfLZT8B5s3pxXMBTJUxR6YrFCFMAntaY0tF2tEpxfMQQujVeFsq0qpYhNCjNbQIacblUogXrbNFiLxen6vVwbHW0CLkCZgA7uNyMiOtvKp1sg5EeQvVgXVgJv8F1vK3UirkS3AKbBq/B47jOI7jOI7j/COAdytoPyw6sFp7AAAAAElFTkSuQmCC",
            "color": {
                "hsl": {
                    "h":204.9107142857143,
                    "s":0.498,
                    "l":0.5,"a":1
                },
                "hex": "#408abf",
                "rgb":{ 
                    "r":64,
                    "g":138,
                    "b":191,"a":1
                },
                "hsv": {
                    "h":204.9107142857143,
                    "s":0.664886515353805,
                    "v":0.749,"a":1
                },
                "oldHue":204.91071428571428,"source":"hsl"
            } };
        
        mockStore.setSelectedKey(selectedkey);
        mockStore.setSelectedReminder(selectedReminder);
        const { container } = render(<PopoverContent
            store={mockStore} dayKey={selectedkey} />);

        expect(container.querySelector('#reminder').value).toMatch('test');
        expect(container.querySelector('#city').value).toMatch('quito');
        expect(container.querySelector('.btn-danger')).toBeInTheDocument();
    });
});