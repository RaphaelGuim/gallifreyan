function keyReleased(evt) {
  pressed.delete(evt.keyCode);
}

function keyPressed(evt) {
  const { keyCode } = evt;
  if (keyCode == 27) {
    selected = null;
  }
  if (!pressed.has(keyCode)) {
    pressed.add(keyCode);
  }
}

function moveParent() {
  let velocity = 5;
  if ([UP_ARROW, 87].find((code) => pressed.has(code))) {
    originParent.position.y -= velocity;
  }
  if ([DOWN_ARROW, 83].find((code) => pressed.has(code))) {
    originParent.position.y += velocity;
  }
  if ([LEFT_ARROW, 65].find((code) => pressed.has(code))) {
    originParent.position.x -= velocity;
  }
  if ([RIGHT_ARROW, 68].find((code) => pressed.has(code))) {
    originParent.position.x += velocity;
  }
}
