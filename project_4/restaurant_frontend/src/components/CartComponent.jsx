function CartComponent({ item, quantity }) {
    return (
        <div>
            <img src={item.imageURL} alt="Cart Product" />
            <h3>{item.food_name}</h3>
            <p>Price: </p>
        </div>
    )
}

export default CartComponent