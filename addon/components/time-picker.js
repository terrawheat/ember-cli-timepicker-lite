import Ember from 'ember';
import layout from '../templates/components/time-picker';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['timepicker'],

  hours: '12',
  minutes: '58',
  seconds: '00',
  meridian: 'am',
  timezone: 'UTC',

  hoursInterval: 1,
  minutesInterval: 1,
  secondsInteral: 1,

  showHours: true,
  showMinutes: true,
  showSeconds: false,
  showTimeZone: false,
  showMeridian: Ember.computed('in24hr', function () {
    return this.get('in24hr') === false;
  }),

  limits: {
    hours: { min: 1, max: 23 },
    minutes: { min: 0, max: 59 },
    seconds: { min: 0, max: 59 },
  },

  actions: {
    increase: function (field) {
      this.get('increase').apply(this, [field, this.get(`${field}Interval`)]);
    },
    decrease: function (field) {
      this.get('decrease').apply(this, [field, this.get(`${field}Interval`)]);
    }
  },

  increase: function (field, interval) {
    var value = Number(this.get(field));
    var limit = this.get(`limits.${field}`);

    value += interval;

    if (value > limit.max) {
      value = limit.min;
    }

    this.set(field, value);
  },

  decrease: function (field, interval) {
    var value = Number(this.get(field));
    var limit = this.get(`limits.${field}`);

    value -= interval;

    if (value < limit.min) {
      value = limit.max;
    }

    this.set(field, value);
  }
});
