// ==UserScript==
// @name         WASD tp powered by ARCH
// @namespace    http://tampermonkey.net/
// @version      2024-10-09
// @description  try to take over the world!
// @author       You
// @match        http://brofist.io/beta/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=brofist.io
// @grant        none
// ==/UserScript==

var c = Function.prototype.call;

Function.prototype.call = function(...a) {
    a[0]?.[0]?._name == 'Ref' && cinop(a[0][0]._components[0]?.mapManager);
    return c.apply(this, a);
};

function cinop(temp1) {
    document.body.onkeydown = (event) => {
    if (event.key.toLowerCase() == 'a') {
      temp1.characters[0].node.setPosition(temp1.characters[0].node.getPosition().x-300,
        temp1.characters[0].node.getPosition().y,0
      )
    }
    if (event.key.toLowerCase() == 'w') {
      temp1.characters[0].node.setPosition(temp1.characters[0].node.getPosition().x,
        temp1.characters[0].node.getPosition().y+300,0
      )
    }
    if (event.key.toLowerCase() == 'd') {
      temp1.characters[0].node.setPosition(temp1.characters[0].node.getPosition().x+300,
        temp1.characters[0].node.getPosition().y,0
      )
    }
    if (event.key.toLowerCase() == 's') {
      temp1.characters[0].node.setPosition(temp1.characters[0].node.getPosition().x,
        temp1.characters[0].node.getPosition().y-300,0
        )
    }
}
}
