let temp1 = {};
const _call = Function.prototype.call;

new Promise((resolve, reject) => {
  Function.prototype.call = function (...args) {
    if (args[2]?.exports) {
      temp1 = args[6];
      Function.prototype.call = _call;
      console.log(temp1);
      resolve(temp1);
    }
    return _call.apply(this, args);
  };
}).then((result) => {
  if (Object.keys(result).length > 0) {
    activateMain(result);
  } else {
    console.log("temp1 is empty");
  }
}).catch((error) => {
  console.error("An error occurred:", error);
});

function activateMain(temp1) {
  const hack = {
    keyBindings: {
      isCPressed: false,
      cTimer: null,
      isZPressed: false,
    },
    playerMoveData: {
      lastHorizontalDirection: 1,
      isDashingDown: false,
      isDashingUp: false,
      lastDashTime: 0,
      dashDuration: 100,
      dashEndTime: 0,
      isDoubleJumpAllowed: false,
      airDashAvailable: true,
      newMovementIsOn: true
    },
    bindKeys: function () {
      document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
              const panel = document.getElementById('someData');
              const panel1 = document.getElementById('controlPanel');
                  if (panel.style.display === 'none') {
                      panel.style.display = 'inherit'; // Показываем панель
        } else {
          panel.style.display = 'none'; // Скрываем панель
                  }
                  if (panel1.style.display === 'none') {
                      panel1.style.display = 'inherit'; // Показываем панель
        } else {
          panel1.style.display = 'none'; // Скрываем панель
                  }
          }
        if (event.key.toLowerCase() === 's' && event.repeat) {
          hack.getters.me.p.mass = 3
        }
        if (event.key.toLowerCase() === 'z' && !event.repeat) {
          hack.keyBindings.isZPressed = true;
        } else if (event.repeat) {
          hack.keyBindings.isZPressed = false;
        }
        if (event.key.toLowerCase() === 'c') {
          hack.keyBindings.isCPressed = true;
          if (!hack.keyBindings.cTimer) {
            hack.keyBindings.cTimer = setTimeout(() => {
              hack.keyBindings.isCPressed = false;
              hack.keyBindings.cTimer = null;
            }, 250);
          }
        }
      })
      document.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === 's') {
          hack.getters.me.p.mass = 1
        }
        if (event.key.toLowerCase() === 'z') {
          hack.keyBindings.isZPressed = false;
        }
        if (event.key.toLowerCase() === 'c') {
          hack.keyBindings.isCPressed = false;
          if (hack.keyBindings.cTimer) {
            clearTimeout(hack.keyBindings.cTimer);
            hack.keyBindings.cTimer = null;
          }
        }
      });
    },
    getters: {
      get client() { return temp1[1].exports; },
      get gf() { return temp1[5].exports; },
      get gp() { return temp1[6].exports; },
      get graphics() { return temp1[7].exports; },
      get mode() { return temp1[11].exports; },
      get envirData() { return temp1[15].exports; },
      get rGho() { return temp1[26].exports; },
      get modules_resultScreen() { return temp1[35].exports; },
      get network() { return temp1[36].exports; },
      get physics() { return temp1[332].exports; },
      get me() { return hack.getters.mode.player.gpData; },
      get ray() { return hack.getters.me.ray; },
      get velocity() { return hack.getters.me.p.velocity; },
      get otherPlayers() { return hack.getters.mode.otherPlayers; }
    },
    vars: {
      get isGround() {return isGrounded()},
      mult: 1,
      lrSpd: 3,
      udSpd: 3,
      'POSITION INFO ':'-----------------------',
      get currentPosX() {return Math.round(hack.getters.me.getX()*100)/100},
      get currentPosY() {return Math.round(hack.getters.me.getY()*100)/100},
	  'SPEED INFO ':'----------------------------',
      get totalSpd() {return (((this.lrSpd + this.udSpd) / 2) * this.mult)},
      get currentSpdX() {return Math.round(hack.getters.me.p.velocity[0]*100)/100},
      get currentSpdY() {return Math.round(hack.getters.me.p.velocity[1]*100)/100},
	  'SCRIPT VALUES ':'----------------------',
      multSpdIsOn: false,
      modeIsOn: false,
      immIsOn: false,
      MMGIsOn: false,
      interTpToOtherIsOn: false,
      ghost1: false,
      ghost2: false,
      isPlayerDead: false,
      'MOVEMENT VALUES ':'---------------',

    },
    suppFuncs: {
      getMult: () => {
        if (hack.vars.mult < 3) {
          return 1;
        } else if (hack.vars.mult < 4) {
          return 2;
        }
      },
      setMult: function (e) {
        if (e != undefined) {
          return (hack.vars.lrSpd = hack.vars.udSpd = e);
        }
        if (hack.suppFuncs.getMult() === 1) {
          hack.vars.mult++;
        } else if (hack.suppFuncs.getMult() === 2) {
          hack.vars.mult += 2;
        } else {
          hack.vars.mult = 1;
        }
      },
      getIndexByName: function(playerName) {
        const index = hack.getters.otherPlayers.findIndex(player => player?.myName === playerName);
        return index === -1 ? false : index;
      }
    },
    functions: {
      tp: function (x, y) {
        hack.getters.me.setX(x);
        hack.getters.me.setY(y);
      },
      tpDoor: () => {
        hack.functions.tp(
          hack.getters.mode.exitGate.exitGateCounter.refP.getX(),
          hack.getters.mode.exitGate.exitGateCounter.refP.getY()
        );
      },
      tpSpawn: () => {
        hack.functions.tp(
          hack.getters.mode.spawn.refP.getX(),
          hack.getters.mode.spawn.refP.getY()
        );
      },
      setTpToOther: function (playerIndex) {
        if (!hack.vars.interTpToOtherIsOn && playerIndex !== false) {
          this.interTpToOther = setInterval(() => {
            hack.getters.me.p.position[0] = hack.getters.otherPlayers[playerIndex].gpData.p.position[0];
            hack.getters.me.p.position[1] = hack.getters.otherPlayers[playerIndex].gpData.p.position[1];
          }, 100 / 14.4);
          hack.vars.interTpToOtherIsOn = true;
        } else if (playerIndex === false) {
          try {
            clearInterval(this.interTpToOther);
            hack.vars.interTpToOtherIsOn = false;
          } catch {
            console.log('не существующий интервал');
          }
        }
      },
      MMGEnable: function () {
        hack.getters.mode.makeMeGhost = function () {
          hack.getters.me.setAlpha(0.3);
          hack.getters.me.p.shapes[0].sensor = true;
          hack.getters.me.p.gravityScale = 0;
          hack.getters.velocity[0] = 0;
          hack.getters.velocity[1] = 0;
          hack.getters.me.me = undefined;
          hack.vars.ghost2 = true;
          hack.vars.isPlayerDead = true;
          if (hack.vars.multSpdIsOn) { hack.functions.multSpdDisable(); }
          hack.getters.rGho.fire(hack.getters.network.gsSocket);
          hack.getters.mode.md.mobile() && hack.getters.mode.setupTouchButtons(true);
        };
        hack.vars.MMGIsOn = true;
      },
      MMGDisable: function () {
        hack.getters.mode.makeMeGhost = () => { };
        hack.vars.MMGIsOn = false;
      },
      immEnable: () => {
        hack.getters.me.me = undefined;
        hack.vars.immIsOn = true;
      },
      immDisable: () => {
        hack.getters.me.me = true;
        hack.vars.immIsOn = false;
      },
      godModeEnable: () => {
        hack.vars.ghost1 = true;
        hack.getters.me.p.collisionResponse = false;
        hack.getters.me.p.mass = 0;
        hack.vars.modeIsOn = true;
        hack.getters.velocity[0] = 0;
        hack.getters.velocity[1] = 0;
      },
      godModeDisable: () => {
        hack.vars.ghost1 = false;
        hack.getters.me.p.collisionResponse = true;
        hack.getters.me.p.mass = 1;
        hack.vars.modeIsOn = false;
        hack.getters.velocity[0] = 0;
        hack.getters.velocity[1] = 0;
      },
      multSpdEnable: () => {
        hack.vars.lrSpd *= hack.vars.mult;
        hack.vars.udSpd *= hack.vars.mult;
        hack.vars.multSpdIsOn = true;
      },
      multSpdDisable: () => {
        hack.vars.lrSpd /= hack.vars.mult;
        hack.vars.udSpd /= hack.vars.mult;
        hack.vars.multSpdIsOn = false;
      }
    },
    logFuncs: {
      logModeIsOn: () => {
        console.log('modeIsOn:', hack.vars.modeIsOn);
      },
      logImmIsOn: () => {
        console.log('immIsOn:', hack.vars.immIsOn);
      },
      logSpd: () => {
        console.log('speed:', ((hack.vars.lrSpd + hack.vars.udSpd) / 2) * hack.vars.mult);
      },
      logMMGIsOn: () => {
        console.log('MMGIsOn:', hack.vars.MMGIsOn);
      }
    }
  }

