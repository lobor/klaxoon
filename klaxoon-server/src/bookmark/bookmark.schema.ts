import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({
  collection: 'bookmark',
})
export class Bookmark {
  @Prop({ type: SchemaMongoose.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  autor: string;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true, type: Number })
  width: number;

  @Prop({ required: true, type: Number })
  height: number;

  @Prop({ type: Number })
  time?: number;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: [String], default: [] })
  keywords: string[];
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

export const BookmarkImport = MongooseModule.forFeature([
  { name: Bookmark.name, schema: BookmarkSchema },
]);
