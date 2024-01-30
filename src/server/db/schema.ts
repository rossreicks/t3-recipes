// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import {
    bigint,
    index,
    int,
    json,
    mysqlTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';
import { AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `t3-recipes_${name}`);

export type DBRecipe = {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    yield?: number;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    ingredients?: string[];
    instructions?: string[];
    categories?: string[];
    cuisines?: string[];
    keywords?: string[];
    createdAt?: Date;
    updatedAt?: Date;
};

export const recipes = mysqlTable(
    'recipe',
    {
        id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
        name: varchar('name', { length: 256 }).unique().notNull(),
        slug: varchar('slug', { length: 256 }).notNull(),
        description: varchar('description', { length: 1024 }),
        images: json('images'),
        yield: int('yield'),
        prepTime: int('prepTime'),
        cookTime: int('cookTime'),
        totalTime: int('totalTime'),
        ingredients: json('ingredients'),
        instructions: json('instructions'),
        categories: json('categories'),
        cuisines: json('cuisines'),
        keywords: json('keywords'),
        createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
        updatedAt: timestamp('updatedAt').onUpdateNow(),
    },
    (table) => ({
        slugIndex: index('slug_idx').on(table.slug),
    })
);

export const users = mysqlTable('user', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified', {
        mode: 'date',
        fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar('image', { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
}));

export const accounts = mysqlTable(
    'account',
    {
        userId: varchar('userId', { length: 255 }).notNull(),
        type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
        provider: varchar('provider', { length: 255 }).notNull(),
        providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: int('expires_at'),
        token_type: varchar('token_type', { length: 255 }),
        scope: varchar('scope', { length: 255 }),
        id_token: text('id_token'),
        session_state: varchar('session_state', { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
        userIdIdx: index('userId_idx').on(account.userId),
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
    'session',
    {
        sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
        userId: varchar('userId', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (session) => ({
        userIdIdx: index('userId_idx').on(session.userId),
    })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
    'verificationToken',
    {
        identifier: varchar('identifier', { length: 255 }).notNull(),
        token: varchar('token', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);
