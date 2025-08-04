import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class UpdateUserInput {
  @IsNotEmpty()
  displayName?: string;
  
  @IsEmail()
  email?: string;
  
  @IsNotEmpty()
  password?: string;
  
  @IsPhoneNumber()
  phoneNumber?: string;
  
  @IsUrl()
  photoUrl?: string;
}