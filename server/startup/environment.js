import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  process.env.DDP_DEFAULT_CONNECTION_URL = "http://192.168.99.153:3005"
  process.env.ROOT_URL = "http://192.168.99.153:3005"
})
;
