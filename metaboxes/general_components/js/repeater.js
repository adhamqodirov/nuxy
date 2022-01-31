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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjY2MjZlNC5qcyJdLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJyZXBlYXRlciIsInJlcGVhdGVyX3ZhbHVlcyIsImRpc2FibGVfc2Nyb2xsIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiX3RoaXMiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsIiRzZXQiLCJmb3JFYWNoIiwicHVzaCIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwiYWRkQXJlYSIsImNsb3NlZF90YWIiLCJlbCIsImZpZWxkX25hbWUiLCJsZW5ndGgiLCJuZXh0VGljayIsImpRdWVyeSIsIiQiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidG9nZ2xlQXJlYSIsImFyZWEiLCJjdXJyZW50U3RhdGUiLCJyZW1vdmVBcmVhIiwiYXJlYUluZGV4IiwiY29uZmlybSIsInNwbGljZSIsImdldEZpZWxkVmFsdWUiLCJrZXkiLCJmaWVsZCIsInZhbHVlIiwiYWRkTGFiZWwiLCJmaWVsZHMiLCJ3YXRjaCIsImRlZXAiLCJoYW5kbGVyIiwiJGVtaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxpQkFBZCxFQUFpQztBQUMvQkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsWUFBbkUsQ0FEd0I7QUFFL0JDLEVBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQU87QUFDTEMsTUFBQUEsUUFBUSxFQUFFLEVBREw7QUFFTEMsTUFBQUEsZUFBZSxFQUFFLEVBRlo7QUFHTEMsTUFBQUEsY0FBYyxFQUFFO0FBSFgsS0FBUDtBQUtELEdBUjhCO0FBUy9CQyxFQUFBQSxRQUFRLEVBQUUs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LEVBQWlELE9BQU9zQyxLQUFLLENBQUNDLEtBQWI7QUFDakQsVUFBSSxPQUFPLEtBQUt2QyxlQUFMLENBQXFCcUMsR0FBckIsQ0FBUCxLQUFxQyxXQUF6QyxFQUFzRCxPQUFPQyxLQUFLLENBQUNDLEtBQWI7QUFDdEQsVUFBSSxPQUFPLEtBQUt2QyxlQUFMLENBQXFCcUMsR0FBckIsRUFBMEJwQixVQUExQixDQUFQLEtBQWlELFdBQXJELEVBQWtFLE9BQU9xQixLQUFLLENBQUNDLEtBQWI7QUFDbEUsYUFBTyxLQUFLdkMsZUFBTCxDQUFxQnFDLEdBQXJCLEVBQTBCcEIsVUFBMUIsQ0FBUDtBQUNELEtBaENNO0FBaUNQdUIsSUFBQUEsUUFBUSxFQUFFLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsVUFBSSxPQUFPLEtBQUtDLE1BQUwsQ0FBWSxhQUFaLENBQVAsS0FBc0MsV0FBdEMsSUFBcUQsS0FBS0EsTUFBTCxDQUFZLGFBQVosRUFBMkIsV0FBM0IsTUFBNEMsV0FBckcsRUFBa0g7QUFDaEgsZUFBTyxLQUFLQSxNQUFMLENBQVksYUFBWixFQUEyQixXQUEzQixDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLLGFBQUwsQ0FBUDtBQUNEO0FBdkNNLEdBM0JzQjtBQW9FL0JDLEVBQUFBLEtBQUssRUFBRTtBQUNMM0MsSUFBQUEsUUFBUSxFQUFFO0FBQ1I0QyxNQUFBQSxJQUFJLEVBQUUsSUFERTtBQUVSQyxNQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQjdDLFFBQWpCLEVBQTJCO0FBQ2xDLGFBQUs4QyxLQUFMLENBQVcsa0JBQVgsRUFBK0I5QyxRQUEvQjtBQUNEO0FBSk87QUFETDtBQXBFd0IsQ0FBakMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3JlcGVhdGVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcGVhdGVyOiBbXSxcbiAgICAgIHJlcGVhdGVyX3ZhbHVlczoge30sXG4gICAgICBkaXNhYmxlX3Njcm9sbDogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfcmVwZWF0ZXIgd3BjZnRvLXJlcGVhdGVyIHVuZmxleF9maWVsZHNcXFwiPlxcblxcbiAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgIFxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcblxcbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XFxcIihhcmVhLCBhcmVhX2tleSkgaW4gcmVwZWF0ZXJcXFwiIDprZXk9XFxcImFyZWFcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tcmVwZWF0ZXItc2luZ2xlXFxcIiA6Y2xhc3M9XFxcIid3cGNmdG8tcmVwZWF0ZXJfJyArIGZpZWxkX25hbWUgKyAnXycgKyBhcmVhX2tleSBcXFwiPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dyb3VwX3RpdGxlXFxcIiB2LWh0bWw9XFxcImZpZWxkX2xhYmVsICsgJyAjJyArIChhcmVhX2tleSArIDEpXFxcIj48L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJlcGVhdGVyX2lubmVyXFxcIj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tcmVwZWF0ZXItZmllbGRcXFwiIHYtZm9yPVxcXCIoZmllbGQsIGZpZWxkX25hbWVfaW5uZXIpIGluIGZpZWxkcy5maWVsZHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XFxcIid3cGNmdG9fJyArIGZpZWxkLnR5cGVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRzPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9uYW1lPVxcXCJmaWVsZF9uYW1lICsgJ18nICsgYXJlYV9rZXkgKyAnXycgKyBmaWVsZF9uYW1lX2lubmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZC5sYWJlbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF92YWx1ZT1cXFwiZ2V0RmllbGRWYWx1ZShhcmVhX2tleSwgZmllbGQsIGZpZWxkX25hbWVfaW5uZXIpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2RhdGE9XFxcImZpZWxkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX25hdGl2ZV9uYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX25hdGl2ZV9uYW1lX2lubmVyPVxcXCJmaWVsZF9uYW1lX2lubmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHdwY2Z0by1nZXQtdmFsdWU9XFxcIiRzZXQocmVwZWF0ZXJbYXJlYV9rZXldLCBmaWVsZF9uYW1lX2lubmVyLCAkZXZlbnQpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2NvbXBvbmVudD5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndwY2Z0by1yZXBlYXRlci1zaW5nbGUtZGVsZXRlXFxcIiBAY2xpY2s9XFxcInJlbW92ZUFyZWEoYXJlYV9rZXkpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1hbHRcXFwiPjwvaT5EZWxldGVcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJyZXBlYXRlciAmJiByZXBlYXRlci5sZW5ndGggPiAwXFxcIiBjbGFzcz1cXFwic2VwYXJhdG9yXFxcIj48L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWRkQXJlYVxcXCIgQGNsaWNrPVxcXCJhZGRBcmVhXFxcIj5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXBsdXMtY2lyY2xlXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgIDxzcGFuIHYtaHRtbD1cXFwiYWRkTGFiZWwoKVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFxcbiAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBfdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKF90aGlzLmZpZWxkX3ZhbHVlKSkge1xuICAgICAgX3RoaXMuZmllbGRfdmFsdWUgPSBKU09OLnBhcnNlKF90aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIF90aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgX3RoaXMuZmllbGRfdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBfdGhpcy4kc2V0KF90aGlzLCAncmVwZWF0ZXJfdmFsdWVzJywgX3RoaXMuZmllbGRfdmFsdWUpO1xuXG4gICAgICBfdGhpcy5yZXBlYXRlcl92YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLnJlcGVhdGVyLnB1c2goe30pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBfdGhpcy5maWVsZF9kYXRhICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgX3RoaXMuZmllbGRfZGF0YVsnZGlzYWJsZV9zY3JvbGwnXSAhPT0gJ3VuZGVmaW5lZCcpIF90aGlzLmRpc2FibGVfc2Nyb2xsID0gdHJ1ZTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGFkZEFyZWE6IGZ1bmN0aW9uIGFkZEFyZWEoKSB7XG4gICAgICB0aGlzLnJlcGVhdGVyLnB1c2goe1xuICAgICAgICBjbG9zZWRfdGFiOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aGlzLmRpc2FibGVfc2Nyb2xsKSB7XG4gICAgICAgIHZhciBlbCA9ICd3cGNmdG8tcmVwZWF0ZXJfJyArIHRoaXMuZmllbGRfbmFtZSArICdfJyArICh0aGlzLnJlcGVhdGVyLmxlbmd0aCAtIDEpO1xuICAgICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyICQgPSBqUXVlcnk7XG4gICAgICAgICAgICAkKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiLlwiICsgZWwpLm9mZnNldCgpLnRvcCAtIDQwXG4gICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGVBcmVhOiBmdW5jdGlvbiB0b2dnbGVBcmVhKGFyZWEpIHtcbiAgICAgIHZhciBjdXJyZW50U3RhdGUgPSB0eXBlb2YgYXJlYVsnY2xvc2VkX3RhYiddICE9PSAndW5kZWZpbmVkJyA/IGFyZWFbJ2Nsb3NlZF90YWInXSA6IGZhbHNlO1xuICAgICAgdGhpcy4kc2V0KGFyZWEsICdjbG9zZWRfdGFiJywgIWN1cnJlbnRTdGF0ZSk7XG4gICAgfSxcbiAgICByZW1vdmVBcmVhOiBmdW5jdGlvbiByZW1vdmVBcmVhKGFyZWFJbmRleCkge1xuICAgICAgaWYgKGNvbmZpcm0oJ0RvIHlvdXIgcmVhbGx5IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmllbGQ/JykpIHtcbiAgICAgICAgdGhpcy5yZXBlYXRlci5zcGxpY2UoYXJlYUluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEZpZWxkVmFsdWU6IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUoa2V5LCBmaWVsZCwgZmllbGRfbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlcGVhdGVyX3ZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmaWVsZC52YWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXBlYXRlcl92YWx1ZXNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmaWVsZC52YWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXBlYXRlcl92YWx1ZXNba2V5XVtmaWVsZF9uYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmaWVsZC52YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzLnJlcGVhdGVyX3ZhbHVlc1trZXldW2ZpZWxkX25hbWVdO1xuICAgIH0sXG4gICAgYWRkTGFiZWw6IGZ1bmN0aW9uIGFkZExhYmVsKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1snbG9hZF9sYWJlbHMnXSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZHNbJ2xvYWRfbGFiZWxzJ11bJ2FkZF9sYWJlbCddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNbJ2xvYWRfbGFiZWxzJ11bJ2FkZF9sYWJlbCddO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1snZmllbGRfbGFiZWwnXTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgcmVwZWF0ZXI6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlcGVhdGVyKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCByZXBlYXRlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])