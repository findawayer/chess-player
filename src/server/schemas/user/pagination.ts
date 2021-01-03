/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Max, Min } from 'class-validator';
import { ArgsType, Field, InputType, Int } from 'type-graphql';

@ArgsType()
export class UserPagination {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;
}
