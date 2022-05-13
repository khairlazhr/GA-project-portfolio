import { useState } from "react"

function useQuantity() {
    const [quantity, setQuantity] = useState(1)

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