
import moment from 'moment';

import Store from './store';

const createStore = () => {
    const store = Store.create({ reminder: {}, selectedReminder: {},
        selectedKey: '', month: moment().month() });
    
    return store;
};

export default createStore;