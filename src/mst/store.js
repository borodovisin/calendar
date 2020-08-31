/* eslint-disable no-unused-vars */
import { types } from 'mobx-state-tree';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const Store = types.model("Store", {
    reminder: types.frozen({}),
    selectedReminder:  types.frozen({}),
    selectedKey:  types.string,
    month: types.number
})
.views(self => ({
    hasReminder(key) {
        return !isEmpty(get(self.reminder, key));
    }
}))
.actions(self => ({
    setReminder(key, reminder) {
        self.reminder = merge(omit(cloneDeep(self.reminder),
            `${key}.${reminder.startTime.value}`),
            { [key]: { [reminder.startTime.value]: reminder } });
    },
    removeReminder(fullKey) {
        self.reminder = omit(cloneDeep(self.reminder), fullKey);
    },
    removeAllReminders(key) {
        self.reminder = omit(cloneDeep(self.reminder), key);
    },
    cleanSelection() {
        self.selectedReminder = {};
        self.selectedKey = '';
    },
    setSelectedReminder(selectedReminder = {})  {
        self.selectedReminder = selectedReminder;
    },
    setSelectedKey(fullKey = '')  {
        self.selectedKey = fullKey;
    },
    setMonth(month) {
        self.month = month;
    }
}));

export default Store;