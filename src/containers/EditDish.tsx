import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ApiDish } from "../types";
import axiosApi from "../axiosApi";
import DishForm from "../components/DishForm/DishForm";

const EditDish: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [dish, setDish] = useState<ApiDish | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const fetchOneDish = useCallback(async () => {
        const {data: editedDish} = await axiosApi.get<ApiDish | null>('/pizza/' + id + '.json')

        if (!EditDish) {
            navigate('/404', {replace: true});
        } else {
            setDish(editedDish)
        }
    }, [id, navigate]);

    useEffect(() => {
        void fetchOneDish();
    }, [fetchOneDish]);

    const updateDish = async (dish: ApiDish) => {
        try {
            setIsUpdating(true);
            await axiosApi.put('/pizza/' + id + '.json', dish);
            navigate('/admin');
        } finally {
            setIsUpdating(false);
        }
    };

    const existingDish = dish && {
        ...dish,
        price: dish.price.toString(),
    };

    return (
        <div className="row mt-2">
            <div className="col">
                {existingDish && (
                <DishForm
                    isEdit
                    onSubmit={updateDish}
                    existingDish={existingDish}
                    isLoading={isUpdating}
                />
                )}
            </div>
        </div>
    );
};

export default EditDish;