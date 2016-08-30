import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {name as AuthModals} from '../../../../client/components/authmodals/authModals';
import {Thumbs40,Images} from '../../../api/images';
import {name as FileUpload} from '../fileUpload/fileUpload';

import template from './toolbaruser.web.html';
import pictureModalTemplate from '../modalTemplates/setPictureModal.html';



class ToolbarUser{
  constructor($scope, $reactive, $state, AuthModals,$mdDialog,$mdMedia) {
    'ngInject';
    $reactive(this).attach($scope);
    this.state = $state;
    this.userStatus = [{}];
    this.authModals = AuthModals;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

    this.subscribe('user');
    this.subscribe('thumbs40',()=>[[this.getReactively('user.profile.dpImageId',true)] || [] ]);
    //this.subscribe('userStatus', Meteor.userId());

    this.helpers({
      user(){
        return Meteor.users.findOne({
          _id: Meteor.userId()
        });
      },
      isLoggedIn(){
        return !!Meteor.userId();
      },
      currentUserId(){
        return Meteor.userId();
      },
      thumbs(){
        return Thumbs40.find({
              originalId:{
                $in: [this.getReactively('user.profile.dpImageId',true)] || []
            }
          });
      }
    });
  }
  $onInit(){
    // Setup status options, later put them in db.
    this.userStatusOptions=[
        {
            'title': 'Online',
            'icon' : 'icon-checkbox-marked-circle',
            'color': '#4CAF50'
        },
        {
            'title': 'Away',
            'icon' : 'icon-clock',
            'color': '#FFC107'
        },
        {
            'title': 'Do not Disturb',
            'icon' : 'icon-minus-circle',
            'color': '#F44336'
        },
        {
            'title': 'Invisible',
            'icon' : 'icon-checkbox-blank-circle-outline',
            'color': '#BDBDBD'
        },
        {
            'title': 'Offline',
            'icon' : 'icon-checkbox-blank-circle-outline',
            'color': '#616161'
        }
    ];

    this.userStatus = this.userStatusOptions[1];

  }
  setUserStatus(status){
    this.userStatus = status;
    Meteor.users.update({
      _id:this.user._id
    },{
        $set:{
          "profile.userStatus":angular.copy(status)
      }
    },function(error) {
        if(error) {
          console.log('Unable to update', error);
        } else {
          console.log('User Updated!');
        }
    }
    );

  }
  logout(event){
    Accounts.logout(function(){

        },function(err){
          console.log(err);
          return ;
        });
        this.state.go("app.landing");
  }
  openChangePassword(event){
    this.authModals.openChangeModal(event);
  }

  openChangePictureModal($event){
       this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';
          this.close = () => {
            $mdDialog.hide(false);
          }
          this.done = (event)=>{
            if(event){
              $mdDialog.hide(event);
            }
          }
        },
        controllerAs: 'imageModal',
        template: pictureModalTemplate,
        targetEvent: $event,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      })
      .then(function(event){
        if (event){
          var oldPicId = Meteor.user().profile.dpImageId;
          Meteor.users.update({
            _id:Meteor.userId()
          },{
            $set:{
              "profile.dpThumbUrl":event.file.url,
              "profile.dpImageId":event.file.id,
            }
          },function(error) {
            if(error) {
              console.log('Unable to update', error);
              Images.remove({_id:event.file.id}); // Remove new image if user update failed.
            } else {
              //New Picture Updated
              Images.remove({_id: oldPicId}); // Remove old image once new is updated.
            }
          });
        } else {
          // User Closed without uploading the picture.
        }
      },function(error){
        console.log('error:', error); // Modal/picture update error
      });

  }

}


const name = 'toolbarUser';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  FileUpload,

]).component(name, {
  template,
  controller: ToolbarUser,
  controllerAs: name
});
