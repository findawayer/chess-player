/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Required data for signup.' })
export class SignupInput {
  @Field(type => String)
  email: string;

  @Field(type => String)
  @MaxLength(20)
  name: string;

  @Field(type => String)
  @MaxLength(30)
  password: string;
}
