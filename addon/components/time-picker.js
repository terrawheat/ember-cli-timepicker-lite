import Ember from 'ember';
import layout from '../templates/components/time-picker';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['timepicker'],

  in24hr: true,

  hours: '12',
  minutes: '58',
  seconds: '00',
  meridian: 'am',
  timezone: 'UTC',

  hourInterval: 1,
  minuteInterval: 1,
  secondInteral: 1,

  showHours: true,
  showMinutes: true,
  showSeconds: false,
  showTimeZone: false,
  showMeridian: Ember.computed('in24hr', function () {
    return this.get('in24hr') === false;
  }),

  actions: {
    increase: function (field) {
      this.get('increase')[field].call(this);
    },
    decrease: function (field) {
      this.get('decrease')[field].call(this);
    }
  },

  increase: {
    hours: function (intervalOverride) {
      var hours = Number(this.get('hours'));
      var interval = intervalOverride || Number(this.get('hourInterval'));
      var targetHours = hours + interval;
      var limit = 12;

      if (this.get('in24hr')) {
        limit = 24;
      }

      if (targetHours >= limit) {
        targetHours = 1;
      }

      this.set('hours', String(targetHours));
    },
    minutes: function (intervalOverride) {
      var minutes = Number(this.get('minutes'));
      var interval = intervalOverride || Number(this.get('minuteInterval'));
      var target = minutes + interval;

      if (target >= 60) {
        target = 0;
        this.get('increase').hours.call(this, 1);
      }

      this.set('minutes', String(target));
    },
    seconds: function () {
      var seconds = Number(this.get('seconds'));
      var target = seconds + Number(this.get('secondInterval'));

      if (target >= 60) {
        target = 0;
        this.get('increase').minutes.call(this, 1);
      }

      this.set('seconds', String(target));
    }
  },

  decrease: {
    hours: function (intervalOverride) {
      var hours = Number(this.get('hours'));
      var interval = intervalOverride || Number(this.get('hourInterval'));
      var targetHours = hours - interval;
      var limit = 12;

      if (this.get('in24hr')) {
        limit = 23;
      }

      if (targetHours < 1) {
        targetHours = limit;
      }

      this.set('hours', String(targetHours));
    },
    minutes: function (intervalOverride) {
      var minutes = Number(this.get('minutes'));
      var interval = intervalOverride || Number(this.get('minuteInterval'));
      var target = minutes - interval;

      if (target < 0) {
        target = 59;
        this.get('decrease').hours.call(this, 1);
      }

      this.set('minutes', String(target));
    },
    seconds: function () {
      var seconds = Number(this.get('seconds'));
      var target = seconds + Number(this.get('secondInterval'));

      if (target < 0) {
        target = 59;
        this.get('decrease').minutes.call(this, 1);
      }

      this.set('seconds', String(target));
    }
  }
});
