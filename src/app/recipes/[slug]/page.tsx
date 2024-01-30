import { Checkbox } from '@radix-ui/react-checkbox';
import { Separator } from '@src/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/tabs';
import { api } from '@src/trpc/server';
import { IngredientsList } from './ingredients-list';
import { InstructionsList } from './instructions-list';

type Props = {
    params: {
        slug: string;
    };
};

export default async function RecipePage({ params }: Props) {
    const recipe = await api.recipes.getRecipe.query({
        slug: params.slug,
    });

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    const ingredients = (recipe.ingredients as string[]) || [];
    const instructions = (recipe.instructions as string[]) || [];

    return (
        <main className='flex min-h-screen h-screen flex-col p-6 lg:px-8 max-w-[500px] mx-auto'>
            <h1 className='text-4xl font-extrabold text-center text-gray-900 sticky'>{recipe.name}</h1>
            <Tabs defaultValue='ingredients' className='flex flex-col items-center overflow-y-auto'>
                <TabsList className='sticky'>
                    <TabsTrigger value='ingredients'>Ingredients</TabsTrigger>
                    <TabsTrigger value='instructions'>Instructions</TabsTrigger>
                </TabsList>
                <Separator className='my-2' />
                <TabsContent value='ingredients' className='overflow-auto'>
                    <IngredientsList ingredients={ingredients} />
                </TabsContent>
                <TabsContent value='instructions' className='overflow-auto'>
                    <InstructionsList instructions={instructions} />
                </TabsContent>
            </Tabs>
        </main>
    );
}
