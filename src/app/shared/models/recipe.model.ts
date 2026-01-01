export interface Nutrition {
    calories: number;
    totalFat: number;
    protein: number;
    carbohydrate: number;
    cholesterol: number;
}

export interface Ingredient {
    name: string;
    checked?: boolean;
}

export interface DirectionStep {
    step: number;
    title: string;
    description: string;
    image?: string; // URL to image
    checked?: boolean;
}

export interface Recipe {
    id: string;
    title: string;
    image: string; // URL
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    servings: number;
    category: string; // e.g., 'Breakfast', 'Vegan', 'Meat', 'Dessert', 'Lunch', 'Chocolate'
    author: string;
    date: string; // ISO date string
    description: string;
    nutrition: Nutrition;
    ingredients: Ingredient[];
    sauceIngredients?: Ingredient[]; // Optional separate list for sauce
    directions: DirectionStep[];
    isFeatured?: boolean; // For the hero banner
    rating?: number; // Optional
}

export interface Category {
    id?: string;
    name: string;
    image: string;
    class?: string;
    color?: string; // e.g., specific gradient or background color class
}
