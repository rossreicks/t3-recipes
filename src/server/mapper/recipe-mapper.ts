import { nanoid } from 'nanoid';
import { DBRecipe } from '../db/schema';

export interface RecipeFromMetadata {
    '@type': string;
    name: string;
    description: string;
    datePublished: string;
    image: string[];
    recipeYield: string[];
    prepTime: string;
    cookTime: string;
    totalTime: string;
    recipeIngredient: string[];
    recipeInstructions: RecipeInstruction[];
    recipeCategory: string[];
    recipeCuisine: string[];
    keywords: string;
    nutrition: Nutrition;
    '@id': string;
    mainEntityOfPage: string;
}

interface Nutrition {
    '@type': string;
    servingSize: string;
    calories: string;
    carbohydrateContent: string;
    proteinContent: string;
    fatContent: string;
    saturatedFatContent: string;
    cholesterolContent: string;
    sodiumContent: string;
    fiberContent: string;
    sugarContent: string;
    unsaturatedFatContent: string;
}

interface RecipeInstruction {
    '@type': string;
    text: string;
    name: string;
    url: string;
}

const getIntFromText = (value: string) => {
    const numbers = value.match(/\d+/g);

    if (numbers) {
        return parseInt(numbers[0]);
    }

    return undefined;
};

export const mapRecipe = (recipe: RecipeFromMetadata) => {
    const mapped: DBRecipe = {
        name: recipe.name,
        slug: nanoid(),
        description: recipe.description,
        images: recipe.image,
        yield: getIntFromText(recipe.recipeYield?.length && recipe.recipeYield[0] ? recipe.recipeYield[0] : ''),
        prepTime: getIntFromText(recipe.prepTime),
        cookTime: getIntFromText(recipe.cookTime),
        totalTime: getIntFromText(recipe.totalTime),
        ingredients: recipe.recipeIngredient,
        instructions: recipe.recipeInstructions?.map((instruction) => instruction.text || instruction.name),
        categories: recipe.recipeCategory,
        cuisines: recipe.recipeCuisine,
        keywords: recipe.keywords?.split(','),
    };

    return mapped;
};
