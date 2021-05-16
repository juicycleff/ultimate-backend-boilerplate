import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountRequest {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  mobile?: string;
}

export class UpdateAccountRequest {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  mobile?: string;
}
