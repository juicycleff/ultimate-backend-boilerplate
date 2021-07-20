import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AdminApi, PublicApi } from '@ory/hydra-client';
import { HYDRA_OPTIONS_PROVIDER, HydraModuleOptions } from './hydra.options';

@Injectable()
export class HydraService implements OnModuleInit {
  private _publicApi: PublicApi;
  private _adminApi: AdminApi;

  constructor(
    @Inject(HYDRA_OPTIONS_PROVIDER) private readonly options: HydraModuleOptions,
  ) {}

  public get publicApi(): PublicApi {
    if (!this._publicApi) throw new Error('Public API not initialized');
    return this._publicApi;
  }

  public get adminApi(): AdminApi {
    if (!this._adminApi) throw new Error('Admin API not initialized');
    return this._adminApi;
  }

  private init() {
    if (this.options.public) {
      this._publicApi = new PublicApi(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options.public.configuration,
        this.options.public.basePath,
        this.options.public.axios,
      );
    }

    if (this.options.admin) {
      this._adminApi = new AdminApi(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options.admin.configuration,
        this.options.admin.basePath,
        this.options.admin.axios,
      );
    }
  }

  onModuleInit(): any {
    this.init();
  }
}
