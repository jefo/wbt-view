import result from 'lodash/result';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';

export default class View {
  constructor(options = {}) {
    this.cid = uniqueId('view');
    this.preInitialize();
    const {$el} = options;
    if ($el) {
      this.$el = $el;
    }
    if (!this.$el) {
      throw new Error('$el property must be specified');
    }
    this.bindUIElements();
    this.delegateEvents();
  }

  delegateEvents(events) {
    events || (events = result(this, 'events'));
    if (!events) {
      return this;
    }
    // todo: undelegate events
    forEach(events, (val, key) => {
      let method = events[key];
      if (!isFunction(method)) {
        method = this[method];
      }
      if (!method) {
        return;
      }
      const match = key.match(/^(\S+)\s*(.*)$/);
      this.delegate(match[1], match[2], method.bind(this));
    });
    return this;
  }

  delegate(eventName, selector, listener) {
    this.$el.on(eventName, selector, listener);
    return this;
  }

  $(selector) {
    return this.$el.find(selector);
  }

  bindUIElements() {
    if (!this.ui) {
      return;
    }
    // store the ui hash in _uiBindings so they can be reset later
    // and so re-rendering the view will be able to find the bindings
    if (!this._uiBindings) {
      this._uiBindings = this.ui;
    }
    const bindings = result(this, '_uiBindings');
    this._ui = {};
    forEach(bindings, (selector, key) => {
      this._ui[key] = this.$(selector);
    });
    this.ui = this._ui;
  }

  preInitialize() {}
}
