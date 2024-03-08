import React from "react";
import { CartDish } from "../../types";
import CartItem from "./CartItem";

interface Props {
    cartDishes: CartDish[]
}

const CartDishes: React.FC<Props> = ({cartDishes}) => {
    const delivery = 150
    const total = cartDishes.reduce((sum, cartDish) => {
        return sum + cartDish.dish.price * cartDish.amount;
    }, 0) + delivery;

    return (
        <>
            {cartDishes.map(cartDish => (
                <CartItem
                key={cartDish.dish.id}
                cartDish={cartDish}
                />
            ))}
            <div className="card border-0 p2">
                <div className="row">
                <div className="text-right d-block">
                    Delivery: {delivery} KGS
                </div>
                <div className="col text-right">
                    Total:
                </div>
                <div className="col-3 text-right">
                    <strong>{total}</strong> KGS
                </div>
                </div>
            </div>
        </>
    );
};

export default CartDishes;