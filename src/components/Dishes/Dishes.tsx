import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectDeleteDishLoading, selectDishes, selectFetchDishesLoading } from "../../store/dishesSlice";
import { deleteDish, fetchDishes } from "../../store/dishesThunks";
import DishItem from "./DishItem";
import Spinner from "../Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, selectCartDishes } from "../../store/cartSlice";
import Modal from "../Modal.tsx/Modal";
import CartDishes from "../Cart/CartDishes";
import { CartDish, Order } from "../../types";
import axiosApi from "../../axiosApi";

const Dishes: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const fetchLoading = useAppSelector(selectFetchDishesLoading);
    const deleteLoading = useAppSelector(selectDeleteDishLoading);
    const navigate = useNavigate();
    
    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    const [showModal, setShowModal] = useState(false);
    const cartDishes = useAppSelector(selectCartDishes);

    const toggleModal = () => setShowModal(!showModal);

    const handleOrder = async () => {
      if (cartDishes.length > 0) {
        const orderData: Order = cartDishes.reduce((acc: Order, cartDish: CartDish) => {
          acc[cartDish.dish.id] = cartDish.amount;
          return acc;
        }, {});
      

        try {
          await axiosApi.post('/orders.json', orderData);
          dispatch(clearCart());
          toggleModal();
          navigate('/');
        } catch (error) {
          console.error('Failed to place the order:', error);
        }
      }
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <div  className="mt-3">
          {isAdmin && (
            <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Dishes</h4>
            <Link to="/admin/add-dish" className="btn btn-success">Add New Dish</Link>
          </div>
          )}
          {fetchLoading ? <Spinner/> : dishes.map(dish => (
          <DishItem
            key={dish.id}
            dish={dish}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
            isAdmin={isAdmin}
          />
          ))}
          {!isAdmin && (
            <button className="btn btn-primary" onClick={toggleModal}>
              Checkout
            </button>
          )}

        <Modal
            show={showModal}
            title="Checkout"
            onClose={toggleModal}
        >
            <div className="modal-body">
              {cartDishes.length > 0 ? (
                <CartDishes cartDishes={cartDishes} />
              ) : (
                    <p>Cart is empty! Add something!</p>
              )}
            </div>
            <div className="modal-footer">
                <button className="btn btn-danger" onClick={toggleModal}>
                    Cancel
                </button>
                {cartDishes.length > 0 && (
                  <button className="btn btn-success" onClick={handleOrder}>
                      Order
                  </button>
                )}
            </div>
        </Modal>
        </div>
    );
};

export default Dishes;