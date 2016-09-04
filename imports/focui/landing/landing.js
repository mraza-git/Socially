import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import { name as AdminDataService } from '../../services/dataService';
import {name as AuthModals} from '../../../client/components/authmodals/authModals';



// Page level third party elements
import "./css/bootstrap.css";
import "./css/animate.min.css";
import "./font-awesome/css/font-awesome.css";
import "./css/style.css";
import "./js/jquery-2.1.1.js";
import "./js/pace.min.js";
import "./js/bootstrap.js";
import "./js/classie.js";
import "./js/cbpAnimatedHeader.js";
import "./js/wow.min.js";
import "./js/inspinia.js";
// import "./js/jquery.slimscroll.min.js";

import template from './landing.html';
class Landing {
  constructor($scope, $state, AdminDataService,AuthModals, $reactive) {
    'ngInject';
    this.service = {serviceName:""};
    this.allservices = [{}];
    this.state = $state;
    this.searchText="";
    this.authModals = AuthModals;

    $reactive(this).attach($scope);

    this.subscribe('images', () => [
      this.getReactively('profileImage', true) || {},
    ]);

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      },
      profileImage() {
        const user = Meteor.users.findOne({
          $and: [{
            _id: Meteor.userId(),
          }, {
            profileImage: {
              $exists: true,
            },
          }],
        });
        if (user) {
          return user.profileImage;
        }
        return null;
      },
    });

    AdminDataService.getCategories().then((data) => {
      this.categories = data;
      this.getServices(data);
    });
  }
  save() {
    if (this.profileImage) {
      console.log(this.profileImage);
      updateUserImage(Meteor.userId(), this.profileImage);
    }
  }
  getSrc(pictureId) {
    const value = 'http://192.168.99.153:6280/Temp/Downloads/HostImage_' + pictureId + '-800-0.jpg';
    return value;
  }
  selectedItemChange(item) {
    console.log(item);
    this.state.go('serviceList', { cid: item.bCatId });
  }

  getServices(categories) {
    this.allservices = [];
    angular.forEach(categories, (cat, index) => {
      angular.forEach(cat.businessservice, (ser, sindex) => {
        this.allservices.push(ser);
      });
    });
    console.log(this.allservices);
  }

  openLogin(event){
    this.authModals.openLoginModal(event);
  }
  openSignup(event){
    this.authModals.openRegisterModal(event);
  }
  openChangePassword(event){
    this.authModals.openChangeModal(event);
  }
  openForgotPassword(event){
    this.authModals.openForgotModal(event);
  }


}


const name = 'landing';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  AdminDataService,
  AuthModals,
]).component(name, {
  template,
  controllerAs: name,
  controller: Landing,
})
.config(config);
import mainLayoutTemplate from '../../../client/fuse/core/layouts/content-only.html';
import verticalNavigationFullwidthToolbar2_toolbarTemplate from '../../../client/fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html';

function config($stateProvider,msNavigationServiceProvider) {
  'ngInject';


  $stateProvider
    .state('app.landing', {
      url: '/landing',
      views:{
        'content@app.landing':{
          template: '<landing ></landing>',
        },
        'main@'         : {
            template: mainLayoutTemplate,
            controller : 'MainController as vm'
        },
        // 'toolbar@app.landing'   : {
        //     template: verticalNavigationFullwidthToolbar2_toolbarTemplate,//layouts[layoutStyle].toolbar,
        //     controller : 'ToolbarController as vm'
        // },
      },

    });

    // msNavigationServiceProvider.saveItem('fuse', {
    //         title : 'Fixonclick',
    //         group : true,
    //         weight: 1
    //     });
    //
        msNavigationServiceProvider.saveItem('Landing', {
            title    : 'Landing',
            icon     : 'icon-google-pages',
            state    : 'app.landing',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
}


// $(document).ready(function () {
//             console.log("Document Ready Function")
//            $('body').scrollspy({
//                target: '.navbar-fixed-top',
//                offset: 80
//            });
//
//            // Page scrolling feature
//            $('a.page-scroll').bind('click', function (event) {
//                var link = $(this);
//                $('html, body').stop().animate({
//                    scrollTop: $(link.attr('href')).offset().top - 50
//                }, 500);
//                event.preventDefault();
//                $('#navbar').collapse('hide');
//            });
//        });
//
//        var cbpAnimatedHeader = (function () {
//            var docElem = document.documentElement,
//                    header = document.querySelector('.navbar-default'),
//                    didScroll = false,
//                    changeHeaderOn = 200;
//                    console.log("cbpAnimatedHeader Called");
//            function init() {
//              console.log("init Called");
//                window.addEventListener('scroll', function (event) {
//                  console.log("Event Called");
//                    if (!didScroll) {
//                        didScroll = true;
//                        setTimeout(scrollPage, 250);
//                    }
//                }, false);
//            }
//            function scrollPage() {
//                var sy = scrollY();
//                if (sy >= changeHeaderOn) {
//                    $(header).addClass('navbar-scroll')
//                }
//                else {
//                    $(header).removeClass('navbar-scroll')
//                }
//                didScroll = false;
//            }
//            function scrollY() {
//                return window.pageYOffset || docElem.scrollTop;
//            }
//            init();
//
//        })();
