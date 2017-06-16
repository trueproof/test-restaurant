try {
    Waiter = require('./waiter')
} catch (err) {

}

const waiterOfType = {
    1: class extends Waiter {
        constructor (tp, say = (msg) => {}) {
            if (!(tp in waiterOfType)) {
                throw new Error (`not allowed type: ${tp}`)
            }
            super()
            this.type = tp
            this.say = say
        }
        cancel () {
            if (Object.keys(this.order.get()).length) {
                this.say('order is not empty')
            } else {
                this.order.cancel()
                this.say('order canceled')
            }
        }
        onError (err) {
            this.order = new Order()
            this.say(err.message)
        }
        onDishAdded () {
            this.say('ok, dish added')
        }
        onSpicesAdded () {
            this.say('ok, spices added')
        }
    },
    2: class extends Waiter {
        constructor (tp, say = (msg) => {}) {
            if (!(tp in waiterOfType)) {
                throw new Error (`not allowed type: ${tp}`)
            }
            super()
            this.type = tp
            this.say = say
        }
        cancel () {
            this.order.cancel()
            this.say('order canceled')
        }
        onError (err) {
            this.say(`error: ${err.message}`)
        }
        onDishAdded () {
            this.say('ok, dish added')
        }
        onSpicesAdded () {
            this.say('ok, spices added')
        }
    },
}

const createWaiter = (say) => (type) => new waiterOfType[type](type, say)

try {
    module.exports = { createWaiter }
} catch (err) {

}
