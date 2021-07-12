import { Module } from '@nestjs/common';
import { BookmarkResolver } from './bookmark.resolver';
import { OembedService } from '../oembed/oembed.service';
import { BookmarkImport } from './bookmark.schema';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [BookmarkImport],
  providers: [BookmarkResolver, OembedService, BookmarkService],
})
export class BookmarkModule {}
