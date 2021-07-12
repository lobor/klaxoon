import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    BookmarkModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      // sortSchema: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  providers: [],
})
export class AppModule {}