// Инициализация панели
document.body.insertAdjacentHTML("beforebegin", `
  <div id="someData" style="display: inherit; width: auto; position: fixed; top: 25px; left: 0px; height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px;"></div>
`);

// Функция для обновления данных
const updateData = () => {
  const o = [];
  for (let i in hack.vars) {
    o.push(`${i}: ${hack.vars[i]}`);
  }
  for (let i in hack.playerMoveData) {
    o.push(`${i}: ${hack.playerMoveData[i]}`);
  }
  document.getElementById("someData").innerHTML = o.join('<br>');
};

// Запускаем обновление данных с определенной периодичностью
setInterval(updateData, 100 / 6);


// Инициализация панели
document.body.insertAdjacentHTML("beforebegin", `
  <div id="controlPanel" style="display: inherit; width: auto; position: fixed; bottom: 0px; left: 0px; height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px;">
    <div>
      <span>new movement: </span>
      <button id="newMoveBtn" style="background: rgba(255, 255, 255, 0.7); color: black;">${hack.playerMoveData.newMovementIsOn}</button>
    </div>
    <div>
      <span>poison immunity: </span>
      <button id="immBtn" style="background: rgba(255, 255, 255, 0.7); color: black;">${hack.vars.immIsOn}</button>
    </div>
    <div>
      <span>death immunity: </span>
      <button id="MMGBtn" style="background: rgba(255, 255, 255, 0.7); color: black;">${!hack.vars.MMGIsOn}</button>
    </div>
  </div>
`);

