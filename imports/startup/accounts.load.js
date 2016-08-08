import  {Meteor} from "meteor/meteor";
import {Roles} from "meteor/alanning:roles"
// configure first upperclass users
Meteor.startup(function () {
  if (Meteor.users.find().fetch().length === 0) {

   var users = [
      {name:"Normal User",email:"normal@dex.com",roles:[]},
      {name:"View-Secrets User",email:"supplier@dex.com",roles:['supplier']},
      {name:"Manage-Users User",email:"manager@dex.com",roles:['manage-users']},
      {name:"Admin User",email:"admin@dex.com",roles:['admin']}
    ];

    _.each(users, function (user) {
        var id;

        id = Accounts.createUser({
            email: user.email,
            password: "123456",
            profile: { name: user.name }
        });

        if (user.roles.length > 0) {
            // Need _id of existing user record so this call must come
            // after `Accounts.createUser` or `Accounts.onCreate`
            Roles.addUsersToRoles(id, user.roles, 'default-group');
        }

    });
  }
});
