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
        id:string;
    };
    id:string;
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
        id:string;
    };
    about: string;
    address: string;
    title: string;
    type: string;
    categorie: Category[];
    foodTypes: FoodType[];
    id: string;
    userId:string;
}

export type Restaurant = {
    id:string,
    name:string,
    logo:string,
    banner:string,
    address:string,
    description:string,
    zipCode:string,
    isOpen:boolean;
    type:string,
    menuOptions:string[],
    userId:string,
    dishes: Dishes[],
    orders: Orders[],
    avaliations: Avaliation[]
}

export type Avaliation = {
comment:string,
createdAt: string,
id: string,
restaurantId: string,
stars: number,
userId:string,
userName: string 

}

export type Dishes = {
    id:string,
    name:string,
    description:string,
    price:number,
    image:string,
    menuOption:string,
    restaurantId:string
}

export type Orders = {
    id:string,
    restaurantId:string,
    userId:string,
    userName:string,
    address:string,
    orderProductsName:string[],
    orderProductsImage:string[],
    orderProductsObservation:string[],
    zipCode:string,
    orderValue:number,
    status:string
    createdAt: string
}