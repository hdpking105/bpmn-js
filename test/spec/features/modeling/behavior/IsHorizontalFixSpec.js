import {
  bootstrapModeler,
  inject
} from 'test/TestHelper';

import modelingModule from 'lib/features/modeling';
import coreModule from 'lib/core';

import { getBusinessObject } from 'lib/util/ModelUtil';


describe('features/modeling/behavior - IsHorizontalFix', function() {

  var diagramXML;

  describe('set on change', function() {

    diagramXML = require('./IsHorizontalFix.bpmn');

    beforeEach(bootstrapModeler(diagramXML, {
      modules: [
        coreModule,
        modelingModule
      ]
    }));


    it('should set isHorizontal=true when participant is changed', inject(function(elementRegistry, modeling) {

      // given
      var participant = elementRegistry.get('Participant');

      // when
      modeling.updateProperties(participant, {});

      // then
      var isHorizontal = getBusinessObject(participant).di.get('isHorizontal');

      expect(isHorizontal).to.be.true;
    }));


    it('should set isHorizontal=true when lane is changed', inject(function(elementRegistry, modeling) {

      // given
      var lane = elementRegistry.get('Lane');

      // when
      modeling.updateProperties(lane, {});

      // then
      var isHorizontal = getBusinessObject(lane).di.get('isHorizontal');

      expect(isHorizontal).to.be.true;
    }));

  });


  describe('set on create', function() {

    diagramXML = require('test/fixtures/bpmn/simple.bpmn');

    beforeEach(bootstrapModeler(diagramXML, {
      modules: [
        coreModule,
        modelingModule
      ]
    }));


    it('should set isHorizontal=true when participant is created', inject(function(canvas, elementFactory, modeling) {
      // given
      var processShape = canvas.getRootElement(),
          participantShape = elementFactory.createParticipantShape(true);

      // when
      var participant = modeling.createShape(participantShape, { x: 350, y: 200 }, processShape);

      // then
      var isHorizontal = getBusinessObject(participant).di.get('isHorizontal');

      expect(isHorizontal).to.be.true;
    }));


    it('should set isHorizontal=true when lane is created', inject(function(canvas, elementFactory, modeling) {
      // given
      var processShape = canvas.getRootElement(),
          participantShape = elementFactory.createParticipantShape(true),
          participant = modeling.createShape(participantShape, { x: 350, y: 200 }, processShape);

      // when
      var lane = modeling.addLane(participant, 'bottom');

      // then
      var isHorizontal = getBusinessObject(lane).di.get('isHorizontal');

      expect(isHorizontal).to.be.true;
    }));

  });

});
