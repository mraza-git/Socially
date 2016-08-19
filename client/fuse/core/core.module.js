import  'angular';
import  'angular-meteor';


import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngResource from  'angular-resource';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-partial/angular-translate-loader-partial';
import 'angular-translate-loader-static-files/angular-translate-loader-static-files';
import 'mobile-detect/mobile-detect';
import moment from 'moment/moment';
import 'angular-xeditable/dist/js/xeditable';

import 'ng-flow/dist/ng-flow-standalone.js';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';




'use strict';

angular
  .module('app.core',
      [
          ngAnimate,
          ngAria,
          ngCookies,
          ngMessages,
          ngResource,
          ngSanitize,
          'pascalprecht.translate',
          ngMaterial,
          uiRouter,
          'xeditable',
          'flow',
          'flow.provider'

      ]);
