new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: []
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0
    }
  },
  methods: {
    startGame() {
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
      this.logs = []
    },
    attack(especial) {
      this.hurt('monsterLife', 5, 10, especial, 'jogador', 'monstro', 'player')
      if(this.monsterLife > 0) {
        this.hurt('playerLife', 7, 12, false, 'monstro', 'jogador', 'monster')
      }
    },
    healAndHurt() {
      this.heal(10, 15)
      this.hurt('playerLife', 7, 12, false, 'monstro', 'jogador', 'monster')
    },
    heal(min, max) {
      const heal = this.getRandom(min, max)
      this.playerLife = Math.min(this.playerLife + heal, 100)
      this.registerLog(`Jogador recebeu força de ${heal}.`, 'player-heal')
    },
    hurt(prop, min, max, especial, souce, target, cls) {
      const plus = especial ? 5 : 0
      const hurt = this.getRandom(min + plus, max, max + plus)
      this[prop] = Math.max(this[prop] - hurt, 0)
      this.registerLog(`${souce} atingiu ${target} com ${hurt}.`, cls)
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    winGame() {
      this.registerLog(`Jogador atigiu o mosntro com ${this.monsterLife}.`)
      this.monsterLife = 0
    },
    loseGame() {
      this.registerLog(`Monstro atigiu o jogador com ${this.playerLife}.`)
      this.playerLife = 0
    },
    registerLog(text, cls) {
      this.logs.unshift({text, cls})
    }
  },
  watch: {
    hasResult(value) {
      if(value) this.running = false
    }
  }
})