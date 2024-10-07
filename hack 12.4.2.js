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
    },
    bindKeys: function () {
      document.addEventListener('keydown', function (event) {
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
      });
      document.addEventListener('keyup', function (event) {
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
      isGround: true,
      mult: 1,
      lrSpd: 3,
      udSpd: 3,
      'POSITION INFO ':'-----------------------',
      get currentPosX() {return Math.round(hack.getters.me.getX()*100)/100},
      get currentPosY() {return Math.round(hack.getters.me.getY()*100)/100},
	  'SPEED INFO ':'--------------------------',
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
      getIndexByName: function (playerName) {
        for (let i = 0; i < hack.getters.otherPlayers.length; i++) {
          if (hack.getters.otherPlayers[i]?.myName == playerName) {
            return i;
          }
        }
        return false;
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
  };

  setInterval(() => {
    const o = [];
    for (let i in hack.vars) {
      o.push(`${i}: ${hack.vars[i]}`);
    }
    for (let i in hack.playerMoveData) {
      o.push(`${i}: ${hack.playerMoveData[i]}`);
    }
    document.getElementById("someData").innerHTML = o.join('<br>');
  }, 100 / 6);

  document.body.insertAdjacentHTML("beforebegin", `
    <div id="someData" style="display:inherit;width: 100%; position: fixed;top: 25px;left: 0px;width: auto;height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px;"></div>
  `);

  hack.functions.MMGEnable();
  hack.functions.MMGDisable();

  function scrActivate() {
    hack.getters.client.loopFunctions[2].timeOut = 100 / 6;
    Object.defineProperty(hack.vars, 'mult', { enumerable: false });
    Object.defineProperty(hack.vars, 'lrSpd', { enumerable: false });
    Object.defineProperty(hack.vars, 'udSpd', { enumerable: false });
    Object.defineProperty(hack.vars, 'ghost2', { enumerable: false });
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
  };

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
  };

  function isGrounded() {
    hack.vars.isGround = false;
    for (let i = 0; i < 12; i++) {
      const o = hack.getters.me.getX() - 15 + i * (30 / 11);
      const s = hack.getters.me.getY() + 49;
      hack.getters.ray.from = [hack.getters.physics.xAxis(o, 0), hack.getters.physics.yAxis(s, 0)];
      hack.getters.ray.to = [hack.getters.physics.xAxis(o, 0), hack.getters.physics.yAxis(s + 1, 0)];
      hack.getters.ray.update();
      hack.getters.ray.result.reset();
      hack.getters.ray.hitPoint = [Infinity, Infinity];
      if (hack.getters.gp.pWorld.raycast(hack.getters.ray.result, hack.getters.ray)) {
        hack.getters.ray.result.getHitPoint(hack.getters.ray.hitPoint, hack.getters.ray);
        const distance = hack.getters.ray.result.getHitDistance(hack.getters.ray);
        if (hack.getters.ray.result.shape.ref.getCollision() && distance < 0.05) {
          hack.vars.isGround = true;
          break;
        }
      }
    }
    return hack.vars.isGround;
  }

  hack.getters.mode.playerMovement = function () {
    const currentTime = Date.now();
    const dashCooldown = 250;
    const dashDistance = 2.5;
    const dashSpeed = 25;

    if (hack.getters.mode.moveLeft) {
      hack.playerMoveData.lastHorizontalDirection = -1;
    } else if (hack.getters.mode.moveRight) {
      hack.playerMoveData.lastHorizontalDirection = 1;
    }

    if (hack.keyBindings.isCPressed && hack.getters.mode.moveDown && currentTime - hack.playerMoveData.lastDashTime >= dashCooldown && !hack.playerMoveData.isDashing) {
      hack.playerMoveData.lastDashTime = currentTime;
      hack.playerMoveData.isDashingDown = true;
      hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
      hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    }

    if (hack.keyBindings.isCPressed && hack.getters.mode.moveUp && currentTime - hack.playerMoveData.lastDashTime >= dashCooldown && !hack.playerMoveData.isDashing) {
      hack.playerMoveData.lastDashTime = currentTime;
      hack.playerMoveData.isDashingUp = true;
      hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
      hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    }

    if (hack.keyBindings.isCPressed && currentTime - hack.playerMoveData.lastDashTime >= dashCooldown && !hack.playerMoveData.isDashing) {
      hack.playerMoveData.lastDashTime = currentTime;
      hack.playerMoveData.isDashing = true;
      hack.playerMoveData.dashVelocity = dashSpeed * hack.playerMoveData.lastHorizontalDirection;
      hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000;
      hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration;
    }

    if (hack.playerMoveData.isDashingDown) {
      hack.getters.mode.player.gpData.p.velocity[1] = -dashSpeed;
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
      hack.getters.me.p.collisionResponse = false;
      if (currentTime >= hack.playerMoveData.dashEndTime) {
        hack.playerMoveData.isDashingDown = false;
        hack.getters.mode.player.gpData.p.velocity[1] = 0;
        if (!hack.vars.modeIsOn) { hack.getters.me.p.collisionResponse = true; }
      } return;
    }

    if (hack.playerMoveData.isDashingUp) {
      hack.getters.mode.player.gpData.p.velocity[1] = dashSpeed;
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
      hack.getters.me.p.collisionResponse = false;
      if (currentTime >= hack.playerMoveData.dashEndTime) {
        hack.playerMoveData.isDashingUp = false;
        hack.getters.mode.player.gpData.p.velocity[1] = 0;
        if (!hack.vars.modeIsOn) { hack.getters.me.p.collisionResponse = true; }
      } return;
    }

    if (hack.playerMoveData.isDashing) {
      hack.getters.mode.player.gpData.p.velocity[0] = hack.playerMoveData.dashVelocity;
      hack.getters.mode.player.gpData.p.velocity[1] = 0;
      hack.getters.me.p.collisionResponse = false;
      if (currentTime >= hack.playerMoveData.dashEndTime) {
        hack.playerMoveData.isDashing = false;
        hack.getters.mode.player.gpData.p.velocity[0] = 0;
        if (!hack.vars.modeIsOn) { hack.getters.me.p.collisionResponse = true; }
      } return;
    } else {
      if (hack.getters.mode.moveRight) {
        hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult;
      } else if (hack.getters.mode.moveLeft) {
        hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult;
      } else {
        hack.getters.mode.player.gpData.p.velocity[0] = 0;
      }
    }

    if (isGrounded()) {
      hack.playerMoveData.isDoubleJumpAllowed = true;
      if (hack.keyBindings.isZPressed) {
        hack.keyBindings.isZPressed = false;
        hack.getters.velocity[1] = 8;
      }
    } else if (!isGrounded() && hack.playerMoveData.isDoubleJumpAllowed && hack.keyBindings.isZPressed) {
      hack.keyBindings.isZPressed = false;
      hack.getters.velocity[1] = 8;
      hack.playerMoveData.isDoubleJumpAllowed = false;
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
  };
}
