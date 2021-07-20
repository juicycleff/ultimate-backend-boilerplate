import { Injectable } from '@nestjs/common';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { ConfigStore, InjectConfigStore } from '@ultimate-backend/config';
import { HealthStatusResponse } from './common';
import { GuardianConfig } from './common/guardian.config';
import { KratosService } from '@ub-boilerplate/common';

@Injectable()
export class AppService {
  constructor(
    @InjectConfigStore() private readonly config: ConfigStore,
    private readonly kratos: KratosService,
    private readonly boot: BootConfig,
  ) {}

  getConfig(): GuardianConfig {
    return this.config.cache;
  }

  getVersion(): string {
    return this.boot.get('version');
  }

  getData(): { message: string } {
    return { message: 'Welcome to guardian!' };
  }

  async getHealthStatus(): Promise<HealthStatusResponse> {
    return {
      status: 'OK',
      version: this.boot.get('version'),
      authSystem: await this.kratos.health(),
    };
  }
}
