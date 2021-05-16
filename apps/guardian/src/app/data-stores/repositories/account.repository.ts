import { Inject, Injectable } from "@nestjs/common";
import { BaseDatastore } from "../stores/base.datastore";

@Injectable()
export class AccountRepository {
  constructor(private readonly datastore: BaseDatastore<any>) {}
}
