import { AppService } from "./app.service";
import {ObjectType, Query, Resolver} from "@nestjs/graphql";

@ObjectType()
class AppType {}

@Resolver(of => AppType)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  version(): string {
    return this.appService.getVersion();
  }

}
