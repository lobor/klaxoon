import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bookmark {
  @Field((type) => ID)
  _id: string;

  @Field()
  url: string;

  @Field()
  title: string;

  @Field()
  autor: string;

  @Field()
  type: string;

  @Field(() => Float)
  createdAt: number;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;

  @Field(() => Float, { nullable: true })
  time?: number;

  @Field(() => [String], { nullable: true })
  keywords?: string[];
}
