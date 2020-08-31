
import { types } from "mobx-state-tree";

const ReminderStore = types.model("Reminder", {
    name: types.string,
    startTime: types.Date,
    endTime: types.Date,
    city: types.string
})
.views(self => ({
    get isVisible()  {
        return self.show;
    }
}))
.actions(self => ({
    setReminder(name, startTime, endTime, city) {
        self.name = name;
        self.startTime = startTime;
        self.endTime = endTime;
        self.city = city;
    }
}));

export default ReminderStore;