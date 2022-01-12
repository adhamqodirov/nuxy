(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_repeater', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
  data: function data() {
    return {
      repeater: [],
      repeater_values: {},
      disable_scroll: false
    };
  },
  template: "\n    <div class=\"wpcfto_generic_field wpcfto_generic_field_repeater wpcfto-repeater unflex_fields\">\n\n        <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n        \n        <div class=\"wpcfto-field-content\">\n\n            <div v-for=\"(area, area_key) in repeater\" :key=\"area\" class=\"wpcfto-repeater-single\" :class=\"'wpcfto-repeater_' + field_name + '_' + area_key \">\n    \n                <div class=\"wpcfto_group_title\" v-html=\"field_label + ' #' + (area_key + 1)\"></div>\n    \n                <div class=\"repeater_inner\">\n    \n                    <div class=\"wpcfto-repeater-field\" v-for=\"(field, field_name_inner) in fields.fields\">\n                    \n                        <component :is=\"'wpcfto_' + field.type\"\n                                   :fields=\"field\"\n                                   :field_name=\"field_name + '_' + area_key + '_' + field_name_inner\"\n                                   :field_label=\"field.label\"\n                                   :field_value=\"getFieldValue(area_key, field, field_name_inner)\"\n                                   :field_data=\"field\"\n                                   :field_native_name=\"field_name\"\n                                   :field_native_name_inner=\"field_name_inner\"\n                                   @wpcfto-get-value=\"$set(repeater[area_key], field_name_inner, $event)\">\n                        </component>\n    \n                    </div>\n    \n                </div>\n    \n                <span class=\"wpcfto-repeater-single-delete\" @click=\"removeArea(area_key)\">\n                    <i class=\"fa fa-trash-alt\"></i>Delete\n                </span>\n    \n            </div>\n    \n            <div v-if=\"repeater && repeater.length > 0\" class=\"separator\"></div>\n    \n            <div class=\"addArea\" @click=\"addArea\">\n                <i class=\"fa fa-plus-circle\"></i>\n                <span v-html=\"addLabel()\"></span>\n            </div>\n        \n        </div>\n        \n        <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n    </div>\n    ",
  mounted: function mounted() {
    var _this = this;

    if (typeof _this.field_value === 'string' && WpcftoIsJsonString(_this.field_value)) {
      _this.field_value = JSON.parse(_this.field_value);
    }

    if (typeof _this.field_value !== 'undefined' && typeof _this.field_value !== 'string') {
      _this.$set(_this, 'repeater_values', _this.field_value);

      _this.repeater_values.forEach(function () {
        _this.repeater.push({});
      });
    }

    if (typeof _this.field_data !== 'undefined' && typeof _this.field_data['disable_scroll'] !== 'undefined') _this.disable_scroll = true;
  },
  methods: {
    addArea: function addArea() {
      this.repeater.push({
        closed_tab: true
      });

      if (!this.disable_scroll) {
        var el = 'wpcfto-repeater_' + this.field_name + '_' + (this.repeater.length - 1);
        Vue.nextTick(function () {
          if (typeof jQuery !== 'undefined') {
            var $ = jQuery;
            $([document.documentElement, document.body]).animate({
              scrollTop: $("." + el).offset().top - 40
            }, 400);
          }
        });
      }
    },
    toggleArea: function toggleArea(area) {
      var currentState = typeof area['closed_tab'] !== 'undefined' ? area['closed_tab'] : false;
      this.$set(area, 'closed_tab', !currentState);
    },
    removeArea: function removeArea(areaIndex) {
      if (confirm('Do your really want to delete this field?')) {
        this.repeater.splice(areaIndex, 1);
      }
    },
    getFieldValue: function getFieldValue(key, field, field_name) {
      if (typeof this.repeater_values === 'undefined') return field.value;
      if (typeof this.repeater_values[key] === 'undefined') return field.value;
      if (typeof this.repeater_values[key][field_name] === 'undefined') return field.value;
      return this.repeater_values[key][field_name];
    },
    addLabel: function addLabel() {
      if (typeof this.fields['load_labels'] !== 'undefined' && this.fields['load_labels']['add_label'] !== 'undefined') {
        return this.fields['load_labels']['add_label'];
      }

      return this['field_label'];
    }
  },
  watch: {
    repeater: {
      deep: true,
      handler: function handler(repeater) {
        this.$emit('wpcfto-get-value', repeater);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZDZmYWY5MjguanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwicmVwZWF0ZXIiLCJyZXBlYXRlcl92YWx1ZXMiLCJkaXNhYmxlX3Njcm9sbCIsInRlbXBsYXRlIiwibW91bnRlZCIsIl90aGlzIiwiZmllbGRfdmFsdWUiLCJXcGNmdG9Jc0pzb25TdHJpbmciLCJKU09OIiwicGFyc2UiLCIkc2V0IiwiZm9yRWFjaCIsInB1c2giLCJmaWVsZF9kYXRhIiwibWV0aG9kcyIsImFkZEFyZWEiLCJjbG9zZWRfdGFiIiwiZWwiLCJmaWVsZF9uYW1lIiwibGVuZ3RoIiwibmV4dFRpY2siLCJqUXVlcnkiLCIkIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJib2R5IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInRvZ2dsZUFyZWEiLCJhcmVhIiwiY3VycmVudFN0YXRlIiwicmVtb3ZlQXJlYSIsImFyZWFJbmRleCIsImNvbmZpcm0iLCJzcGxpY2UiLCJnZXRGaWVsZFZhbHVlIiwia2V5IiwiZmllbGQiLCJ2YWx1ZSIsImFkZExhYmVsIiwiZmllbGRzIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsaUJBQWQsRUFBaUM7QUFDL0JDLEVBQUFBLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLFlBQW5FLENBRHdCO0FBRS9CQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFPO0FBQ0xDLE1BQUFBLFFBQVEsRUFBRSxFQURMO0FBRUxDLE1BQUFBLGVBQWUsRUFBRSxFQUZaO0FBR0xDLE1BQUFBLGNBQWMsRUFBRTtBQUhYLEtBQVA7QUFLRCxHQVI4QjtBQVMvQkMsRUFBQUEsUUFBUSxFQUFF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QyxFQUFpRCxPQUFPc0MsS0FBSyxDQUFDQyxLQUFiO0FBQ2pELFVBQUksT0FBTyxLQUFLdkMsZUFBTCxDQUFxQnFDLEdBQXJCLENBQVAsS0FBcUMsV0FBekMsRUFBc0QsT0FBT0MsS0FBSyxDQUFDQyxLQUFiO0FBQ3RELFVBQUksT0FBTyxLQUFLdkMsZUFBTCxDQUFxQnFDLEdBQXJCLEVBQTBCcEIsVUFBMUIsQ0FBUCxLQUFpRCxXQUFyRCxFQUFrRSxPQUFPcUIsS0FBSyxDQUFDQyxLQUFiO0FBQ2xFLGFBQU8sS0FBS3ZDLGVBQUwsQ0FBcUJxQyxHQUFyQixFQUEwQnBCLFVBQTFCLENBQVA7QUFDRCxLQWhDTTtBQWlDUHVCLElBQUFBLFFBQVEsRUFBRSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCLFVBQUksT0FBTyxLQUFLQyxNQUFMLENBQVksYUFBWixDQUFQLEtBQXNDLFdBQXRDLElBQXFELEtBQUtBLE1BQUwsQ0FBWSxhQUFaLEVBQTJCLFdBQTNCLE1BQTRDLFdBQXJHLEVBQWtIO0FBQ2hILGVBQU8sS0FBS0EsTUFBTCxDQUFZLGFBQVosRUFBMkIsV0FBM0IsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBSyxhQUFMLENBQVA7QUFDRDtBQXZDTSxHQTNCc0I7QUFvRS9CQyxFQUFBQSxLQUFLLEVBQUU7QUFDTDNDLElBQUFBLFFBQVEsRUFBRTtBQUNSNEMsTUFBQUEsSUFBSSxFQUFFLElBREU7QUFFUkMsTUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUI3QyxRQUFqQixFQUEyQjtBQUNsQyxhQUFLOEMsS0FBTCxDQUFXLGtCQUFYLEVBQStCOUMsUUFBL0I7QUFDRDtBQUpPO0FBREw7QUFwRXdCLENBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19yZXBlYXRlcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXBlYXRlcjogW10sXG4gICAgICByZXBlYXRlcl92YWx1ZXM6IHt9LFxuICAgICAgZGlzYWJsZV9zY3JvbGw6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX3JlcGVhdGVyIHdwY2Z0by1yZXBlYXRlciB1bmZsZXhfZmllbGRzXFxcIj5cXG5cXG4gICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuICAgICAgICBcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVxcXCIoYXJlYSwgYXJlYV9rZXkpIGluIHJlcGVhdGVyXFxcIiA6a2V5PVxcXCJhcmVhXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlcGVhdGVyLXNpbmdsZVxcXCIgOmNsYXNzPVxcXCInd3BjZnRvLXJlcGVhdGVyXycgKyBmaWVsZF9uYW1lICsgJ18nICsgYXJlYV9rZXkgXFxcIj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19ncm91cF90aXRsZVxcXCIgdi1odG1sPVxcXCJmaWVsZF9sYWJlbCArICcgIycgKyAoYXJlYV9rZXkgKyAxKVxcXCI+PC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyZXBlYXRlcl9pbm5lclxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXJlcGVhdGVyLWZpZWxkXFxcIiB2LWZvcj1cXFwiKGZpZWxkLCBmaWVsZF9uYW1lX2lubmVyKSBpbiBmaWVsZHMuZmllbGRzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVxcXCInd3BjZnRvXycgKyBmaWVsZC50eXBlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkcz1cXFwiZmllbGRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbmFtZT1cXFwiZmllbGRfbmFtZSArICdfJyArIGFyZWFfa2V5ICsgJ18nICsgZmllbGRfbmFtZV9pbm5lclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9sYWJlbD1cXFwiZmllbGQubGFiZWxcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfdmFsdWU9XFxcImdldEZpZWxkVmFsdWUoYXJlYV9rZXksIGZpZWxkLCBmaWVsZF9uYW1lX2lubmVyKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9kYXRhPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9uYXRpdmVfbmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9uYXRpdmVfbmFtZV9pbm5lcj1cXFwiZmllbGRfbmFtZV9pbm5lclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEB3cGNmdG8tZ2V0LXZhbHVlPVxcXCIkc2V0KHJlcGVhdGVyW2FyZWFfa2V5XSwgZmllbGRfbmFtZV9pbm5lciwgJGV2ZW50KVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9jb21wb25lbnQ+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3cGNmdG8tcmVwZWF0ZXItc2luZ2xlLWRlbGV0ZVxcXCIgQGNsaWNrPVxcXCJyZW1vdmVBcmVhKGFyZWFfa2V5KVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtYWx0XFxcIj48L2k+RGVsZXRlXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwicmVwZWF0ZXIgJiYgcmVwZWF0ZXIubGVuZ3RoID4gMFxcXCIgY2xhc3M9XFxcInNlcGFyYXRvclxcXCI+PC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFkZEFyZWFcXFwiIEBjbGljaz1cXFwiYWRkQXJlYVxcXCI+XFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1wbHVzLWNpcmNsZVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICA8c3BhbiB2LWh0bWw9XFxcImFkZExhYmVsKClcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcXG4gICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgX3RoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyhfdGhpcy5maWVsZF92YWx1ZSkpIHtcbiAgICAgIF90aGlzLmZpZWxkX3ZhbHVlID0gSlNPTi5wYXJzZShfdGhpcy5maWVsZF92YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBfdGhpcy5maWVsZF92YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIF90aGlzLmZpZWxkX3ZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgX3RoaXMuJHNldChfdGhpcywgJ3JlcGVhdGVyX3ZhbHVlcycsIF90aGlzLmZpZWxkX3ZhbHVlKTtcblxuICAgICAgX3RoaXMucmVwZWF0ZXJfdmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5yZXBlYXRlci5wdXNoKHt9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgX3RoaXMuZmllbGRfZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIF90aGlzLmZpZWxkX2RhdGFbJ2Rpc2FibGVfc2Nyb2xsJ10gIT09ICd1bmRlZmluZWQnKSBfdGhpcy5kaXNhYmxlX3Njcm9sbCA9IHRydWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhZGRBcmVhOiBmdW5jdGlvbiBhZGRBcmVhKCkge1xuICAgICAgdGhpcy5yZXBlYXRlci5wdXNoKHtcbiAgICAgICAgY2xvc2VkX3RhYjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdGhpcy5kaXNhYmxlX3Njcm9sbCkge1xuICAgICAgICB2YXIgZWwgPSAnd3BjZnRvLXJlcGVhdGVyXycgKyB0aGlzLmZpZWxkX25hbWUgKyAnXycgKyAodGhpcy5yZXBlYXRlci5sZW5ndGggLSAxKTtcbiAgICAgICAgVnVlLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciAkID0galF1ZXJ5O1xuICAgICAgICAgICAgJChbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogJChcIi5cIiArIGVsKS5vZmZzZXQoKS50b3AgLSA0MFxuICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlQXJlYTogZnVuY3Rpb24gdG9nZ2xlQXJlYShhcmVhKSB7XG4gICAgICB2YXIgY3VycmVudFN0YXRlID0gdHlwZW9mIGFyZWFbJ2Nsb3NlZF90YWInXSAhPT0gJ3VuZGVmaW5lZCcgPyBhcmVhWydjbG9zZWRfdGFiJ10gOiBmYWxzZTtcbiAgICAgIHRoaXMuJHNldChhcmVhLCAnY2xvc2VkX3RhYicsICFjdXJyZW50U3RhdGUpO1xuICAgIH0sXG4gICAgcmVtb3ZlQXJlYTogZnVuY3Rpb24gcmVtb3ZlQXJlYShhcmVhSW5kZXgpIHtcbiAgICAgIGlmIChjb25maXJtKCdEbyB5b3VyIHJlYWxseSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZpZWxkPycpKSB7XG4gICAgICAgIHRoaXMucmVwZWF0ZXIuc3BsaWNlKGFyZWFJbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRGaWVsZFZhbHVlOiBmdW5jdGlvbiBnZXRGaWVsZFZhbHVlKGtleSwgZmllbGQsIGZpZWxkX25hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXBlYXRlcl92YWx1ZXMgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmllbGQudmFsdWU7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucmVwZWF0ZXJfdmFsdWVzW2tleV0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmllbGQudmFsdWU7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucmVwZWF0ZXJfdmFsdWVzW2tleV1bZmllbGRfbmFtZV0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmllbGQudmFsdWU7XG4gICAgICByZXR1cm4gdGhpcy5yZXBlYXRlcl92YWx1ZXNba2V5XVtmaWVsZF9uYW1lXTtcbiAgICB9LFxuICAgIGFkZExhYmVsOiBmdW5jdGlvbiBhZGRMYWJlbCgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZHNbJ2xvYWRfbGFiZWxzJ10gIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzWydsb2FkX2xhYmVscyddWydhZGRfbGFiZWwnXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzWydsb2FkX2xhYmVscyddWydhZGRfbGFiZWwnXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNbJ2ZpZWxkX2xhYmVsJ107XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHJlcGVhdGVyOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZXBlYXRlcikge1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgcmVwZWF0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il19
},{}]},{},[1])