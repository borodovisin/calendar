import moment from 'moment';

import createStore from '../mst/createStore';

describe('Global mst testing suite', () => {
    let store;

    beforeEach(() => {
        store = createStore();
    });

    test('Should has properties', () => {
        expect(store).toHaveProperty('reminder');
        expect(store).toHaveProperty('selectedReminder');
        expect(store).toHaveProperty('selectedKey');
        expect(store).toHaveProperty('month');
    
    });

    test('Should has actions', () => {
        expect(store).toHaveProperty('setReminder');
        expect(store).toHaveProperty('removeReminder');
        expect(store).toHaveProperty('removeAllReminders');
        expect(store).toHaveProperty('cleanSelection');
        expect(store).toHaveProperty('setSelectedReminder');
        expect(store).toHaveProperty('setSelectedKey');
        expect(store).toHaveProperty('setMonth');
    });

    test('Should has views', () => {
        expect(store).toHaveProperty('hasReminder');
    });

    test('Should initialized', () => {
        expect(store.reminder).toMatchObject({});
        expect(store.selectedReminder).toMatchObject({});
        expect(store.selectedKey).toMatch('');
        expect(store.month).toBe(moment().month());
    });

    test('Should set reminder', () => {
        const key = '2020-08-30';
        const reminder = { startTime: { value: 'time' }, mock: 'mock' };

        store.setReminder(key, reminder);
        expect(store.reminder)
            .toMatchObject({ [key]: { [reminder.startTime.value]: reminder } });
    }); 

    test('Should remove reminder', () => {
        const key = '2020-08-30';
        const reminder = { startTime: { value: 'time' }, mock: 'mock' };

        store.setReminder(key, reminder);
        store.removeReminder('2020-08-30.time');
        expect(store.reminder).toMatchObject({});
    }); 

    test('Should remove all reminder', () => {
        const key = '2020-08-30';
        const reminder = { startTime: { value: 'time' }, mock: 'mock' };
        const reminder1 = { startTime: { value: 'time1' }, mock: 'mock1' };

        store.setReminder(key, reminder);
        store.setReminder(key, reminder1);
        store.removeReminder(key);
        expect(store.reminder).toMatchObject({});
    }); 

    test('Should clean selected reminder', () => {
        const key = '2020-08-30';
        const reminder = { startTime: { value: 'time' }, mock: 'mock' };

        store.setSelectedReminder(reminder);
        store.setSelectedKey(key);
        store.cleanSelection();
        expect(store.reminder).toMatchObject({});
    }); 

    test('Should set month', () => {
        store.setMonth(3);
        expect(store.month).toBe(3);
    }); 

    test('Should not set month', () => {
        store.setMonth(13);
        expect(store.month).not.toBe(13);
    }); 

    test('Should test mock function', () => {
        const r =  jest.fn(() => 1);

        expect(r).not.toBe(1);
    }); 
});