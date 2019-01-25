import {
  getBusinessObject
} from '../../../util/ModelUtil';

import {
  isAny
} from '../util/ModelingUtil';

/**
 * A component that makes sure that each created or updated
 * Pool and Lane is assigned an isHorizontal property set to true.
 *
 * @param {EventBus} eventBus
 */
export default function IsHorizontalFix(eventBus) {

  var elementTypesToUpdate = [
    'bpmn:Participant',
    'bpmn:Lane'
  ];

  eventBus.on('element.changed', function(context) {
    var bo = getBusinessObject(context.element);

    if (isAny(bo, elementTypesToUpdate) && !bo.di.get('isHorizontal')) {
      // set attribute directly to avoid modeling#updateProperty side effects
      bo.di.set('isHorizontal', true);
    }
  });

}

IsHorizontalFix.$inject = [ 'eventBus' ];
