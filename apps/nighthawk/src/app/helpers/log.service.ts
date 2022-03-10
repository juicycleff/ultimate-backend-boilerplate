import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LogService extends ConsoleLogger {}
