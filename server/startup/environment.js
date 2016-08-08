import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://arslan@ansaries.com:Y0bma@020@smtp.gmail.com:465/';
})
;
