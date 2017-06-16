try {
    Order = require('./order')
} catch (err) {

}

class Waiter {
    constructor () {
        this.order = new Order()
    }
    addDish (dishOrder, name, ...spices) {
        try {
            this.order.addDish(dishOrder, name, ...spices)
            this.onDishAdded()
        } catch (err) {
            this.onError(err)
        }
        return this
    }
    addSpices (dishOrder, ...spices) {
        try {
            this.order.addSpices(dishOrder, ...spices)
            this.onSpicesAdded()
        } catch (err) {
            this.onError(err)
        }
        return this
    }
    getOrder () {
        return this.order.get()
    }
    cancel () {
        throw new Error('implement cancel ()')
    }
    onError (err) {
        throw new Error('implement onError (err)')
    }
    onDishAdded () {
        throw new Error('implement onDishAdded ()')
    }
    onSpicesAdded () {
        throw new Error('implement onSpicesAdded ()')
    }
}

try {
    module.exports = Waiter
} catch (err) {

}
