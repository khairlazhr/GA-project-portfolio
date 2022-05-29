import { useState } from "react"

function useQuantity(value) {
    const [quantity, setQuantity] = useState(value)

    function quantityDecrement(e) {
        if (!e.currentTarget.matches("button")) return
        if (quantity <= 1) return
        setQuantity((q) => q-1)
    }

    function quantityIncrement(e) {
        if (!e.currentTarget.matches("button")) return
        setQuantity((q) => q+1)
    }

    return [quantity, quantityDecrement, quantityIncrement]

}

export default useQuantity