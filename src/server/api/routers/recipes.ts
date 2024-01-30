import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@src/server/api/trpc';
import { DBRecipe, recipes } from '@src/server/db/schema';
import { mapRecipe } from '@src/server/mapper/recipe-mapper';
import { load } from 'cheerio';

export const recipesRouter = createTRPCRouter({
    getRecipes: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.recipes.findMany();
    }),
    getRecipe: publicProcedure.input(z.object({ slug: z.string() })).query(({ ctx, input }) => {
        return ctx.db.query.recipes.findFirst({
            where: (recipe, { eq }) => eq(recipe.slug, input.slug),
        });
    }),
    parseRecipe: publicProcedure.input(z.object({ recipe: z.string() })).mutation(async ({ ctx, input }) => {
        try {
            const response = await fetch(input.recipe);

            if (!response.ok) throw new Error('Network response was not ok');

            const $ = load(await response.text());
            const script = $('script[type="application/ld+json"]').text();

            const json = JSON.parse(script);

            const recipe = json['@graph'].find((item: any) => item['@type'] === 'Recipe');

            const dbRecipe = mapRecipe(recipe);

            await ctx.db.insert(recipes).values(dbRecipe);

            return dbRecipe;
        } catch (error) {
            console.error(error);

            throw new Error('Could not parse recipe');
        }
    }),
});
