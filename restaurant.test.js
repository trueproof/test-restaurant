try {
    createWaiter = require('./restaurant').createWaiter
} catch (err) {

}

const defaultMenu = {
    1: {
        name: 'soup',
        spices: ['salt'],
    },
    2: {
        name: 'beef',
        spices: ['salt', 'pepper'],
    },
    3: {
        name: 'tea',
        spices: ['sugar', 'lemon', 'jasmine'],
    },
}
const assert = {
    equal (actual, expected, message) {
        if (actual !== expected) {
            console.log(actual)
            throw new Error(message)
        }
    }
}
let lastMsg
const say = (msg) => {
    lastMsg = msg
}

const getTestWaiter = createWaiter(say)
const getDefaultMenuWaiter = (type) => {
    return getTestWaiter(type)
        .addDish(1, defaultMenu[1].name, ...defaultMenu[1].spices)
        .addDish(2, defaultMenu[2].name, ...defaultMenu[2].spices)
        .addDish(3, defaultMenu[3].name, ...defaultMenu[3].spices)
}


console.log('#normal operation: add dishes')
assert.equal(
    JSON.stringify(getDefaultMenuWaiter(1).getOrder()),
    JSON.stringify(defaultMenu),
    'waiter 1 failed'
)

assert.equal(
    JSON.stringify(getDefaultMenuWaiter(2).getOrder()),
    JSON.stringify(defaultMenu),
    'waiter 2 failed'
)

console.log('#normal operation: add spices')
assert.equal(
    JSON.stringify(getDefaultMenuWaiter(1).addSpices(1, 'pepper', 'garlic').getOrder()),
    JSON.stringify(Object.assign(
        {},
        defaultMenu,
        {
            1: {
                name: 'soup',
                spices: ['salt', 'pepper', 'garlic'],
            },
        }
    )),
    'waiter 1 failed'
)

assert.equal(
    JSON.stringify(getDefaultMenuWaiter(2).addSpices(1, 'pepper', 'garlic').getOrder()),
    JSON.stringify(Object.assign(
        {},
        defaultMenu,
        {
            1: {
                name: 'soup',
                spices: ['salt', 'pepper', 'garlic'],
            },
        }
    )),
    'waiter 2 failed'
)

console.log('#not allowed dish')
getTestWaiter(1).addDish(4, 'pork')
assert.equal(
    lastMsg.includes('not allowed'),
    true,
    'waiter 1 failed'
)

getTestWaiter(2).addDish(4, 'pork')
assert.equal(
    lastMsg.includes('not allowed'),
    true,
    'waiter 2 failed'
)

console.log('#dish duplicate')
assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(1)
            .addDish(2, 'pork')
            .getOrder()
    ),
    '{}',
    'waiter 1 failed'
)

assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(2)
            .addDish(2, 'pork')
            .getOrder()
    ),
    JSON.stringify(defaultMenu),
    'waiter 2 failed'
)

console.log('#spice duplicate')
assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(1)
            .addSpices(2, 'pepper')
            .getOrder()
    ),
    '{}',
    'waiter 1 failed'
)

assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(2)
            .addSpices(2, 'pepper')
            .getOrder()
    ),
    JSON.stringify(defaultMenu),
    'waiter 2 failed'
)

console.log('#spice overflow')
assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(1)
            .addSpices(3, 'ginger')
            .getOrder()
    ),
    '{}',
    'waiter 1 failed'
)

assert.equal(
    JSON.stringify(
        getDefaultMenuWaiter(2)
            .addSpices(3, 'ginger')
            .getOrder()
    ),
    JSON.stringify(defaultMenu),
    'waiter 2 failed'
)

console.log('#add spice to absent dish')
getTestWaiter(1).addSpices(1, 'ginger')
assert.equal(
    lastMsg.includes('no dish'),
    true,
    'waiter 1 failed'
)

getTestWaiter(2).addSpices(1, 'ginger')
assert.equal(
    lastMsg.includes('no dish'),
    true,
    'waiter 2 failed'
)

console.log('#cancel')
getTestWaiter(1).cancel()
assert.equal(
    lastMsg.includes('canceled'),
    true,
    'waiter 1 failed'
)

getDefaultMenuWaiter(1).cancel()
assert.equal(
    lastMsg.includes('order is not empty'),
    true,
    'waiter 1 failed'
)

getDefaultMenuWaiter(2).cancel()
assert.equal(
    lastMsg.includes('canceled'),
    true,
    'waiter 2 failed'
)
