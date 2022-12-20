# CSS

## Shorthands

Some properties like [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font), [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background), [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding), [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border), and [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) are called **shorthand properties.** This is because shorthand properties set several values in a single line.

```css
/* In 4-value shorthands like padding and margin, the values are applied
   in the order top, right, bottom, left (clockwise from the top). There are also other
   shorthand types, for example 2-value shorthands, which set padding/margin
   for top/bottom, then left/right */
padding: 10px 15px 15px 5px;
```

is equivalent to these four lines of code:

```css
padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

This one line:

```css
background: red url(bg-graphic.png) 10px 10px repeat-x fixed;
```

is equivalent to these five lines:

```css
background-color: red;
background-image: url(bg-graphic.png);
background-position: 10px 10px;
background-repeat: repeat-x;
background-attachment: fixed;
```

> **Warning:** One less obvious aspect of using CSS shorthand is how omitted values reset. A value not specified in CSS shorthand reverts to its initial value. This means an omission in CSS shorthand can **override previously set values**.