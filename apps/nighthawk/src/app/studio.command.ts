import { Command, CommandRunner } from 'nest-commander';
import { LogService } from './helpers/log.service';
import * as child_process from 'child_process';

interface StudioCommandOptions {
  type?: 'studio' | '';
}

@Command({ name: 'start', arguments: '<type>', description: 'run db service' })
export class StudioCommand implements CommandRunner {
  constructor(private readonly logService: LogService) {}

  async run(passedParam: string[], options?: StudioCommandOptions): Promise<void> {
    try {
      this.logService.log(
        '*******************************STARTING STUDIO*******************************',
      );
      child_process.execSync(
        'pnpm dlx prisma studio --port 5556 --schema=./libs/persistence/schema.prisma',
      );
    } catch (e) {
      this.logService.error(e.message);
      return Promise.resolve(undefined);
    }
    return Promise.resolve(undefined);
  }
}
