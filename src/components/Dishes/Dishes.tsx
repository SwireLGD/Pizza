import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectDishes } from "../../store/dishesSlice";
import { deleteDish, fetchDishes } from "../../store/dishesThunks";
import DishItem from "./DishItem";

const Dishes: React.FC = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    
    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
        <h4>Dishes</h4>
        {dishes.map(dish => (
            <DishItem 
            key={dish.id}
            dish={dish}
            onDelete={() => removeDish(dish.id)}
            />
        ))}
        </>
    );
};

export default Dishes;