import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddRes = {
  __typename?: 'AddRes';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type BookFilterInput = {
  author?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BookUpdateInput = {
  author?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<AddRes>;
  updateBook?: Maybe<UpdateRes>;
};


export type MutationAddBookArgs = {
  input: BookFilterInput;
};


export type MutationUpdateBookArgs = {
  input: BookUpdateInput;
};

export type PrettyBook = {
  __typename?: 'PrettyBook';
  file?: Maybe<Url>;
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  pretty?: Maybe<PrettyBook>;
};


export type QueryBookArgs = {
  id: Scalars['ID'];
};


export type QueryPrettyArgs = {
  id: Scalars['ID'];
};

export type Url = {
  __typename?: 'URL';
  fileURL?: Maybe<Scalars['String']>;
};

export type UpdateRes = {
  __typename?: 'UpdateRes';
  book?: Maybe<Book>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddRes: ResolverTypeWrapper<AddRes>;
  Book: ResolverTypeWrapper<Book>;
  BookFilterInput: BookFilterInput;
  BookUpdateInput: BookUpdateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  PrettyBook: ResolverTypeWrapper<PrettyBook>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Url>;
  UpdateRes: ResolverTypeWrapper<UpdateRes>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddRes: AddRes;
  Book: Book;
  BookFilterInput: BookFilterInput;
  BookUpdateInput: BookUpdateInput;
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Mutation: {};
  PrettyBook: PrettyBook;
  Query: {};
  String: Scalars['String'];
  URL: Url;
  UpdateRes: UpdateRes;
}>;

export type AddResResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddRes'] = ResolversParentTypes['AddRes']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBook?: Resolver<Maybe<ResolversTypes['AddRes']>, ParentType, ContextType, RequireFields<MutationAddBookArgs, 'input'>>;
  updateBook?: Resolver<Maybe<ResolversTypes['UpdateRes']>, ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'input'>>;
}>;

export type PrettyBookResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrettyBook'] = ResolversParentTypes['PrettyBook']> = ResolversObject<{
  file?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryBookArgs, 'id'>>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  pretty?: Resolver<Maybe<ResolversTypes['PrettyBook']>, ParentType, ContextType, RequireFields<QueryPrettyArgs, 'id'>>;
}>;

export type UrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['URL'] = ResolversParentTypes['URL']> = ResolversObject<{
  fileURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateResResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRes'] = ResolversParentTypes['UpdateRes']> = ResolversObject<{
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AddRes?: AddResResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PrettyBook?: PrettyBookResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  URL?: UrlResolvers<ContextType>;
  UpdateRes?: UpdateResResolvers<ContextType>;
}>;

