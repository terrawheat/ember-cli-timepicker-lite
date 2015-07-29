import Ember from 'ember';
import layout from '../templates/components/time-picker';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['timepicker'],

  show: false,
  eventNamespace: 'timepicker',

  hours: '12',
  minutes: '00',
  seconds: '00',
  meridian: 'am',

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

  displayString: Ember.computed('hours', 'minutes', 'seconds', function () {
    var h = this.get('hours');
    var m = this.get('minutes');
    var s = this.get('seconds');
    var output = h + ':' + m;

    if (this.get('showSeconds')) {
      output += ':' + s;
    }

    return output;
  }),

  limits: {
    hours: { min: 1, max: 23 },
    minutes: { min: 0, max: 59 },
    seconds: { min: 0, max: 59 },
  },

  direction: 'w',

  didInsertElement: function () {
    var ns = this.get('eventNamespace');
    var that = this;

    Ember.$('#upgrade-app').on(`click.${ns}`, function (e) {
      var $target = Ember.$(e.target);
      var inPicker = false;
      var shown = that.get('show');

      if ($target.closest('.timepicker').length > 0) {
        inPicker = true;
      }

      if (inPicker === false) {
        if (shown) {
          that.set('show', false);
        }

        return true;
      }

      if (shown === false) {
        that.set('show', true);
      }
    });
  },

  willDestroyElement: function () {
    var ns = this.get('eventNamespace');

    Ember.$('#upgrade-app').off(`click.${ns}`);
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
    value = this.setLeadingZero(value);
    this.set(field, value);
    this.sendAction('valueChanged', this.parseTimeString());
  },

  decrease: function (field, interval) {
    var value = Number(this.get(field));
    var limit = this.get(`limits.${field}`);

    value -= interval;

    if (value < limit.min) {
      value = limit.max;
    }
    value = this.setLeadingZero(value);
    this.set(field, value);
    this.sendAction('valueChanged', this.parseTimeString());
  },

  setLeadingZero: function (value) {
    var val = String(value);

    if (Number(value) < 10) {
      val = '0' + val;
    }

    return val;
  },
  parseTimeString: function () {
    var h = this.get('hours');
    var m = this.get('minutes');
    var s = this.get('seconds');
    var tempDate, tz;

    // Get client timezone
    tempDate = new Date();
    tz = tempDate.toString().match(/.*([+-]\d{4,})/)[1];

    return `${h}:${m}:${s}${tz}`;
  }
});
