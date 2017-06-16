window.onload = () => {
    const WAITER_TYPES = [1, 2]

    const $ = document.getElementById.bind(document)
    const $type = $('type')
    const $dishes = $('dishes')
    const $order = $('order')
    const $message = $('message')
    const $getWaiter = $('get-waiter')
    const $cancel = $('cancel')
    let waiter

    const createOrderRow = (entry) => {
        const $div = document.createElement('div')
        const dish = `${entry[0]}: ${entry[1].name}`
        const spices = entry[1].spices.length ? `, spices: ${entry[1].spices.join(', ')}` : ''
        $div.textContent = `${dish}${spices}`
        return $div
    }
    const refreshOrder = () => {
        $order.textContent = ''
        Object.entries(waiter.getOrder())
            .map(createOrderRow)
            .forEach((row) => {
                $order.appendChild(row)
            })
    }
    const getIndex = (node) => {
        let i = 0
        while (node = node.previousElementSibling) {
            i++
        }
        return i
    }
    const say = (msg) => {
        $message.textContent = msg
    }
    const getWaiter = createWaiter(say)
    const init = () => {
        $message.textContent = ''
        const type = Number($type.value)
        waiter = getWaiter(WAITER_TYPES.includes(type) ? type : 1)
        refreshOrder()
    }

    $type.onchange = init
    $getWaiter.onclick = init
    $cancel.onclick = () => {
        waiter.cancel()
        refreshOrder()
    }

    $dishes.onclick = (event) => {
        let input
        let i
        if (event.target.dataset.type === 'add') {
            input = event.target.previousElementSibling
            if (!input.value) {
                return
            }
            switch (input.dataset.type) {
                case 'dish':
                    i = getIndex(input.parentNode)
                    waiter.addDish(i + 1, input.value)
                    break
                case 'spice':
                    i = getIndex(input.parentNode.parentNode.parentNode)
                    waiter.addSpices(i + 1, input.value)
                    break
                default:
                    console.log('---')
            }
            refreshOrder()
        }
    }

    init()
}
