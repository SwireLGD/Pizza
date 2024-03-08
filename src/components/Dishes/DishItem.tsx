import { Link } from "react-router-dom";
import { Dish } from "../../types";

const noImageAvailable = 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

interface Props {
    dish: Dish;
    onDelete: React.MouseEventHandler;
}

const DishItem: React.FC<Props> = ({dish, onDelete}) => {
    const image = dish.image || noImageAvailable;
    const imageStyle = {
        background: `url(${image}) no-repeat center center / cover`,
    };
  
    return (
        <div className="card mb-2">
            <div className="row g-0">
                <div className="col-sm-4 rounded-start" style={imageStyle}/>
                <div className="col-sm-8">
                    <div className="card-body">
                    <h5 className="card-title">{dish.title}</h5>
                    <p className="card-text">{dish.price} KGS</p>
                    <p className="d-flex gap-2">
                        <button
                        className="btn btn-danger"
                        onClick={onDelete}
                        >
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