import React, { useState } from "react";
import { ApiDish, DishMutation } from "../../types";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface Props {
    onSubmit: (dish: ApiDish) => void;
    existingDish?: DishMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialState: DishMutation = {
    title: '',
    image: '',
    price: '',
};

const DishForm: React.FC<Props> = ({
    onSubmit,
    existingDish = initialState,
    isEdit = false,
    isLoading = false,
}) => {
    const [dish, setDish] = useState<DishMutation>(existingDish);

    const changeDish = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDish(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        onSubmit({
          ...dish,
          price: parseFloat(dish.price),
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h4>{isEdit ? 'Edit dish' : 'Add new dish'}</h4>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={dish.title}
                onChange={changeDish}
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                type="url"
                name="image"
                id="image"
                className="form-control"
                value={dish.image}
                onChange={changeDish}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                value={dish.price}
                onChange={changeDish}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                {isLoading && <ButtonSpinner />}
                {isEdit ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default DishForm;