import { Command, CommandRunner } from 'nest-commander';
import { LogService } from './helpers/log.service';
import * as child_process from 'child_process';

interface MigrateCommandOptions {
  type?: 'db' | '';
}

@Command({
  name: 'migrate',
  arguments: '<type>',
  description: 'run migration on a system resource',
})
export class MigrateCommand implements CommandRunner {
  constructor(private readonly logService: LogService) {}

  async run(passedParam: string[], options?: MigrateCommandOptions): Promise<void> {
    try {
      this.logService.log(
        'migrate herrr******************************************************************************',
      );
      child_process.execSync(
        'pnpm dlx prisma migrate dev --name init --schema=./libs/persistence/schema.prisma --preview-feature',
      );
      console.log(passedParam[0]);
    } catch (e) {
      this.logService.error(e.message);
      return Promise.resolve(undefined);
    }
    return Promise.resolve(undefined);
  }
}
