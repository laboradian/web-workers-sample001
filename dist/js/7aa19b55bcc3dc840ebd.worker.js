!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="./js/",n(n.s=0)}([function(e,n,t){"use strict";self.onmessage=function(){var e=new XMLHttpRequest;e.addEventListener("load",function(){var n=new FileReader;n.onload=function(){postMessage(n.result)},n.readAsDataURL(e.response)},!0),e.open("GET","../img/pc.png",!0),e.responseType="blob",e.send(null)}}]);