// Функция для обновления состояния кнопок
const updateButtonStates = () => {
  document.getElementById("newMoveBtn").innerText = hack.playerMoveData.newMovementIsOn;
  document.getElementById("immBtn").innerText = hack.vars.immIsOn;
  document.getElementById("MMGBtn").innerText = !hack.vars.MMGIsOn;
};

// Обработчики для кнопок

document.getElementById("newMoveBtn").addEventListener("click", () => {
  if (!hack.playerMoveData.newMovementIsOn) {
    newMovement();
  } else {
    oldMovement();
  }
  updateButtonStates();
});

document.getElementById("immBtn").addEventListener("click", () => {
  if (hack.vars.immIsOn) {
    hack.functions.immDisable();
  } else {
    hack.functions.immEnable();
  }
  updateButtonStates();
});

document.getElementById("MMGBtn").addEventListener("click", () => {
  if (hack.vars.MMGIsOn) {
    hack.functions.MMGDisable();
  } else {
    hack.functions.MMGEnable();
  }
  updateButtonStates();
});

// Начальная установка значений кнопок
updateButtonStates();

// Запускаем обновление состояния кнопок с определенной периодичностью
setInterval(updateButtonStates, 100 / 6);

  

  hack.functions.MMGEnable();
  hack.functions.MMGDisable();

  function scrActivate() {
    hack.getters.client.loopFunctions[2].timeOut = 100 / 6;
    newMovement()
    Object.defineProperty(hack.vars, 'mult', { enumerable: false });
    Object.defineProperty(hack.vars, 'lrSpd', { enumerable: false });
    Object.defineProperty(hack.vars, 'udSpd', { enumerable: false });
    Object.defineProperty(hack.vars, 'ghost2', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'lastDashTime', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'lastHorizontalDirection', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'lastDashTime', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'dashDuration', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'dashEndTime', { enumerable: false });
    Object.defineProperty(hack.playerMoveData, 'newMovementIsOn', { enumerable: false });
    document.getElementById('timer').style.background = 'rgb(0, 0, 0)';
    document.getElementById('timer').style.color = 'rgb(255, 255, 255)';
    document.getElementById('mapCredits').style.background = 'rgb(0, 0, 0)';
    document.getElementById('mapCredits').style.color = 'rgb(255, 255, 255)';
    document.getElementById('leaderboard').style.background = 'rgb(0, 0, 0)';
    document.getElementById('timer').style.opacity = 0.7;
    document.getElementById('leaderboard').style.opacity = 0.7;
    document.getElementById('mapCredits').style.opacity = 0.7;
  }

  hack.bindKeys();

  hack.getters.mode.onChangeMap = function (e) {
    try {
      scrActivate()
      delete scrActivate;
    } catch {}
    clearInterval(hack.getters.mode.startTimeId);
    clearTimeout(hack.getters.mode.smallStepTimeId);
    hack.getters.modules_resultScreen.hideResultScreen();
    hack.getters.gp.unload(hack.getters.gp);
    hack.getters.gp.list = hack.getters.gp.load(e, hack.getters.gp);
    hack.getters.mode.syncArr = [];
    hack.getters.mode.ghost = false;
    hack.getters.mode.tweenObjects = [];
    hack.getters.mode.defineBehaviours(hack.getters.gp.list, hack.getters.mode.syncArr, hack.getters.gp);
    hack.getters.mode.md.mobile() && hack.getters.mode.setupTouchButtons(false);
    hack.getters.mode.setMyBio();
    hack.getters.mode.setBio(hack.getters.me, hack.getters.mode.myName, hack.getters.mode.mySkin, hack.getters.mode.whatBro, hack.getters.mode.chatColor, hack.getters.mode.teamColor);
    for (let n = 0; n < hack.getters.otherPlayers.length; n++) {
      if (hack.getters.otherPlayers[n]) {
        let t = hack.getters.otherPlayers[n].gpData.g.myIndex;
        hack.getters.otherPlayers[n].gpData = hack.getters.mode.createPlayer();
        hack.getters.otherPlayers[n].gpData.g.myIndex = t;
        hack.getters.gp.gWorld.removeChild(hack.getters.otherPlayers[n].gpData.g);
        hack.getters.gp.gWorld.mid.addChild(hack.getters.otherPlayers[n].gpData.g);
        hack.getters.mode.setBio(
          hack.getters.otherPlayers[n].gpData,
          hack.getters.otherPlayers[n].myName,
          hack.getters.otherPlayers[n].mySkin,
          hack.getters.otherPlayers[n].whatBro,
          hack.getters.otherPlayers[n].chatColor,
          hack.getters.otherPlayers[n].teamColor
        );
      }
    }
    hack.getters.mode.firstTimeMapChange = hack.getters.mode.firstTimeMapChange || true;
    hack.getters.mode.smallStepTimeId = setTimeout(function () {
      document.getElementById("startTime").style.display = "inherit";
      document.getElementById("startTime").innerHTML = hack.getters.mode.startTime;
      hack.getters.client.runPhysics = false;
      hack.getters.mode.startTimeId = setInterval(function () {
        hack.getters.mode.startTime++;
        document.getElementById("startTime").innerHTML = hack.getters.mode.startTime;
        if (hack.getters.mode.startTime == 3) {
          hack.getters.mode.startTime = 0;
          hack.getters.client.runPhysics = true;
          clearInterval(hack.getters.mode.startTimeId);
          document.getElementById("startTime").style.display = "none";
        }
      }, 1000);
    }, 0);
    hack.getters.me.me = true;
    if (hack.vars.modeIsOn) {
      hack.functions.godModeEnable();
    } else {
      hack.functions.godModeDisable();
    }
    if (hack.vars.immIsOn) {
      hack.functions.immEnable();
    } else {
      hack.functions.immDisable();
    }
    hack.vars.ghost2 = false;
    hack.vars.isPlayerDead = false;
  }

  document.body.onkeydown = (event) => {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case 17:
        hack.getters.mode.makeMeGhost();
        break;
      case 113:
        if (!hack.vars.modeIsOn) {
          hack.functions.godModeEnable();
          hack.logFuncs.logModeIsOn();
          hack.functions.multSpdEnable();
        } else {
          hack.functions.godModeDisable();
          hack.logFuncs.logModeIsOn();
          hack.functions.multSpdDisable();
        }
        break;
      case 36:
        hack.functions.tpSpawn();
        break;
      case 35:
        hack.functions.tpDoor();
        break;
      case 120:
        if (!hack.vars.MMGIsOn) {
          hack.functions.MMGEnable();
          hack.logFuncs.logMMGIsOn();
        } else {
          hack.functions.MMGDisable();
          hack.logFuncs.logMMGIsOn();
        }
        break;
      case 192:
      case 190:
        if (hack.vars.modeIsOn) {
          hack.suppFuncs.setMult();
          hack.logFuncs.logSpd();
        }
        break;
      case 45:
      case 96:
        hack.functions.setTpToOther(hack.suppFuncs.getIndexByName(prompt('Введите корректный никнейм. Чтобы выйти из интервала нажмите Esc.')));
        break;
      case 115:
        if (!hack.vars.immIsOn) {
          hack.functions.immEnable();
          hack.logFuncs.logImmIsOn();
        } else {
          hack.functions.immDisable();
          hack.logFuncs.logImmIsOn();
        }
        break;
    }
  }
  
