import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Required data for signup.' })
export class SignupInput {
  @Field(type => String)
  @IsEmail()
  email: string;

  @Field(type => String)
  @MaxLength(20, { message: 'name must be no longer than 20 characters' })
  name: string;

  @Field(type => String)
  @MinLength(3, { message: 'password must be longer than 3 characters' })
  @MaxLength(50, { message: 'password must be no longer than 50 characters' })
  password: string;
}
