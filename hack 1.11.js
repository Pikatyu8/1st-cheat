let hack = {
    keyBindings: {
        isCPressed: false,
        cTimer: null
},
    bindKeys: function() {
        document.addEventListener('keydown', function(event) {
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

    document.addEventListener('keyup', function(event) {
        if (event.key.toLowerCase() === 'c') {
            hack.keyBindings.isCPressed = false;
            if (hack.keyBindings.cTimer) {
                clearTimeout(hack.keyBindings.cTimer);
                hack.keyBindings.cTimer = null;
            }
        }
    });
},

    playerDirection: {
        lastHorizontalDirection: 0,
        lastDashTime: 0,
        isDashing: false,
        dashEndTime: 0},
    getters: {
        get client() { return temp1.o[1].exports; },
        get gf() { return temp1.o[5].exports; },
        get gp() { return temp1.o[6].exports; },
        get graphics() { return temp1.o[7].exports; },
        get guiComponents_afk() { return temp1.o[8].exports; },
        get guiComponents_kick() { return temp1.o[9].exports; },
        get mode() { return temp1.o[11].exports; },
        get envirData() { return temp1.o[15].exports; },
        get kickPlayer() { return temp1.o[17].exports; },
        get myStatus() { return temp1.o[20].exports; },
        get othersPlayerData() { return temp1.o[23].exports; },
        get othersPlayerMsg() { return temp1.o[24].exports; },
        get rGho() { return temp1.o[26].exports; },
        get timer() { return temp1.o[28].exports; },
        get modules_leaderboard() { return temp1.o[32].exports; },
        get modules_resultScreen() { return temp1.o[35].exports; },
        get network() { return temp1.o[36].exports; },
        get jquery() { return temp1.o[69].exports; },
        get physics() { return temp1.o[332].exports; },
        get me() { return hack.getters.mode.player.gpData; }, 
        get ray() { return hack.getters.me.ray; },
        get velocity() { return hack.getters.me.p.velocity; },
        get otherPlayers() { return hack.getters.mode.otherPlayers; },
    },
	vars: {
		mult: 1,
		lrSpd: 3,
		udSpd: 3,
		get totalSpd() {return (((this.lrSpd + this.udSpd) / 2) * this.mult)},
		multSpdIsOn: false,
		modeIsOn: false,
		ghost1: false,
		ghost2: false,
		immIsOn: false,
		MMGIsOn: false,
		isPlayerDead: false,
		interTpToOtherIsOn: false,
		delay: 1000,
		inter: 250,
		get mass() {return hack.getters.me.p.mass},
		get collisionResponse() {return hack.getters.me.p.collisionResponse}
	},
	suppFuncs: {
		getMult: () => {
			if (hack.vars.mult < 3) {
				return 1
			} else if (hack.vars.mult < 4) {
				return 2
			}
		},
		setMult: function(e) {
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
		getIndexByName: function(playerName) {
			for (i = 0; i < hack.getters.otherPlayers.length; i++) {
				if (hack.getters.otherPlayers[i]?.myName == playerName) {
					break
				}
			}
			if (i == hack.getters.otherPlayers.length) {
				return false
			}
			return i
		}
	},
	functions: {
		tp: function(x, y) {
			hack.getters.me.setX(x), hack.getters.me.setY(y)
		},
		tpDoor: () => {
			hack.functions.tp(hack.getters.mode.exitGate.exitGateCounter.refP.getX(), hack.getters.mode.exitGate.exitGateCounter.refP.getY())
		},
		tpSpawn: () => {
			hack.functions.tp(hack.getters.mode.spawn.refP.getX(), hack.getters.mode.spawn.refP.getY())
		},
		setTpToOther: function(playerIndex) {
			if (!hack.vars.interTpToOtherIsOn && playerIndex) {
				interTpToOther = setInterval(() => {
					hack.getters.me.p.position[0] = hack.getters.otherPlayers[playerIndex].gpData.p.position[0]
					hack.getters.me.p.position[1] = hack.getters.otherPlayers[playerIndex].gpData.p.position[1]
				}, hack.vars.inter)
				hack.vars.interTpToOtherIsOn = true
			} else if (!playerIndex) {
				try {
					clearInterval(interTpToOther)
					hack.vars.interTpToOtherIsOn = false
				} catch {
					console.log('не существующий интервал')
				}
			}
		},
		MMGEnable: function() {
			hack.getters.mode.makeMeGhost = function() {
				hack.getters.me.setAlpha(.3)
				hack.getters.me.p.shapes[0].sensor = !0
				hack.getters.me.p.gravityScale = 0
				hack.getters.velocity[0] = 0
				hack.getters.velocity[1] = 0
				hack.functions.immEnable()
                hack.vars.ghost2 = true
				hack.vars.isPlayerDead = true
				if (hack.vars.multSpdIsOn) {hack.functions.multSpdDisable()}
				hack.getters.rGho.fire(hack.getters.network.gsSocket)
				hack.getters.mode.md.mobile() && hack.getters.mode.setupTouchButtons(!0)
			}
			hack.vars.MMGIsOn = true
		},
		MMGDisable: function() {
			hack.getters.mode.makeMeGhost = () => {}
			hack.vars.MMGIsOn = false
		},
		immEnable: () => {
			hack.getters.me.me = void 0
			hack.vars.immIsOn = true
		},
		immDisable: () => {
			hack.getters.me.me = true
			hack.vars.immIsOn = false
		},
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
		logImmIsOn: () => {
			console.log('immIsOn:', hack.vars.immIsOn)
		},
		logSpd: () => {
			console.log('speed:', ((hack.vars.lrSpd + hack.vars.udSpd) / 2) * hack.vars.mult)
		},
		logMMGIsOn: () => {
			console.log('MMGIsOn:', hack.vars.MMGIsOn)
		},
		logAll: () => {
			hack.logFuncs.logModeIsOn()
			hack.logFuncs.logImmIsOn()
			hack.logFuncs.logSpd()
			hack.logFuncs.logMMGIsOn()
		},
		logVars: () => {
			for (let i in hack.vars) {
				console.log(i + ':', hack.vars[i])
			}
		},
		logDisable: () => {
			for (i in hack.logFuncs) {
				hack.logFuncs[i] = () => {}
			}
		}
	}
}
hack.getters.mode.onChangeMap = function(e) {
	try {
		scrActivate()
		delete scrActivate
	} catch {}
	clearInterval(hack.getters.mode.startTimeId)
	clearTimeout(hack.getters.mode.smallStepTimeId)
	hack.getters.modules_resultScreen.hideResultScreen()
	e = e
	hack.getters.gp.unload(hack.getters.gp)
	hack.getters.gp.list = hack.getters.gp.load(e, hack.getters.gp)
	hack.getters.mode.syncArr = []
	hack.getters.mode.ghost = !1
	hack.getters.mode.tweenObjects = []
	hack.getters.mode.defineBehaviours(hack.getters.gp.list, hack.getters.mode.syncArr, hack.getters.gp)
	hack.getters.mode.md.mobile() && hack.getters.mode.setupTouchButtons(!1)
	hack.getters.mode.setMyBio()
	hack.getters.mode.setBio(hack.getters.me, hack.getters.mode.myName, hack.getters.mode.mySkin, hack.getters.mode.whatBro, hack.getters.mode.chatColor, hack.getters.mode.teamColor);
	for (var t, n = 0; n < hack.getters.otherPlayers.length; n++)
		void 0 !== hack.getters.otherPlayers[n] && null != hack.getters.otherPlayers[n] && (t = hack.getters.otherPlayers[n].gpData.g.myIndex,
			hack.getters.otherPlayers[n].gpData = hack.getters.mode.createPlayer(),
			hack.getters.otherPlayers[n].gpData.g.myIndex = t,
			hack.getters.gp.gWorld.removeChild(hack.getters.otherPlayers[n].gpData.g),
			hack.getters.gp.gWorld.mid.addChild(hack.getters.otherPlayers[n].gpData.g),
			hack.getters.mode.setBio(hack.getters.otherPlayers[n].gpData, hack.getters.otherPlayers[n].myName, hack.getters.otherPlayers[n].mySkin, hack.getters.otherPlayers[n].whatBro, hack.getters.otherPlayers[n].chatColor, hack.getters.otherPlayers[n].teamColor));
	void 0 === hack.getters.mode.firstTimeMapChange && (hack.getters.mode.firstTimeMapChange = !0),
		hack.getters.mode.smallStepTimeId = setTimeout(function() {
			document.getElementById("startTime").style.display = "inherit",
				document.getElementById("startTime").innerHTML = hack.getters.mode.startTime,
				hack.getters.client.runPhysics = !1,
				hack.getters.mode.startTimeId = setInterval(function() {
					hack.getters.mode.startTime++,
						document.getElementById("startTime").innerHTML = hack.getters.mode.startTime,
						3 == hack.getters.mode.startTime && (hack.getters.mode.startTime = 0,
							hack.getters.client.runPhysics = !0,
							clearInterval(hack.getters.mode.startTimeId),
							document.getElementById("startTime").style.display = "none")
				}, 1e3)
		}, 0)
	if (hack.vars.modeIsOn) {
		hack.functions.godModeEnable()
	} else {
		hack.functions.godModeDisable()
	}
	if (hack.vars.immIsOn) {
		hack.functions.immEnable()
	} else {
		hack.functions.immDisable()
	}
	hack.vars.ghost2 = false
	hack.vars.isPlayerDead = false

}
document.body.onkeydown = (event) => {
	const keyCode = event.keyCode;
	switch (keyCode) {
		case 17:
			hack.getters.mode.makeMeGhost()
			break
		case 113: // F2
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
		case 36: // Home
			hack.functions.tpSpawn();
			break;
		case 35: // End
			hack.functions.tpDoor();
			break;
		case 120: // F9
			if (!hack.vars.MMGIsOn) {
				hack.functions.MMGEnable();
				hack.logFuncs.logMMGIsOn();
			} else {
				hack.functions.MMGDisable();
				hack.logFuncs.logMMGIsOn();
			}
			break;
		case 192: // ` (backtick) or 190 (dot)
		case 190:
			if (hack.vars.modeIsOn) {
				hack.suppFuncs.setMult();
				hack.logFuncs.logSpd();
			}
			break;
		case 45: // Insert
		case 96: // Num 0
			hack.functions.setTpToOther(hack.suppFuncs.getIndexByName(prompt('Введите корректный никнейм. Чтобы выйти из интервала нажмите Esc.')));
			break;
		case 115: // F4
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
function scrActivate() {
	Object.defineProperty(hack.vars, 'inter', {
		enumerable: false
	});
	hack.functions.MMGEnable()
	hack.functions.MMGDisable()
	setInterval(() => {
		o = []
		for (let i in hack.vars) {
			o.push(`${i}: ${hack.vars[i]}`)
		}
		document.getElementById("someData").innerHTML = o.join('<br>');
	}, hack.vars.inter);
	document.body.insertAdjacentHTML("beforebegin", `
<div id="someData" style="display:inherit;width: 100%; position: fixed;top: 25px;left: 0px;width: auto;height: auto; text-align: left; font-size: 14px; background: rgb(0, 0, 0); color: rgb(255, 255, 255); opacity: 0.7; padding: 2px 2px; display: inherit;"></div>
`)
	document.getElementById('timer').style.background = 'rgb(0, 0, 0)';
	document.getElementById('timer').style.color = 'rgb(255, 255, 255)';
	document.getElementById('mapCredits').style.background = 'rgb(0, 0, 0)';
	document.getElementById('mapCredits').style.color = 'rgb(255, 255, 255)'
	document.getElementById('leaderboard').style.background = 'rgb(0, 0, 0)';
	document.getElementById('timer').style.opacity = 0.7
	document.getElementById('leaderboard').style.opacity = 0.7
	document.getElementById('mapCredits').style.opacity = 0.7
}
hack.bindKeys()
hack.getters.mode.playerMovement = function(e) {
    const currentTime = Date.now();
    const dashCooldown = 600; // Интервал между рывками в миллисекундах
    const dashDuration = 50; // Продолжительность рывка в миллисекундах

    // Обновляем последнее направление движения
    if (hack.getters.mode.moveLeft) {
        hack.playerDirection.lastHorizontalDirection = -1;
    } else if (hack.getters.mode.moveRight) {
        hack.playerDirection.lastHorizontalDirection = 1;
    }

    // Проверяем, можно ли начать новый рывок
    if (hack.keyBindings.isCPressed && currentTime - hack.playerDirection.lastDashTime >= dashCooldown && !hack.playerDirection.isDashing) {
        hack.playerDirection.lastDashTime = currentTime;
        hack.playerDirection.dashEndTime = currentTime + dashDuration;
        hack.playerDirection.isDashing = true;
    }

    // Проверяем, продолжается ли рывок
    if (hack.playerDirection.isDashing) {
        if (currentTime < hack.playerDirection.dashEndTime) {
            // Выполняем рывок
            hack.getters.mode.player.gpData.p.velocity[0] = 35 * hack.playerDirection.lastHorizontalDirection;
            hack.getters.mode.player.gpData.p.velocity[1] = 0
        } else {
            // Завершаем рывок
            hack.playerDirection.isDashing = false;
        }
    } else {
        // Обычное движение
        if (hack.getters.mode.moveRight) {
            hack.getters.mode.player.gpData.p.velocity[0] = hack.vars.lrSpd * hack.vars.mult;
        } else if (hack.getters.mode.moveLeft) {
            hack.getters.mode.player.gpData.p.velocity[0] = -hack.vars.lrSpd * hack.vars.mult;
        } else {
            hack.getters.mode.player.gpData.p.velocity[0] = 0;
        }
    }
    if (hack.getters.mode.moveUp)
        for (var t = hack.getters.me.getX(),
                n = hack.getters.me.getY(),
                r = t - 15, i = 0; i < 12; i++) {
            var o = r + i * (30 / 11),
                s = n + 50 - 1,
                a = r + i * (30 / 11),
                u = 50 + s;
            if (hack.getters.ray.from = [hack.getters.physics.xAxis(o, 0),
                    hack.getters.physics.yAxis(s, 0)
                ], hack.getters.ray.to = [hack.getters.physics.xAxis(a, 0),
                    hack.getters.physics.yAxis(u, 0)
                ], enableRay && (o = hack.getters.graphics.createLine({
                    from: {
                        x: o,
                        y: s
                    },
                    to: {
                        x: a,
                        y: u
                    }
                }), hack.getters.gp.gWorld.mid.addChild(o)),
                hack.getters.ray.update(),
                hack.getters.ray.result.reset(),
                hack.getters.ray.hitPoint = [Infinity, Infinity],
                hack.getters.gp.pWorld.raycast(hack.getters.ray.result, hack.getters.ray)) {
                hack.getters.ray.result.getHitPoint(hack.getters.ray.hitPoint, hack.getters.ray);
                s = hack.getters.ray.result.getHitDistance(hack.getters.ray);
                if ((hack.getters.ray.result.shape.ref.getCollision()) && (s < 0.05)) {
                    hack.getters.velocity[1] = 8;
                    break
                }
            }
        }
    if (hack.vars.ghost1 || hack.vars.ghost2) {
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
  
