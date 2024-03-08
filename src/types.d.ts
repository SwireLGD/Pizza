export interface ApiDish {
    title: string;
    price: number;
    image: string;
}

export interface Dish extends ApiDish {
    id: string;
}

export interface ApiDishes {
    [id: string]: ApiDish;
}

export interface CartDish {
    dish: Dish;
    amount: number;
}

export interface DishMutation {
    title: string;
    image: string;
    price: string;
}