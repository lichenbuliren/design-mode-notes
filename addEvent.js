/**
 * 事件绑定
 * @param {[type]} el      [description]
 * @param {[type]} type    [description]
 * @param {[type]} handler [description]
 */
var addEvent = function(el, type, handler) {
  if (window.addEventListener) {
    addEvent = function(el, type, handler) {
      el.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent) {
    addEvent = function(el, type, handler) {
      el.attachEvent('on' + type, handler);
    }
  }

  addEvent(el, type, handler);
}
