import angular from 'angular';
import angularMeteor from 'angular-meteor';


class LoggerService {
  constructor($log, toastr) {
    'ngInject';
    this.toastr = toastr;
    this.logger = $log;
  }
  


  error(message, data, title) {
    toastr.error(message, title);
    log.error('Error: ' + message, data);
  }
  info(message, data, title) {
    toastr.info(message, title);
    log.info('Info: ' + message, data);
  }
  success(message, title) {
    toastr.success(message, title);
    $log.success('Success: ' + message, null);
  }
  warning(message, data, title) {
    toastr.warning(message, title);
    $log.warning('Warning: ' + message, data);
  }
  static LoggerFactory() {
    return new LoggerService();
  }
}

const name = 'logger';

// Create a module for Service

export default angular.module(name, [
  angularMeteor,
]).factory(name, LoggerService.LoggerFactory);
