export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  /** The author of the article */
  author: Author;
  /** The content of the article */
  content: Scalars['String']['output'];
  /** The creation date of the article */
  createdAt: Scalars['DateTime']['output'];
  /** The id of the article */
  id: Scalars['ID']['output'];
  /** The flag to publish the article */
  published: Scalars['Boolean']['output'];
  /** The title of the article */
  title: Scalars['String']['output'];
  /** The updated date of the article */
  updatedAt: Scalars['DateTime']['output'];
};

export type Author = {
  __typename?: 'Author';
  /** The creation date of the article */
  createdAt: Scalars['DateTime']['output'];
  /** The unique identifier of Author */
  id: Scalars['ID']['output'];
  /** The name of Author */
  name: Scalars['String']['output'];
  /** The updated date of the article */
  updatedAt: Scalars['DateTime']['output'];
  /** The user info of Author */
  user: User;
};

export type CreateArticleInput = {
  /** The content of the article */
  content: Scalars['String']['input'];
  /** The flag to publish the article */
  published: Scalars['Boolean']['input'];
  /** The title of the article */
  title: Scalars['String']['input'];
};

export type CreateAuthorInput = {
  /** The name of Author */
  name: Scalars['String']['input'];
  /** The id of User */
  userId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  /** The email of User */
  email: Scalars['String']['input'];
  /** The password of User */
  password: Scalars['String']['input'];
};

export type FindArticlesFilter = {
  /** The id of the author */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** Filter by published status */
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LoginUser = {
  __typename?: 'LoginUser';
  /** The email of User */
  email: Scalars['String']['output'];
  /** The unique identifier of user */
  id: Scalars['ID']['output'];
  /** The name of Author */
  name?: Maybe<Scalars['String']['output']>;
  /** The token of User */
  token: Scalars['String']['output'];
};

export type LoginUserInput = {
  /** The email of User */
  email: Scalars['String']['input'];
  /** The password of User */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createAuthor: Author;
  createUser: User;
  login: LoginUser;
  removeArticle: Article;
  updateArticle: Article;
  updateAuthor: Author;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationRemoveArticleArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  filter: UpdateArticleFilter;
  input: UpdateArticleInput;
};


export type MutationUpdateAuthorArgs = {
  filter: UpdateAuthorFilter;
  input: UpdateAuthorInput;
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  articles: Array<Article>;
  author: Author;
  user: User;
  users: Array<User>;
};


export type QueryArticleArgs = {
  id: Scalars['String']['input'];
};


export type QueryArticlesArgs = {
  filter: FindArticlesFilter;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type UpdateArticleFilter = {
  /** The id of the article */
  id: Scalars['ID']['input'];
};

export type UpdateArticleInput = {
  /** The content of the article */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The flag to publish the article */
  published?: InputMaybe<Scalars['Boolean']['input']>;
  /** The title of the article */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAuthorFilter = {
  id: Scalars['String']['input'];
};

export type UpdateAuthorInput = {
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  /** The author of User */
  author?: Maybe<Author>;
  /** The creation date of the User */
  createdAt: Scalars['DateTime']['output'];
  /** The email of User */
  email: Scalars['String']['output'];
  /** The id of the User */
  id: Scalars['ID']['output'];
  /** The updated date of the User */
  updatedAt: Scalars['DateTime']['output'];
};
