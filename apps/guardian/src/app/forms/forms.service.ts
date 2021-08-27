import { Injectable } from '@nestjs/common';
import { KratosService } from '@ub-boilerplate/common';

@Injectable()
export class FormsService {
  constructor(private readonly kratos: KratosService) {}
  async loginSchema(): Promise<any> {
    return await this.kratos.getLoginSchema();
  }

  async registrationSchema(): Promise<any> {
    return await this.kratos.getRegistrationSchema();
  }
}
