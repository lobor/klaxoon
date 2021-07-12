import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Bookmark } from './bookmark.model';
import { BookmarkService } from './bookmark.service';

@Resolver((of) => Bookmark)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Query((returns) => [Bookmark])
  async getAllBookmark(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Bookmark[]> {
    return this.bookmarkService.getAll(limit, page);
  }

  @Query((returns) => Bookmark)
  async getBookmarkById(
    @Args('_id', { type: () => ID }) _id: string,
  ): Promise<Bookmark> {
    return this.bookmarkService.getById(_id);
  }

  @Query((returns) => Number)
  async countBookmark(): Promise<number> {
    return this.bookmarkService.count();
  }

  @Mutation(() => Bookmark)
  async addBookmark(@Args('url') url: string): Promise<Bookmark> {
    return this.bookmarkService.addBookmark(url);
  }

  @Mutation(() => Boolean)
  async removeBookmark(
    @Args('_id', { type: () => ID }) _id: string,
  ): Promise<boolean> {
    await this.bookmarkService.removeById(_id);
    return true;
  }

  @Mutation(() => Bookmark)
  async updateKeywordsBookmark(
    @Args('_id', { type: () => ID }) _id: string,
    @Args('keywords', { type: () => [String] }) keywords: string[],
  ): Promise<Bookmark> {
    return this.bookmarkService.updateKeywordsById(_id, keywords);
  }
}
