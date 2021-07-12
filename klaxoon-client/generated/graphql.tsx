import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  _id: Scalars['ID'];
  url: Scalars['String'];
  title: Scalars['String'];
  autor: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['Float'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  time?: Maybe<Scalars['Float']>;
  keywords?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark: Bookmark;
  removeBookmark: Scalars['Boolean'];
  updateKeywordsBookmark: Bookmark;
};


export type MutationAddBookmarkArgs = {
  url: Scalars['String'];
};


export type MutationRemoveBookmarkArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateKeywordsBookmarkArgs = {
  keywords: Array<Scalars['String']>;
  _id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getAllBookmark: Array<Bookmark>;
  getBookmarkById: Bookmark;
  countBookmark: Scalars['Float'];
};


export type QueryGetAllBookmarkArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetBookmarkByIdArgs = {
  _id: Scalars['ID'];
};

export type AddBookmarkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { addBookmark: (
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, '_id' | 'url' | 'title' | 'autor' | 'createdAt' | 'width' | 'height' | 'time'>
  ) }
);

export type GetAllBookmarkQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type GetAllBookmarkQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countBookmark'>
  & { getAllBookmark: Array<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, '_id' | 'url' | 'title' | 'autor' | 'createdAt' | 'width' | 'height' | 'time'>
  )> }
);

export type GetBookmarkByIdQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type GetBookmarkByIdQuery = (
  { __typename?: 'Query' }
  & { getBookmarkById: (
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, '_id' | 'title' | 'keywords'>
  ) }
);

export type RemoveBookmarkMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type RemoveBookmarkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeBookmark'>
);

export type UpdateKeywordsBookmarkMutationVariables = Exact<{
  _id: Scalars['ID'];
  keywords: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateKeywordsBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { updateKeywordsBookmark: (
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, '_id' | 'keywords'>
  ) }
);


export const AddBookmarkDocument = gql`
    mutation addBookmark($url: String!) {
  addBookmark(url: $url) {
    _id
    url
    title
    autor
    createdAt
    width
    height
    time
  }
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const GetAllBookmarkDocument = gql`
    query getAllBookmark($limit: Int, $page: Int) {
  getAllBookmark(limit: $limit, page: $page) {
    _id
    url
    title
    autor
    createdAt
    width
    height
    time
  }
  countBookmark
}
    `;
export type GetAllBookmarkQueryResult = Apollo.QueryResult<GetAllBookmarkQuery, GetAllBookmarkQueryVariables>;
export const GetBookmarkByIdDocument = gql`
    query getBookmarkById($_id: ID!) {
  getBookmarkById(_id: $_id) {
    _id
    title
    keywords
  }
}
    `;
export type GetBookmarkByIdQueryResult = Apollo.QueryResult<GetBookmarkByIdQuery, GetBookmarkByIdQueryVariables>;
export const RemoveBookmarkDocument = gql`
    mutation removeBookmark($_id: ID!) {
  removeBookmark(_id: $_id)
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const UpdateKeywordsBookmarkDocument = gql`
    mutation updateKeywordsBookmark($_id: ID!, $keywords: [String!]!) {
  updateKeywordsBookmark(_id: $_id, keywords: $keywords) {
    _id
    keywords
  }
}
    `;
export type UpdateKeywordsBookmarkMutationFn = Apollo.MutationFunction<UpdateKeywordsBookmarkMutation, UpdateKeywordsBookmarkMutationVariables>;
export type UpdateKeywordsBookmarkMutationResult = Apollo.MutationResult<UpdateKeywordsBookmarkMutation>;
export type UpdateKeywordsBookmarkMutationOptions = Apollo.BaseMutationOptions<UpdateKeywordsBookmarkMutation, UpdateKeywordsBookmarkMutationVariables>;