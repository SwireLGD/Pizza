import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectDeleteDishLoading, selectDishes, selectFetchDishesLoading } from "../../store/dishesSlice";
import { deleteDish, fetchDishes } from "../../store/dishesThunks";
import DishItem from "./DishItem";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { clearCart, selectCartDishes } from "../../store/cartSlice";
import Modal from "../Modal.tsx/Modal";
import CartDishes from "../Cart/CartDishes";

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

    const handleOrder = () => {
      dispatch(clearCart());
      toggleModal();
      navigate('/');
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <div  className="mt-3">
          {isAdmin && <h4>Dishes</h4>}
          {fetchLoading ? <Spinner/> : dishes.map(dish => (
          <DishItem
            key={dish.id}
            dish={dish}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
            isAdmin={isAdmin}
          />
          ))}
          <button className="btn btn-primary mt-3" onClick={toggleModal}>
            Checkout
        </button>

        <Modal
            show={showModal}
            title="Checkout"
            onClose={toggleModal}
        >
            <div className="modal-body">
                <CartDishes cartDishes={cartDishes} />
            </div>
            <div className="modal-footer">
                <button className="btn btn-danger" onClick={toggleModal}>
                    Cancel
                </button>
                <button className="btn btn-success" onClick={handleOrder}>
                    Order
                </button>
            </div>
        </Modal>
        </div>
    );
};

export default Dishes;