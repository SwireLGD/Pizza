import React from 'react';
import {CartDish} from "../../types";

interface Props {
  cartDish: CartDish;
  onDelete: (dishId: string) => void;
}

const CartItem: React.FC<Props> = ({cartDish, onDelete}) => {
  const price = cartDish.dish.price * cartDish.amount;

  const handleDelete = () => {
    onDelete(cartDish.dish.id);
  };

  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <div className="col">{cartDish.dish.title}</div>
        <div className="col-2">{cartDish.amount}</div>
        <div className="col-3 text-right">
          {price} KGS
        </div>
        <div className="col-3">
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;