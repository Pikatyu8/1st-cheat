const _call = Function.prototype.call;

const getTemp1 = new Promise((resolve, reject) => {
  Function.prototype.call = function (...args) {
    if (args[2]?.exports) {
      Function.prototype.call = _call;
      resolve(args[6]);
    }
    return _call.apply(this, args);
  };
});

getTemp1.then(activateMain).catch(console.error);

function activateMain(temp1) {
  const hack = {
    keyBindings: {
      isCPressed: false,
      cTimer: null,
      isZPressed: false,
      zTimer: null,
      zCooldown: 100,
    },
    bindKeys: function () {
      const handleKeyDown = (event) => {
        const key = event.key.toLowerCase();
        if (key === 'c') {
          this.isCPressed = true;
          if (!this.cTimer) {
            this.cTimer = setTimeout(() => {
              this.isCPressed = false;
              this.cTimer = null;
            }, 250);
          }
        }
        if (key === 'z' && !this.isZPressed && !this.zTimer) {
          this.isZPressed = true;
          this.zTimer = setTimeout(() => {
            this.isZPressed = false;
            this.zTimer = null;
          }, this.zCooldown);
        }
      };
      const handleKeyUp = (event) => {
        const key = event.key.toLowerCase();
        if (key === 'c') {
          this.isCPressed = false;
          if (this.cTimer) {
            clearTimeout(this.cTimer);
            this.cTimer = null;
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown.bind(this.keyBindings));
      document.addEventListener('keyup', handleKeyUp.bind(this.keyBindings));
    },
    getters: {
      client: () => temp1[1].exports,
      gf: () => temp1[5].exports,
      gp: () => temp1[6].exports,
      graphics: () => temp1[7].exports,
      guiComponents_afk: () => temp1[8].exports,
      guiComponents_kick: () => temp1[9].exports,
      mode: () => temp1[11].exports,
      envirData: () => temp1[15].exports,
      kickPlayer: () => temp1[17].exports,
      myStatus: () => temp1[20].exports,
      othersPlayerData: () => temp1[23].exports,
      othersPlayerMsg: () => temp1[24].exports,
      rGho: () => temp1[26].exports,
      timer: () => temp1[28].exports,
      modules_leaderboard: () => temp1[32].exports,
      modules_resultScreen: () => temp1[35].exports,
      network: () => temp1[36].exports,
      jquery: () => temp1[69].exports,
      physics: () => temp1[332].exports,
      get me() { return this.mode.player.gpData; },
      get ray() { return this.me.ray; },
      get velocity() { return this.me.p.velocity; },
      get otherPlayers() { return this.mode.otherPlayers; },
    },
    vars: {
      mult: 1,
      lrSpd: 3,
      udSpd: 3,
      'POSITION INFO ': '-----------------------',
      get currentPosX() { return Math.round(this.me.getX() * 100) / 100; },
      get currentPosY() { return Math.round(this.me.getY() * 100) / 100; },
      'SPEED INFO ': '--------------------------',
      get totalSpd() { return (((this.lrSpd + this.udSpd) / 2) * this.mult); },
      get currentSpdX() { return Math.round(this.me.p.velocity[0] * 100) / 100; },
      get currentSpdY() { return Math.round(this.me.p.velocity[1] * 100) / 100; },
      'SCRIPT VALUES ': '----------------------',
      multSpdIsOn: false,
      modeIsOn: false,
      immIsOn: false,
      MMGIsOn: false,
      interTpToOtherIsOn: false,
      ghost1: false,
      ghost2: false,
      delay: 1000,
      inter: 250,
      'IN GAME VALUES ': '--------------------',
      isPlayerDead: false,
      get mass() { return this.me.p.mass; },
      get collisionResponse() { return this.me.p.collisionResponse; },
    },
    suppFuncs: {
      getMult: () => {
        if (hack.vars.mult < 3) return 1;
        if (hack.vars.mult < 4) return 2;
        return undefined; // Or handle the case where mult >= 4
      },
      setMult: (e) => {
        if (e !== undefined) return (hack.vars.lrSpd = hack.vars.udSpd = e);
        if (hack.suppFuncs.getMult() === 1) {
          hack.vars.mult++;
        } else if (hack.suppFuncs.getMult() === 2) {
          hack.vars.mult += 2;
        } else {
          hack.vars.mult = 1;
        }
        return undefined; // Or handle the case where getMult() returns undefined
      },
      getIndexByName: (playerName) => {
        for (let i = 0; i < hack.getters.otherPlayers.length; i++) {
          if (hack.getters.otherPlayers[i]?.myName === playerName) return i;
        }
        return false;
      },
    },
    functions: {
      tp: (x, y) => {
        hack.getters.me.setX(x);
        hack.getters.me.setY(y);
      },
      tpDoor: () => hack.functions.tp(
        hack.getters.mode.exitGate.exitGateCounter.refP.getX(),
        hack.getters.mode.exitGate.exitGateCounter.refP.getY(),
      ),
      tpSpawn: () => hack.functions.tp(
        hack.getters.mode.spawn.refP.getX(),
        hack.getters.mode.spawn.refP.getY(),
      ),
      setTpToOther: (playerIndex) => {
        if (!hack.vars.interTpToOtherIsOn && playerIndex !== false) {
          // Using !== false instead of just playerIndex 
          // because 0 is a valid index but is falsy
          hack.vars.interTpToOtherIsOn = true;
          hack.vars.interTpToOther = setInterval(() => {
            hack.getters.me.p.position[0] = hack.getters.otherPlayers[playerIndex].gpData.p.position[0];
            hack.getters.me.p.position[1] = hack.getters.otherPlayers[playerIndex].gpData.p.position[1];
          }, hack.vars.inter);
        } else if (playerIndex === false) {
          try {
            clearInterval(hack.vars.interTpToOther);
            hack.vars.interTpToOtherIsOn = false;
          } catch (error) {
            console.log('не существующий интервал');
          }
        }
      },
      MMGEnable: () => {
        hack.getters.mode.makeMeGhost = () => {
          hack.getters.me.setAlpha(0.3);
          hack.getters.me.p.shapes[0].sensor = true;
          hack.getters.me.p.gravityScale = 0;
          hack.getters.velocity[0] = 0;
          hack.getters.velocity[1] = 0;
          hack.getters.me.me = undefined;
          hack.vars.ghost2 = true;
          hack.vars.isPlayerDead = true;
          if (hack.vars.multSpdIsOn) hack.functions.multSpdDisable();
          hack.getters.rGho.fire(hack.getters.network.gsSocket);
          hack.getters.mode.md.mobile() && hack.getters.mode.setupTouchButtons(true);
        };
        hack.vars.MMGIsOn = true;
      },
      MMGDisable: () => {
        hack.getters.mode.makeMeGhost = () => {};
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
      },
    },
    logFuncs: {
      logModeIsOn: () => console.log('modeIsOn:', hack.vars.modeIsOn),
      logImmIsOn: () => console.log('immIsOn:', hack.vars.immIsOn),
      logSpd: () => console.log('speed:', ((hack.vars.lrSpd + hack.vars.udSpd) / 2) * hack.vars.mult),
      logMMGIsOn: () => console.log('MMGIsOn:', hack.vars.MMGIsOn),
      logAll: () => {
        hack.logFuncs.logModeIsOn();
        hack.logFuncs.logImmIsOn();
        hack.logFuncs.logSpd();
        hack.logFuncs.logMMGIsOn();
      },
      logVars: () => {
        for (const i in hack.vars) {
          console.log(`${i}:`, hack.vars[i]);
        }
      },
      logDisable: () => {
        for (const i in hack.logFuncs) {
          hack.logFuncs[i] = () => {};
        }
      },
    },
  };

  function scrActivate() {
    for (const prop of ['inter', 'delay', 'mult', 'lrSpd', 'udSpd', 'ghost2']) {
      Object.defineProperty(hack.vars, prop, { enumerable: false });
    }
    hack.functions.MMGEnable();
    hack.functions.MMGDisable();
    setInterval(() => {
      const o = Object.entries(hack.vars).map(([key, value]) => `${key}: ${value}`);
      document.getElementById('someData').innerHTML = o.join('<br>');
    }, 100);
    document.body.insertAdjacentHTML('beforebegin', `
      <div id="someData" style="display:inherit;width: 100%; position: fixed;top: 25px;left: 0px;width: auto;height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px; display: inherit;"></div>
    `);
    const styleElements = ['timer', 'mapCredits', 'leaderboard'];
    styleElements.forEach((el) => {
      document.getElementById(el).style.background = 'rgb(0, 0, 0)';
      document.getElementById(el).style.color = 'rgb(255, 255, 255)';
      document.getElementById(el).style.opacity = 0.7;
    });
  }

  hack.bindKeys();

  hack.getters.mode.onChangeMap = function (e) {
    try {
      scrActivate();
      delete scrActivate;
    } catch (error) {} // Ignore errors during scrActivate
    clearInterval(this.startTimeId);
    clearTimeout(this.smallStepTimeId);
    hack.getters.modules_resultScreen.hideResultScreen();
    e = e; // Reassigning e doesn't seem necessary
    hack.getters.gp.unload(hack.getters.gp);
    hack.getters.gp.list = hack.getters.gp.load(e, hack.getters.gp);
    this.syncArr = [];
    this.ghost = false;
    this.tweenObjects = [];
    this.defineBehaviours(hack.getters.gp.list, this.syncArr, hack.getters.gp);
    this.md.mobile() && this.setupTouchButtons(false);
    this.setMyBio();
    this.setBio(
      hack.getters.me,
      this.myName,
      this.mySkin,
      this.whatBro,
      this.chatColor,
      this.teamColor,
    );
    for (let n = 0; n < hack.getters.otherPlayers.length; n++) {
      if (hack.getters.otherPlayers[n] != null) {
        const t = hack.getters.otherPlayers[n].gpData.g.myIndex;
        hack.getters.otherPlayers[n].gpData = this.createPlayer();
        hack.getters.otherPlayers[n].gpData.g.myIndex = t;
        hack.getters.gp.gWorld.removeChild(hack.getters.otherPlayers[n].gpData.g);
        hack.getters.gp.gWorld.mid.addChild(hack.getters.otherPlayers[n].gpData.g);
        this.setBio(
          hack.getters.otherPlayers[n].gpData,
          hack.getters.otherPlayers[n].myName,
          hack.getters.otherPlayers[n].mySkin,
          hack.getters.otherPlayers[n].whatBro,
          hack.getters.otherPlayers[n].chatColor,
          hack.getters.otherPlayers[n].teamColor,
        );
      }
    }

    if (this.firstTimeMapChange === undefined) this.firstTimeMapChange = true;
    this.smallStepTimeId = setTimeout(() => {
      document.getElementById('startTime').style.display = 'inherit';
      document.getElementById('startTime').innerHTML = this.startTime;
      hack.getters.client.runPhysics = false;
      this.startTimeId = setInterval(() => {
        this.startTime++;
        document.getElementById('startTime').innerHTML = this.startTime;
        if (this.startTime === 3) {
          this.startTime = 0;
          hack.getters.client.runPhysics = true;
          clearInterval(this.startTimeId);
          document.getElementById('startTime').style.display = 'none';
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
      default:
        break; // Add a default case to avoid unintended behavior
    }
  };

  hack.getters.mode.playerMovement = function (e) {
    const currentTime = Date.now();
    const dashCooldown = 600;
    const dashDistance = 2.5;
    const dashSpeed = 35;
    if (!hack.playerDirection) hack.playerDirection = {};

    if (this.moveLeft) {
      hack.playerDirection.lastHorizontalDirection = -1;
    } else if (this.moveRight) {
      hack.playerDirection.lastHorizontalDirection = 1;
    }

    if (
      hack.keyBindings.isCPressed
      && currentTime - (hack.playerDirection.lastDashTime || 0) >= dashCooldown
      && !hack.playerDirection.isDashing
    ) {
      hack.playerDirection.lastDashTime = currentTime;
      hack.playerDirection.dashStartPosition = hack.getters.me.getX();
      hack.playerDirection.isDashing = true;
      hack.playerDirection.dashVelocity = dashSpeed * hack.playerDirection.lastHorizontalDirection;
      hack.playerDirection.dashDuration = (dashDistance / dashSpeed) * 1000;
      hack.playerDirection.dashEndTime = currentTime + hack.playerDirection.dashDuration;
    }

    if (hack.playerDirection.isDashing) {
      hack.getters.mode.player.gpData.p.velocity[0] = hack.playerDirection.dashVelocity;
      hack.getters.mode.player.gpData.p.velocity[1] = 0;
      if (currentTime >= hack.playerDirection.dashEndTime) {
        hack.playerDirection.isDashing = false;
        hack.getters.mode.player.gpData.p.velocity[0] = 0;
      }
      return;
    }

    if (this.moveRight) {
      hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult;
    } else if (this.moveLeft) {
      hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult;
    } else {
      hack.getters.mode.player.gpData.p.velocity[0] = 0;
    }

    function isGrounded() {
      for (let i = 0; i < 12; i++) {
        const o = hack.getters.me.getX() - 15 + i * (30 / 11);
        const s = hack.getters.me.getY() + 49;
        hack.getters.ray.from = [hack.getters.physics.xAxis(o, 0), hack.getters.physics.yAxis(s, 0)];
        hack.getters.ray.to = [hack.getters.physics.xAxis(o, 0), hack.getters.physics.yAxis(s + 50, 0)];
        // enableRay code removed for brevity 
        hack.getters.ray.update();
        hack.getters.ray.result.reset();
        hack.getters.ray.hitPoint = [Infinity, Infinity];
        if (hack.getters.gp.pWorld.raycast(hack.getters.ray.result, hack.getters.ray)) {
          hack.getters.ray.result.getHitPoint(hack.getters.ray.hitPoint, hack.getters.ray);
          const distance = hack.getters.ray.result.getHitDistance(hack.getters.ray);
          if (hack.getters.ray.result.shape.ref.getCollision() && distance < 0.1) return true;
        }
      }
      return false;
    }

    if (isGrounded()) {
      hack.playerDirection.jumps = 0;
      if (hack.keyBindings.isZPressed || this.moveUp) {
        hack.getters.velocity[1] = 8;
        hack.keyBindings.isZPressed = false;
      }
    } else if (!isGrounded() && hack.playerDirection.jumps < 1 && hack.keyBindings.isZPressed) {
      hack.getters.velocity[1] = 8;
      hack.playerDirection.jumps++;
      hack.keyBindings.isZPressed = false;
    }

    if (hack.vars.ghost1 || hack.vars.ghost2) {
      if (this.moveUp) {
        hack.getters.velocity[1] = hack.vars.udSpd * hack.vars.mult;
      } else if (this.moveDown) {
        hack.getters.velocity[1] = -hack.vars.udSpd * hack.vars.mult;
      } else {
        hack.getters.velocity[1] = 0;
      }
    }
  };
}
