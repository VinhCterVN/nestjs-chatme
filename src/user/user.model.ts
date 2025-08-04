
// User Model
import { IsDate, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class User {
  
  @IsString()
  @IsNotEmpty()
  displayName: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  
  @IsUrl()
  @IsNotEmpty()
  photoUrl: string;
  
  @IsDate()
  @IsNotEmpty()
  lastActive: Date;
  
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}