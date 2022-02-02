//@ts-nocheck
// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
import { gql } from 'tinacms';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: InputMaybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
  form: Scalars['JSON'];
  values: Scalars['JSON'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getCollection: Collection;
  getCollections: Array<Collection>;
  node: Node;
  getDocument: DocumentNode;
  getDocumentList: DocumentConnection;
  getDocumentFields: Scalars['JSON'];
  getBookmarksDocument: BookmarksDocument;
  getBookmarksList: BookmarksConnection;
};


export type QueryGetCollectionArgs = {
  collection?: InputMaybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath?: InputMaybe<Scalars['String']>;
};


export type QueryGetDocumentListArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};


export type QueryGetBookmarksDocumentArgs = {
  relativePath?: InputMaybe<Scalars['String']>;
};


export type QueryGetBookmarksListArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};

export type DocumentNode = BookmarksDocument;

export type Bookmarks = {
  __typename?: 'Bookmarks';
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  keyBinding?: Maybe<Scalars['String']>;
};

export type BookmarksDocument = Node & Document & {
  __typename?: 'BookmarksDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Bookmarks;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type BookmarksConnectionEdges = {
  __typename?: 'BookmarksConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<BookmarksDocument>;
};

export type BookmarksConnection = Connection & {
  __typename?: 'BookmarksConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<BookmarksConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  createDocument: DocumentNode;
  updateBookmarksDocument: BookmarksDocument;
  createBookmarksDocument: BookmarksDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationCreateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdateBookmarksDocumentArgs = {
  relativePath: Scalars['String'];
  params: BookmarksMutation;
};


export type MutationCreateBookmarksDocumentArgs = {
  relativePath: Scalars['String'];
  params: BookmarksMutation;
};

export type DocumentMutation = {
  bookmarks?: InputMaybe<BookmarksMutation>;
};

export type BookmarksMutation = {
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  keyBinding?: InputMaybe<Scalars['String']>;
};

export type BookmarksPartsFragment = { __typename?: 'Bookmarks', title?: string | null, url?: string | null, keyBinding?: string | null };

export type GetBookmarksDocumentQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type GetBookmarksDocumentQuery = { __typename?: 'Query', getBookmarksDocument: { __typename?: 'BookmarksDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Bookmarks', title?: string | null, url?: string | null, keyBinding?: string | null } } };

export type GetBookmarksListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksListQuery = { __typename?: 'Query', getBookmarksList: { __typename?: 'BookmarksConnection', totalCount: number, edges?: Array<{ __typename?: 'BookmarksConnectionEdges', node?: { __typename?: 'BookmarksDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Bookmarks', title?: string | null, url?: string | null, keyBinding?: string | null } } | null } | null> | null } };

export const BookmarksPartsFragmentDoc = gql`
    fragment BookmarksParts on Bookmarks {
  title
  url
  keyBinding
}
    `;
export const GetBookmarksDocumentDocument = gql`
    query getBookmarksDocument($relativePath: String!) {
  getBookmarksDocument(relativePath: $relativePath) {
    sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    data {
      ...BookmarksParts
    }
  }
}
    ${BookmarksPartsFragmentDoc}`;
export const GetBookmarksListDocument = gql`
    query getBookmarksList {
  getBookmarksList {
    totalCount
    edges {
      node {
        id
        sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        data {
          ...BookmarksParts
        }
      }
    }
  }
}
    ${BookmarksPartsFragmentDoc}`;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
  export function getSdk<C>(requester: Requester<C>) {
    return {
      getBookmarksDocument(variables: GetBookmarksDocumentQueryVariables, options?: C): Promise<{data: GetBookmarksDocumentQuery, variables: GetBookmarksDocumentQueryVariables, query: string}> {
        return requester<{data: GetBookmarksDocumentQuery, variables: GetBookmarksDocumentQueryVariables, query: string}, GetBookmarksDocumentQueryVariables>(GetBookmarksDocumentDocument, variables, options);
      },
    getBookmarksList(variables?: GetBookmarksListQueryVariables, options?: C): Promise<{data: GetBookmarksListQuery, variables: GetBookmarksListQueryVariables, query: string}> {
        return requester<{data: GetBookmarksListQuery, variables: GetBookmarksListQueryVariables, query: string}, GetBookmarksListQueryVariables>(GetBookmarksListDocument, variables, options);
      }
    };
  }
  export type Sdk = ReturnType<typeof getSdk>;

// TinaSDK generated code
import { staticRequest } from 'tinacms'
const requester: (doc: any, vars?: any, options?: any) => Promise<any> = async (
  doc,
  vars,
  _options
) => {
  let data = {}
  try {
    data = await staticRequest({
      query: doc,
      variables: vars,
    })
  } catch (e) {
    // swallow errors related to document creation
    console.warn('Warning: There was an error when fetching data')
    console.warn(e)
  }

  return { data, query: doc, variables: vars || {} }
}

/**
 * @experimental this class can be used but may change in the future
 **/
export const ExperimentalGetTinaClient = ()=>getSdk(requester)

