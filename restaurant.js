try {
    Waiter = require('./waiter')
} catch (err) {

}

const waiterOfType = {
    1: class extends Waiter {
        constructor (say = (msg) => {}) {
            super()
            this.type = 1
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
        constructor (say = (msg) => {}) {
            super()
            this.type = 2
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

const createWaiter = (say) => (type) => new waiterOfType[type](say)

try {
    module.exports = { createWaiter }
} catch (err) {

}
