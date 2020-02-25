export interface IProductCompStateCategory {
    label: string;
    value: string;
    id: number;
}

export interface IProductCompState {
    update: boolean;
    name: string;
    description?: string;
    image?: string;
    price: number;
    currency: string;
    category: string;
    categories: Array<IProductCompStateCategory>
}