function isGrounded() {
    const meX = hack.getters.me.getX();
    const meY = hack.getters.me.getY();
    const ray = hack.getters.ray; // Кешируем объект ray для избежания повторных вызовов getter
    const physics = hack.getters.physics; // Кешируем physics getter
    const gpPWorld = hack.getters.gp.pWorld; // Кешируем pWorld
    const rayResult = hack.getters.me.ray.result; // Кешируем ray.result
    const rayHitPoint = (hack.getters.ray.hitPoint = [Infinity, Infinity]);
    
    const verticalOffset = 50; // Постоянное смещение
    const checkYPosition = meY + 45; // Постоянная проверяемая позиция

    for (let i = 0; i < 121; i++) {
        const o = meX - 15 + i * (30 / 120);
        const s = checkYPosition; // Используем проверяемую позицию
        const u = s + verticalOffset; // Смещение на 50

        ray.from = [physics.xAxis(o, 0), physics.yAxis(s, 0)];
        ray.to = [physics.xAxis(o, 0), physics.yAxis(u, 0)];

        ray.update();
        rayResult.reset();

        if (gpPWorld.raycast(rayResult, ray)) {
            rayResult.getHitPoint(rayHitPoint, ray);
            const hitDistance = rayResult.getHitDistance(ray);

            if (rayResult.shape.ref.getCollision() && hitDistance < 0.1) {
                return true; // Возвращаем true сразу, без необходимости продолжать цикл
            }
        }
    }

    return false; // Если ничего не найдено, возвращаем false
}

