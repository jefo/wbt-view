import result from 'lodash/result';
import forOwn from 'lodash/forOwn';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';

export default class View {
  constructor(options = {}) {
    this.cid = uniqueId('view');
    const {$el} = options;
    if ($el) {
      this.$el = $el;
    }
    if (!this.$el) {
      throw new Error('$el property must be specified');
    }
    this.delegateEvents();
  }

  delegateEvents(events) {
    events || (events = result(this, 'events'));
    if (!events) {
      return this;
    }
    this.undelegateEvents();
    forOwn(events, (val, key) => {
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
}
