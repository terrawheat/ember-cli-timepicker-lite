import Ember from 'ember';
import layout from '../templates/components/time-picker';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['timepicker'],

  in24hr: true,

  showHours: true,
  showMinutes: true,
  showSeconds: false,
  showTimeZone: false,
  showMeridian: Ember.computed('in24hr', function () {
    return this.get('in24hr') === false;
  })
});
