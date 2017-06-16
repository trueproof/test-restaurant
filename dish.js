const MAX_SPICES = 3

class Dish {
    constructor (name, ...spices) {
        this.name = name
        this.spices = []
        this.addSpices(...spices)
    }
    addSpices (...spices) {
        var currentSpice
        if (this.spices.length + spices.length > MAX_SPICES) {
            throw new Error(`more than ${MAX_SPICES} spices`)
        }
        if (spices.some(spice => {
            currentSpice = spice
            return this.spices.includes(spice)
        })) {
            throw new Error(`already have spice: ${currentSpice}`)
        }

        this.spices.push(...spices)

        return this
    }
}

try {
    module.exports = Dish
} catch (err) {

}
