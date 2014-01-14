class Easing

  @curve: (t, b, c, d) ->
    if (t /= d / 2) < 1 then c / 2 * Math.pow(t, 2) + b
    else -c / 2 * ((t - 1) * (t - 3) - 1) + b
  
  @linear: (t, b, c, d) ->
    c * t / d + b