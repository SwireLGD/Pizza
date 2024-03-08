import { Link } from "react-router-dom";
import { Dish } from "../../types";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

const noImageAvailable = 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

interface Props {
    dish: Dish;
    onDelete: React.MouseEventHandler;
    deleteLoading: false | string;
}

const DishItem: React.FC<Props> = ({dish, onDelete, deleteLoading}) => {
    const image = dish.image || noImageAvailable;
    const imageStyle = {
        background: `url(${image}) no-repeat center center / cover`,
    };

    const isLoading = deleteLoading === dish.id;
  
    return (
        <div className="card mb-2">
            <div className="row g-0">
                <div className="col-sm-1 rounded-start" style={imageStyle}/>
                <div className="col-sm-8">
                    <div className="card-body">
                    <h5 className="card-title">{dish.title}</h5>
                    <p className="card-text">{dish.price} KGS</p>
                    <p className="d-flex gap-2">
                    <button
                        className="btn btn-danger"
                        onClick={onDelete}
                        disabled={isLoading}
                    >
                        {isLoading && <ButtonSpinner />}
                        Delete
                    </button>
                        <Link to={'/edit-dish/' + dish.id} className="btn btn-primary">Edit</Link>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default DishItem;