var tween = {
  linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
};
