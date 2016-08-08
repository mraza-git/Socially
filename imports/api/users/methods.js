import {Meteor} from 'meteor/meteor';

export function updateUserImage(userid, newProfileImage) {
  if (Meteor.isServer) {
    check(newProfileImage, String);
    // if (!this.userId) {
    //   throw new Meteor.Error(400, 'You have to be logged in!');
    // }
    Meteor.users.update(userid, {
      $set: {
        profile:{
          dpImageId: newProfileImage,
        }
      },
    });
  }
}
/*
* Set password for admin and the user itself.
*/
export function setPassword(targetUserId,newPassword,options){
  if(Meteor.isServer){
    check(targetUserId, String);
    check(newPassword, String);
    check(options,Object);
    var loggedInUser = Meteor.userId()
    if (loggedInUser!=targetUserId &&
      !Roles.userIsInRole(loggedInUser,
        ['manage-users', 'admin'], "default-group")) {
          throw new Meteor.Error(403, "Access denied")
        }
        Accounts.setPassword(targetUserId,newPassword,options);

  }
}

/**
 * update a user's permissions
 *
 * @param {String} targetUserId Id of user to update
 * @param {Array} roles User's new permissions
 * @param {String} group Company to update permissions for
 */
export function updateRoles(targetUserId, roles, group) {
  check(targetUserId, String);
  check(roles, [String]);
  check(group, String);
  var loggedInUser = Meteor.user()
  console.log(targetUserId,roles,group);

  if(roles[0] === ''){
      Roles.setUserRoles(targetUserId, roles, group)
      return;
  }
  else if (roles[0]==='supplier'){
      Roles.setUserRoles(targetUserId, roles, group)
      return;
  }

  if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser,
                          ['manage-users', 'support-staff'], group)) {

    throw new Meteor.Error(403, "Access denied")
  }

  Roles.setUserRoles(targetUserId, roles, group)
}
/**
 * delete a user from a specific group
 *
 * @method deleteUser
 * @param {String} targetUserId _id of user to delete
 * @param {String} group Company to update permissions for
 */
export function deleteUser(targetUserId, group) {
  check(targetUserId, String);
  check(group, String);
  var loggedInUser = Meteor.user()

  if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser,
                          ['manage-users', 'support-staff'], group)) {
    throw new Meteor.Error(403, "Access denied")
  }

  // remove permissions for target group
  Roles.setUserRoles(targetUserId, [], group)

  // do other actions required when a user is removed...
}

Meteor.methods({
  updateUserImage,
  setPassword,
  updateRoles,
  deleteUser,
});
