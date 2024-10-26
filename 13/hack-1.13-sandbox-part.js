function activateMain(temp1) {
  const hack = {
    keyBindings: {
      isCPressed: false,
      cTimer: null,
      isZPressed: false
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
          const panel = document.getElementById('someData')
          const panel1 = document.getElementById('controlPanel')
          if (panel.style.display === 'none') {
            panel.style.display = 'inherit'
          } else {
            panel.style.display = 'none'
          }
          if (panel1.style.display === 'none') {
            panel1.style.display = 'inherit'
          } else {
            panel1.style.display = 'none'
          }
        }
        if (event.key.toLowerCase() === 's' && event.repeat) {
          if (!hack.vars.modeIsOn) {
            hack.getters.me.p.mass = 3
          }
        }
        if (event.key.toLowerCase() === 'z' && !event.repeat) {
          hack.keyBindings.isZPressed = true
        } else if (event.repeat) {
          hack.keyBindings.isZPressed = false
        }
        if (event.key.toLowerCase() === 'c') {
          hack.keyBindings.isCPressed = true
          if (!hack.keyBindings.cTimer) {
            hack.keyBindings.cTimer = setTimeout(() => {
              hack.keyBindings.isCPressed = false
              hack.keyBindings.cTimer = null
            }, 250)
          }
        }
      })
      document.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === 's') {
          if (!hack.vars.modeIsOn) {
            hack.getters.me.p.mass = 1
          }
        }
        if (event.key.toLowerCase() === 'z') {
          hack.keyBindings.isZPressed = false
        }
        if (event.key.toLowerCase() === 'c') {
          hack.keyBindings.isCPressed = false
          if (hack.keyBindings.cTimer) {
            clearTimeout(hack.keyBindings.cTimer)
            hack.keyBindings.cTimer = null
          }
        }
      })
    },
    getters: {
      get client() { return temp1[1].exports },
      get gf() { return temp1[5].exports },
      get gp() { return temp1[6].exports },
      get graphics() { return temp1[7].exports },
      get mode() { return temp1[11].exports },
      get envirData() { return temp1[16].exports },
      get network() { return temp1[29].exports },
      get physics() { return temp1[325].exports },
      get ray() { return this.mode.player.gpData.ray },
      get velocity() { return this.mode.player.gpData.p.velocity },
      get otherPlayers() { return this.mode.otherPlayers },
      ghost: false,
      get me() { return hack.getters.mode.player.gpData },
      get ray() { return hack.getters.me.ray },
      get velocity() { return hack.getters.me.p.velocity },
      get otherPlayers() { return hack.getters.mode.otherPlayers }
    },
    vars: {
      get isGround() { return isGrounded() },
      mult: 1,
      lrSpd: 3,
      udSpd: 3,
      'POSITION INFO ': '-----------------------',
      get currentPosX() { return Math.round(hack.getters.me.getX() * 100) / 100 },
      get currentPosY() { return Math.round(hack.getters.me.getY() * 100) / 100 },
      'SPEED INFO ': '----------------------------',
      get totalSpd() { return (((this.lrSpd + this.udSpd) / 2) * this.mult) },
      get currentSpdX() { return Math.round(hack.getters.me.p.velocity[0] * 100) / 100 },
      get currentSpdY() { return Math.round(hack.getters.me.p.velocity[1] * 100) / 100 },
      'SCRIPT VALUES ': '----------------------',
      multSpdIsOn: false,
      modeIsOn: false,
      ghost1: false,
      'MOVEMENT VALUES ': '---------------'
    },
    suppFuncs: {
      getMult: () => {
        if (hack.vars.mult < 3) {
          return 1
        } else if (hack.vars.mult < 4) {
          return 2
        }
      },
      setMult: function (e) {
        if (e != undefined) {
          return (hack.vars.lrSpd = hack.vars.udSpd = e)
        }
        if (hack.suppFuncs.getMult() === 1) {
          hack.vars.mult++
        } else if (hack.suppFuncs.getMult() === 2) {
          hack.vars.mult += 2
        } else {
          hack.vars.mult = 1
        }
      },
      getIndexByName: function (playerName) {
        const index = hack.getters.otherPlayers.findIndex(player => player?.myName === playerName)
        return index === -1 ? false : index
      }
    },
    functions: {
      godModeEnable: () => {
        hack.vars.ghost1 = true
        hack.getters.me.p.collisionResponse = false
        hack.getters.me.p.mass = 0
        hack.vars.modeIsOn = true
        hack.getters.velocity[0] = 0
        hack.getters.velocity[1] = 0
      },
      godModeDisable: () => {
        hack.vars.ghost1 = false
        hack.getters.me.p.collisionResponse = true
        hack.getters.me.p.mass = 1
        hack.vars.modeIsOn = false
        hack.getters.velocity[0] = 0
        hack.getters.velocity[1] = 0
      },
      multSpdEnable: () => {
        hack.vars.lrSpd *= hack.vars.mult
        hack.vars.udSpd *= hack.vars.mult
        hack.vars.multSpdIsOn = true
      },
      multSpdDisable: () => {
        hack.vars.lrSpd /= hack.vars.mult
        hack.vars.udSpd /= hack.vars.mult
        hack.vars.multSpdIsOn = false
      }
    },
    logFuncs: {
      logModeIsOn: () => {
        console.log('modeIsOn:', hack.vars.modeIsOn)
      },
      logSpd: () => {
        console.log('speed:', ((hack.vars.lrSpd + hack.vars.udSpd) / 2) * hack.vars.mult)
      }
    }
  }


  
  document.body.insertAdjacentHTML("beforebegin", `
  <div id="someData" style="display: inherit; width: auto; position: fixed; top: 0px; left: 0px; height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px;"></div>
`)

  const updateData = () => {
    const o = []
    for (let i in hack.vars) {
      o.push(`${i}: ${hack.vars[i]}`)
    }
    for (let i in hack.playerMoveData) {
      o.push(`${i}: ${hack.playerMoveData[i]}`)
    }
    document.getElementById("someData").innerHTML = o.join('<br>')
  }

  document.body.insertAdjacentHTML("beforebegin", `
  <div id="controlPanel" style="display: inherit; width: auto; position: fixed; bottom: 0px; left: 0px; height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px;">
    <div>
      <span>new movement: </span>
      <button id="newMoveBtn" style="background: rgba(255, 255, 255, 0.7); color: black;">${hack.playerMoveData.newMovementIsOn}</button>
    </div>
  </div>
`)

  const updateButtonStates = () => {
    document.getElementById("newMoveBtn").innerText = hack.playerMoveData.newMovementIsOn
  }

  document.getElementById("newMoveBtn").addEventListener("click", () => {
    if (!hack.playerMoveData.newMovementIsOn) {
      newMovement()
    } else {
      oldMovement()
    }
    updateButtonStates()
  })


  setInterval(updateData, 100 / 6)
  updateButtonStates()
  setInterval(updateButtonStates, 100 / 6)
  hack.bindKeys()

  let scrActivate = function () {
    hack.getters.client.loopFunctions[2].timeOut = 100 / 6
    hack.getters.client.loopFunctions[3].timeOut = 0
    oldMovement()
    Object.defineProperty(hack.vars, 'mult', { enumerable: false })
    Object.defineProperty(hack.vars, 'lrSpd', { enumerable: false })
    Object.defineProperty(hack.vars, 'udSpd', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'lastDashTime', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'lastHorizontalDirection', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'lastDashTime', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'dashDuration', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'dashEndTime', { enumerable: false })
    Object.defineProperty(hack.playerMoveData, 'newMovementIsOn', { enumerable: false })
  }


  hack.getters.client.findUntilFound = function (e, t, n) {
    hack.getters.network.gsip = e;
    hack.getters.network.gsrn = t;
    hack.getters.network.getSID?.((sid) => {
      hack.getters.network.sid = sid;
      hack.getters.network.connectToGs?.(hack.getters.network.gsip, () => {
        console.log("connected to gs");

        hack.getters.client.verifyIsHuman?.(() => {
          hack.getters.network.registerSidOnGs?.((verifyStatus) => {
            console.log("verified on gs server", verifyStatus);

            if (verifyStatus === "") {
              alert("You are already playing the game in another browser tab.");
              location.reload();
              n(2);
            } else {
              hack.getters.network.joinRoom?.(hack.getters.network.gsrn, (joinStatus) => {
                if (joinStatus === 1) {
                  hack.getters.client.sendPlayingInfo?.(hack.getters.client.roomId, () => {
                    hack.getters.client.onReady?.();
                    n(1);
                    scrActivate()
                  });
                } else {
                  console.log("else");
                  hack.getters.network.gsSockehack?.getters.client.disconnect?.();

                  do {
                    hack.getters.client.rIndex++;
                    const currentDataCenter = hack.getters.network.dataCenters?.[hack.getters.client.dcIndex];

                    if (!currentDataCenter?.[hack.getters.client.rIndex]) {
                      hack.getters.client.dcIndex++;
                      hack.getters.client.rIndex = 0;

                      if (!hack.getters.network.dataCenters?.[hack.getters.client.dcIndex]) {
                        alert("It seems all servers are full. Please refresh your page and try again.");
                        location.reload();
                        return;
                      }
                    }
                  } while (hack.getters.network.dataCenters?.[hack.getters.client.dcIndex]?.[hack.getters.client.rIndex]?.[2] !== hack.getters.client.modeInfo.mp);

                  const newGsip = hack.getters.network.dataCenters?.[hack.getters.client.dcIndex]?.[hack.getters.client.rIndex]?.[1];
                  const newGsrn = hack.getters.network.dataCenters?.[hack.getters.client.dcIndex]?.[hack.getters.client.rIndex]?.[3];
                  hack.getters.client.roomId = hack.getters.network.dataCenters?.[hack.getters.client.dcIndex]?.[hack.getters.client.rIndex]?.[4];

                  hack.getters.client.findUntilFound(newGsip, newGsrn, n);
                }
              });
            }
          });
        });
      });
    });
  };

  document.body.onkeydown = (event) => {
    const keyCode = event.keyCode
    switch (keyCode) {
      case 17:
        hack.getters.mode.makeMeGhost()
        break
      case 113:
        if (!hack.vars.modeIsOn) {
          hack.functions.godModeEnable()
          hack.logFuncs.logModeIsOn()
          hack.functions.multSpdEnable()
        } else {
          hack.functions.godModeDisable()
          hack.logFuncs.logModeIsOn()
          hack.functions.multSpdDisable()
        }
        break
      case 192:
      case 190:
        if (hack.vars.modeIsOn) {
          hack.suppFuncs.setMult()
          hack.logFuncs.logSpd()
        }
        break
    }
  }

  function isGrounded() {
    const meX = hack.getters.me.getX()
    const meY = hack.getters.me.getY()
    const ray = hack.getters.ray
    const physics = hack.getters.physics
    const gpPWorld = hack.getters.gp.pWorld
    const rayResult = hack.getters.me.ray.result
    const rayHitPoint = (hack.getters.ray.hitPoint = [Infinity, Infinity])

    const verticalOffset = 50
    const checkYPosition = meY + 45

    for (let i = 0; i < 121; i++) {
      const o = meX - 15 + i * (30 / 120)
      const s = checkYPosition
      const u = s + verticalOffset

      ray.from = [physics.xAxis(o, 0), physics.yAxis(s, 0)]
      ray.to = [physics.xAxis(o, 0), physics.yAxis(u, 0)]

      ray.update()
      rayResult.reset()

      if (gpPWorld.raycast(rayResult, ray)) {
        rayResult.getHitPoint(rayHitPoint, ray)
        const hitDistance = rayResult.getHitDistance(ray)

        if (rayResult.shape.ref.getCollision() && hitDistance < 0.1) {
          return true
        }
      }
    }

    return false
  }

  function newMovement() {
    hack.getters.client.loopFunctions[2].fun = function () {
      const currentTime = Date.now()
      const dashCooldown = 250
      const dashDistance = 2.5
      const dashSpeed = 25
      const grounded = isGrounded()

      if (grounded) {
        hack.playerMoveData.airDashAvailable = true
      }

      if (hack.getters.mode.moveLeft) {
        hack.playerMoveData.lastHorizontalDirection = -1
      } else if (hack.getters.mode.moveRight) {
        hack.playerMoveData.lastHorizontalDirection = 1
      }

      if (
        hack.keyBindings.isCPressed &&
        hack.getters.mode.moveDown &&
        currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
        !hack.playerMoveData.isDashingDown &&
        (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
      ) {
        hack.playerMoveData.lastDashTime = currentTime
        hack.playerMoveData.isDashingDown = true
        hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000
        hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration
        if (!grounded) {
          hack.playerMoveData.airDashAvailable = false
        }
      }

      if (
        hack.keyBindings.isCPressed &&
        hack.getters.mode.moveUp &&
        currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
        !hack.playerMoveData.isDashingUp &&
        (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
      ) {
        hack.playerMoveData.lastDashTime = currentTime
        hack.playerMoveData.isDashingUp = true
        hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000
        hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration
        if (!grounded) {
          hack.playerMoveData.airDashAvailable = false
        }
      }

      if (
        hack.keyBindings.isCPressed &&
        currentTime - hack.playerMoveData.lastDashTime >= dashCooldown &&
        !hack.playerMoveData.isDashing &&
        (grounded || (!grounded && hack.playerMoveData.airDashAvailable))
      ) {
        hack.playerMoveData.lastDashTime = currentTime
        hack.playerMoveData.isDashing = true
        hack.playerMoveData.dashVelocity = dashSpeed * hack.playerMoveData.lastHorizontalDirection
        hack.playerMoveData.dashDuration = (dashDistance / dashSpeed) * 1000
        hack.playerMoveData.dashEndTime = currentTime + hack.playerMoveData.dashDuration
        if (!grounded) {
          hack.playerMoveData.airDashAvailable = false
        }
      }

      if (hack.playerMoveData.isDashingDown) {
        hack.getters.mode.player.gpData.p.velocity[1] = -dashSpeed
        hack.getters.mode.player.gpData.p.velocity[0] = 0
        hack.getters.me.p.collisionResponse = false
        if (currentTime >= hack.playerMoveData.dashEndTime) {
          hack.playerMoveData.isDashingDown = false
          hack.getters.mode.player.gpData.p.velocity[1] = 0
          if (!hack.vars.modeIsOn) {
            hack.getters.me.p.collisionResponse = true
          }
        }
        return
      }

      if (hack.playerMoveData.isDashingUp) {
        hack.getters.mode.player.gpData.p.velocity[1] = dashSpeed
        hack.getters.mode.player.gpData.p.velocity[0] = 0
        hack.getters.me.p.collisionResponse = false
        if (currentTime >= hack.playerMoveData.dashEndTime) {
          hack.playerMoveData.isDashingUp = false
          hack.getters.mode.player.gpData.p.velocity[1] = 0
          if (!hack.vars.modeIsOn) {
            hack.getters.me.p.collisionResponse = true
          }
        }
        return
      }

      if (hack.playerMoveData.isDashing) {
        hack.getters.mode.player.gpData.p.velocity[0] = hack.playerMoveData.dashVelocity
        hack.getters.mode.player.gpData.p.velocity[1] = 0
        hack.getters.me.p.collisionResponse = false
        if (currentTime >= hack.playerMoveData.dashEndTime) {
          hack.playerMoveData.isDashing = false
          hack.getters.mode.player.gpData.p.velocity[0] = 0
          if (!hack.vars.modeIsOn) {
            hack.getters.me.p.collisionResponse = true
          }
        }
        return
      } else {
        if (hack.getters.mode.moveRight) {
          hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult
        } else if (hack.getters.mode.moveLeft) {
          hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult
        } else {
          hack.getters.mode.player.gpData.p.velocity[0] = 0
        }
      }

      if (grounded) {
        hack.playerMoveData.isDoubleJumpAllowed = true
        if (hack.keyBindings.isZPressed) {
          hack.keyBindings.isZPressed = false
          hack.getters.velocity[1] = 8 * (hack.getters.me.p.gravityScale)
        }
      } else if (hack.playerMoveData.isDoubleJumpAllowed && hack.keyBindings.isZPressed) {
        hack.keyBindings.isZPressed = false
        hack.getters.velocity[1] = 8 * (hack.getters.me.p.gravityScale)
        hack.playerMoveData.isDoubleJumpAllowed = false
      }

      if (hack.vars.ghost1) {
        if (hack.getters.mode.moveUp) {
          hack.getters.velocity[1] = hack.vars.udSpd * hack.vars.mult
        }
        if (hack.getters.mode.moveDown) {
          hack.getters.velocity[1] = -hack.vars.udSpd * hack.vars.mult
        }
        if (!hack.getters.mode.moveUp && !hack.getters.mode.moveDown) {
          hack.getters.velocity[1] = 0
        }
      }
    }
    hack.playerMoveData.newMovementIsOn = true
  }

  function oldMovement() {
    hack.getters.client.loopFunctions[2].fun = function () {
      const grounded = isGrounded()

      if (hack.getters.mode.moveRight) {
        hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult
      } else if (hack.getters.mode.moveLeft) {
        hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult
      } else {
        hack.getters.mode.player.gpData.p.velocity[0] = 0
      }
      if (grounded) {
        if (hack.getters.mode.moveUp) {
          hack.getters.velocity[1] = 8
        }
      }
      if (hack.vars.ghost1) {
        if (hack.getters.mode.moveUp) {
          hack.getters.velocity[1] = hack.vars.udSpd * hack.vars.mult
        }
        if (hack.getters.mode.moveDown) {
          hack.getters.velocity[1] = -hack.vars.udSpd * hack.vars.mult
        }
        if (!hack.getters.mode.moveUp && !hack.getters.mode.moveDown) {
          hack.getters.velocity[1] = 0
        }
      }
    }
    hack.playerMoveData.newMovementIsOn = false
  }
}

let temp1 = {};
const _call = Function.prototype.call;
new Promise((resolve, reject) => {
  Function.prototype.call = function (...args) {
    if (args[2]?.exports) {
      temp1 = args[6]
      Function.prototype.call = _call
      console.log(temp1)
      resolve(temp1)
    }
    return _call.apply(this, args)
  };
}).then((result) => {
  if (Object.keys(result).length > 0) {
    activateMain(result)
  } else {
    console.log("temp1 is empty")
  }
}).catch((error) => {
  console.error("An error occurred:", error)
})
