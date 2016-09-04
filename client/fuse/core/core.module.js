
import  'angular';
import  'angular-meteor';
import '../../../imports/focui/landing/js/jquery-2.1.1.js';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngResource from  'angular-resource';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-partial/angular-translate-loader-partial';
import 'angular-translate-loader-static-files/angular-translate-loader-static-files';
import 'mobile-detect/mobile-detect';
import timer from 'angular-timer';
import 'angular-xeditable/dist/js/xeditable';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'nvd3';
import 'angular-nvd3';
import 'nvd3/build/nv.d3.css';
import 'ng-flow/dist/ng-flow-standalone.js';
// import 'datatables/media/js/jquery.dataTables.js';
// import 'angular-datatables';
import 'angular-moment-picker';
import 'moment-range';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';




'use strict';

angular
  .module('app.core',
      [
        // 'datatables',
          ngAnimate,
          ngAria,
          ngCookies,
          ngMessages,
          ngResource,
          ngSanitize,
          'pascalprecht.translate',
          ngMaterial,
          uiRouter,
          'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
          'uiGmapgoogle-maps',
          'nvd3',
          'xeditable',
          'flow',
          'flow.provider',
          'moment-picker',
          'timer',



      ]);
