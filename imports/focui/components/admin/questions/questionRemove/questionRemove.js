import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './questionRemove.html';
import {Images} from '../../../../../api/images';

class QuestionRemove {
  remove() {
    if (this.index) {
      this.questions.splice(this.index,1);
      if(this.done)
      this.done({
        $event: {
          questions:this.questions,
        }
      });
    }
  }
}

const name = 'questionRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    questions: '<',
    index:'<',
    done: '&?'
  },
  controllerAs: name,
  controller: QuestionRemove
});
