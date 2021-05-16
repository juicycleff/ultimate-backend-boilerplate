import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionRequest {
  @ApiProperty()
  identity: string;

  @ApiProperty()
  password: string;
}

export class UpdateSessionRequest {
  @ApiProperty()
  identity?: string;
}
