try {
    Dish = require('./dish')
} catch (err) {

}

const ALLOWED_DISHES = [1, 2, 3]

class Order {
    constructor () {
        this.dishList = {}
        this.canceled = false
    }
    addDish (dishOrder, name, ...spices) {
        if (this.canceled) {
            throw new Error('order is canceled')
        } else if (!ALLOWED_DISHES.includes(dishOrder)) {
            throw new Error(`not allowed dish: ${dishOrder}`)
        } else if (this.dishList[dishOrder]) {
            throw new Error(`already have dish: ${dishOrder}`)
        }
        this.dishList[dishOrder] = new Dish(name, ...spices)
        return this
    }
    addSpices (dishOrder, ...spices) {
        if (this.canceled) {
            throw new Error('order is canceled')
        } else if (!this.dishList[dishOrder]) {
            throw new Error(`no dish: ${dishOrder}`)
        }
        this.dishList[dishOrder].addSpices(...spices)
        return this
    }
    get () {
        return this.dishList
    }
    cancel () {
        this.canceled = true
    }
}

try {
    module.exports = Order
} catch (err) {

}
