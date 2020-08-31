
import { onAction } from 'mobx-state-tree';
import Store from './store';

const createStore = () => {
    const store = Store.create({ reminder: {}, selectedReminder: {},
    selectedKey: '' });
    
    onAction(store, call => {
        if (['setReminder', 'removeReminder']
        .includes(call.name)) store.cleanSelection();
    });
    return store;
};

export default createStore;