type Additional = {
    Additionals: [
        {
            additionalName: string,
            additionalPrice: number,
        }
    ]
}

export type Category = {
    additionals: Additional[];
    categoryTitle: string;
    description: string;
    name: string;
    price: number;
    image: {
        url: string;
    };
}

export type FoodType = {
    foodType: [
        {
            type: string,
        }
    ]
}

export type RestaurantDetails = {
    banner: {
        url: string;
    };
    about: string;
    address: string;
    title: string;
    type: string;
    categorie: Category[];
    foodTypes: FoodType[];
    id: string;
}