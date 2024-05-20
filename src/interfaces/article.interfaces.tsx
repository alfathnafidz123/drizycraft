import { AuthorI, ManagementType } from '@/interfaces/author.interfaces';
import { PagingI } from '@/interfaces/paging.interfaces';

export interface ResArticlesI {
  data: ArticleI[];
  meta: Meta;
}

export interface ArticleI {
  id: string;
  title: string;
  banner: string;
  description: string;
  categories: string[];
  subCategories: string[];
  chilSubCategories: string[];
  tags: string[];
  createdAt: string;
  updatedAt?: Date;
  deletedAt?: Date;
  authorId?: string;
  author?: AuthorI;
  meta: MetaArticle[];
}

export interface MetaArticle {
  id: string;
  title: string;
  realTitle: string;
  description: string;
  image: string;
  articleId: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagingArticleI extends PagingI {
  search?: string;
  category?: string;
}

export interface ResArticleMetadata {
  data: ArticleMetaDataI;
}

export interface ArticleMetaDataI {
  id: string;
  title: string;
  realTitle: string;
  description: string;
  image: string;
  articleId?: string;
  productId?: string;
}

export interface ResArticleI {
  data: DataMetaWithArticle;
}

export interface DataMetaWithArticle {
  id: string;
  title: string;
  realTitle: string;
  description: string;
  image: string;
  articleId: string;
  article: ArticleInner;
}

export interface ArticleInner {
  id: string;
  title: string;
  banner: string;
  description: string;
  categories: string[];
  subCategories: string[];
  chilSubCategories: string[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  authorId: string;
  author?: Author;
}

export interface Author {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: ManagementType;
}
