import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ApiDish } from "../types";
import axiosApi from "../axiosApi";
import DishForm from "../components/DishForm/DishForm";

const NewDish: React.FC = () => {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const createDish = async (dish: ApiDish) => {
        try {
            setIsCreating(true);
            await axiosApi.post('/pizza.json', dish);
            navigate('/admin');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="row mt-2">
            <div className="col-6">
                <DishForm onSubmit={createDish} isLoading={isCreating}/>
            </div>
        </div>
    );
};

export default NewDish;