function newMovement() {
hack.getters.client.loopFunctions[2].fun = function() {
  const currentTime = Date.now();
  const dashCooldown = 250;
  const dashDistance = 2.5;
  const dashSpeed = 25;
  const grounded = isGrounded(); // Проверка, находится ли персонаж на земле

  if (grounded) {
    hack.playerMoveData.airDashAvailable = true; // Сброс рывка в воздухе при приземлении
  }

  if (hack.getters.mode.moveLeft) {
    hack.playerMoveData.lastHorizontalDirection = -1;
  } else if (hack.getters.mode.moveRight) {
    hack.playerMoveData.lastHorizontalDirection = 1;
  }

  // Условие для рывка вниз
  if (
    hack.keyBindings.isCPressed &&
    hack.getters.mode.moveDown &&
    currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
    !hack.playerMoveData.isDashingDown &&
    (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
  ) {
    hack.playerMoveData.lastDashTime = currentTime;
    hack.playerMoveData.isDashingDown = true;
    hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
    hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    if (!grounded) {
      hack.playerMoveData.airDashAvailable = false; // Рывок в воздухе использован
    }
  }

  // Условие для рывка вверх
  if (
    hack.keyBindings.isCPressed &&
    hack.getters.mode.moveUp &&
    currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
    !hack.playerMoveData.isDashingUp &&
    (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
  ) {
    hack.playerMoveData.lastDashTime = currentTime;
    hack.playerMoveData.isDashingUp = true;
    hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
    hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    if (!grounded) {
      hack.playerMoveData.airDashAvailable = false;
    }
  }

  // Условие для горизонтального рывка
  if (
    hack.keyBindings.isCPressed &&
    currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
    !hack.playerMoveData.isDashing &&
    (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
  ) {
    hack.playerMoveData.lastDashTime = currentTime;
    hack.playerMoveData.isDashing = true;
    hack.playerMoveData.dashVelocity = dashSpeed * hack.playerMoveData.lastHorizontalDirection;
    hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
    hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    if (!grounded) {
      hack.playerMoveData.airDashAvailable = false;
    }
  }

  // Обработка рывка вниз
  if (hack.playerMoveData.isDashingDown) {
    hack.getters.mode.player.gpData.p.velocity[1] = -dashSpeed;
    hack.getters.mode.player.gpData.p.velocity[0] = 0;
    hack.getters.me.p.collisionResponse = false;
    if (currentTime >= hack.playerMoveData.dashEndTime) {
      hack.playerMoveData.isDashingDown = false;
      hack.getters.mode.player.gpData.p.velocity[1] = 0;
      if (!hack.vars.modeIsOn) {
        hack.getters.me.p.collisionResponse = true;
      }
    }
    return;
  }

  // Обработка рывка вверх
  if (hack.playerMoveData.isDashingUp) {
    hack.getters.mode.player.gpData.p.velocity[1] = dashSpeed;
    hack.getters.mode.player.gpData.p.velocity[0] = 0;
    hack.getters.me.p.collisionResponse = false;
    if (currentTime >= hack.playerMoveData.dashEndTime) {
      hack.playerMoveData.isDashingUp = false;
      hack.getters.mode.player.gpData.p.velocity[1] = 0;
      if (!hack.vars.modeIsOn) {
        hack.getters.me.p.collisionResponse = true;
      }
    }
    return;
  }

  // Обработка горизонтального рывка
  if (hack.playerMoveData.isDashing) {
    hack.getters.mode.player.gpData.p.velocity[0] = hack.playerMoveData.dashVelocity;
    hack.getters.mode.player.gpData.p.velocity[1] = 0;
    hack.getters.me.p.collisionResponse = false;
    if (currentTime >= hack.playerMoveData.dashEndTime) {
      hack.playerMoveData.isDashing = false;
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
      if (!hack.vars.modeIsOn) {
        hack.getters.me.p.collisionResponse = true;
      }
    }
    return;
  } else {
    if (hack.getters.mode.moveRight) {
      hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult;
    } else if (hack.getters.mode.moveLeft) {
      hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult;
    } else {
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
    }
  }

  // Обработка прыжков
  if (grounded) {
    hack.playerMoveData.isDoubleJumpAllowed = true;
    if (hack.keyBindings.isZPressed) {
      hack.keyBindings.isZPressed = false;
      hack.getters.velocity[1] = 8*(hack.getters.me.p.gravityScale)
    }
  } else if (hack.playerMoveData.isDoubleJumpAllowed && hack.keyBindings.isZPressed) {
    hack.keyBindings.isZPressed = false;
    hack.getters.velocity[1] = 8*(hack.getters.me.p.gravityScale)
    hack.playerMoveData.isDoubleJumpAllowed = false;
  }

  // Дополнительная логика для призрачного режима
  if (hack.vars.ghost1 || hack.vars.ghost2) {
    if (hack.getters.mode.moveUp) {
      hack.getters.velocity[1] = hack.vars.udSpd * hack.vars.mult;
    }
    if (hack.getters.mode.moveDown) {
      hack.getters.velocity[1] = -hack.vars.udSpd * hack.vars.mult;
    }
    if (!hack.getters.mode.moveUp && !hack.getters.mode.moveDown) {
      hack.getters.velocity[1] = 0;
    }
  }
}
hack.playerMoveData.newMovementIsOn = true}
  
function oldMovement() {
    hack.getters.client.loopFunctions[2].fun = function() {
    const grounded = isGrounded()

    if (hack.getters.mode.moveRight) {
      hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult;
    } else if (hack.getters.mode.moveLeft) {
      hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult;
    } else {
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
    }
  if (grounded) {
    if (hack.getters.mode.moveUp) {
      hack.getters.velocity[1] = 8
    }
  }
  if (hack.vars.ghost1 || hack.vars.ghost2) {
    if (hack.getters.mode.moveUp) {
      hack.getters.velocity[1] = hack.vars.udSpd * hack.vars.mult;
    }
    if (hack.getters.mode.moveDown) {
      hack.getters.velocity[1] = -hack.vars.udSpd * hack.vars.mult;
    }
    if (!hack.getters.mode.moveUp && !hack.getters.mode.moveDown) {
      hack.getters.velocity[1] = 0;
    }
  }
  }
hack.playerMoveData.newMovementIsOn = false}
}
