
import { onAction } from 'mobx-state-tree';
import moment from 'moment';

import Store from './store';

const createStore = () => {
    const store = Store.create({ reminder: {}, selectedReminder: {},
        selectedKey: '', month: moment().month() });
    
    onAction(store, call => {
        if (['setReminder', 'removeReminder']
        .includes(call.name)) store.cleanSelection();
    });
    return store;
};

export default createStore;