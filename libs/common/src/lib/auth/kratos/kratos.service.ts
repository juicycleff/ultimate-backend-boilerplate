import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KRATOS_OPTIONS_PROVIDER, KratosModuleOptions } from './kratos.options';
import {
  AdminApi,
  Configuration,
  SubmitSelfServiceLoginFlowWithPasswordMethodBodyMethodEnum,
  SubmitSelfServiceRecoveryFlowWithLinkMethodBodyMethodEnum,
  SubmitSelfServiceRegistrationFlowWithPasswordMethodBodyMethodEnum,
  SubmitSelfServiceVerificationFlowWithLinkMethodBodyMethodEnum,
  SubmitSelfServiceSettingsFlowWithPasswordMethodBodyMethodEnum,
  V0alpha1Api,
} from '@ory/kratos-client';
import { axios } from '../../clients';
import { ApolloError } from 'apollo-server-fastify';
import { AccountIdentity } from '../account.type';

@Injectable()
export class KratosService implements OnModuleInit {
  private _kratos: V0alpha1Api;
  private _admin: AdminApi;

  constructor(
    @Inject(KRATOS_OPTIONS_PROVIDER)
    private readonly options: KratosModuleOptions,
  ) {}

  public get public_api(): V0alpha1Api {
    if (!this._kratos) throw new Error('Kratos public API not initialized');
    return this._kratos;
  }

  public get admin_api(): AdminApi {
    if (!this._admin) throw new Error('Kratos admin API not initialized');
    return this._admin;
  }

  private init() {
    if (this.options.public) {
      this._kratos = new V0alpha1Api(new Configuration(this.options.public), '', axios);
    }

    if (this.options.admin) {
      this._admin = new AdminApi(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options.admin.configuration,
        this.options.admin.basePath,
        this.options.admin.axios ?? axios,
      );
    }
  }

  onModuleInit(): any {
    this.init();
  }

  /**
   * Custom methods below
   */
  /**
   * @description Login with password. Basically a wrapper around kratos
   * @param identifier
   * @param password
   * @param options
   */
  async passwordLogin(
    identifier: string,
    password: string,
    options?: { csrfToken: string; withRefresh: boolean; flowOption: any },
  ) {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceLoginFlowWithoutBrowser(
          options?.withRefresh,
          options?.flowOption,
        );

      const rsp = await this.public_api.submitSelfServiceLoginFlow(flow.id, {
        password: password,
        password_identifier: identifier,
        csrf_token: options?.csrfToken,
        method: SubmitSelfServiceLoginFlowWithPasswordMethodBodyMethodEnum.Password,
      });

      return rsp.data;
    } catch (e) {
      if (e?.response?.data?.ui?.messages) {
        throw new HttpException(e.response.data.ui.messages, 400);
      }
      throw e;
    }
  }

  /**
   * @description Registration with password. Basically a wrapper around kratos
   * @param traits
   * @param password
   * @param options
   */
  async passwordRegistration(
    traits: Record<string, any>,
    password: string,
    options?: { csrfToken: string; flowOption: any },
  ) {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceRegistrationFlowWithoutBrowser(
          options?.flowOption,
        );

      for (const node of flow.ui.nodes) {
        // todo: validate input
      }

      const rsp = await this.public_api.submitSelfServiceRegistrationFlow(flow.id, {
        password: password,
        csrf_token: options?.csrfToken,
        traits,
        method:
          SubmitSelfServiceRegistrationFlowWithPasswordMethodBodyMethodEnum.Password,
      });

      return rsp.data;
    } catch (e) {
      if (e?.response?.data?.ui?.messages) {
        throw new HttpException(e.response.data.ui.messages, 400);
      }
      throw e;
    }
  }

  /**
   * @description Account recovery. Basically a wrapper around kratos
   * @param email
   * @param token
   * @param options
   */
  async accountRecovery(
    email: string,
    token: string,
    options?: { csrfToken: string; flowOption: any },
  ) {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceRecoveryFlowWithoutBrowser(
          options?.flowOption,
        );

      const rsp = await this.public_api.submitSelfServiceRecoveryFlow(flow.id, token, {
        method: SubmitSelfServiceRecoveryFlowWithLinkMethodBodyMethodEnum.Password,
        csrf_token: options.csrfToken,
        email: email,
      });

      return rsp.data;
    } catch (e) {
      if (e?.response?.data?.ui?.messages) {
        throw new HttpException(e.response.data.ui.messages, 400);
      }
      throw e;
    }
  }

  /**
   * @description Verify account. Basically a wrapper around kratos
   * @param email
   * @param token
   * @param options
   */
  async verifyAccount(
    email: string,
    token: string,
    options?: { csrfToken: string; flowOption: any },
  ) {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceVerificationFlowWithoutBrowser(
          options?.flowOption,
        );

      const rsp = await this.public_api.submitSelfServiceVerificationFlow(
        flow.id,
        token,
        {
          method: SubmitSelfServiceVerificationFlowWithLinkMethodBodyMethodEnum.Password,
          csrf_token: options.csrfToken,
          email: email,
        },
      );

      return rsp.data;
    } catch (e) {
      if (e?.response?.data?.ui?.messages) {
        throw new HttpException(e.response.data.ui.messages, 400);
      }
      throw e;
    }
  }

  /**
   * @description Logout account. Basically a wrapper around kratos
   * @param token
   */
  async logout(token: string) {
    try {
      const rsp = await this.public_api.submitSelfServiceLogoutFlowWithoutBrowser({
        session_token: token,
      });

      return rsp.data;
    } catch (e) {
      if (e?.response?.data?.ui?.messages) {
        throw new HttpException(e.response.data.ui.messages, 400);
      }
      throw e;
    }
  }

  /**
   * @description Get Server health. Basically a wrapper around kratos
   */
  async health(): Promise<string> {
    try {
      const rsp = await this.admin_api.isAlive();

      return rsp.data.status;
    } catch (e) {
      console.log(e?.response?.data?.ui);
      if (e?.response?.data?.ui?.messages) {
        const messages: string[] = [];
        const codes: string[] = [];
        e.response.data.ui.messages.map((message) => {
          messages.push(message.text);
          codes.push(message.id);
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new ApolloError(messages, codes, e.response.data.ui.messages);
      }
      throw e;
    }
  }

  /**
   * @description Get Server health. Basically a wrapper around kratos
   */
  async whoami(
    xSessionToken?: string,
    cookie?: string,
    options?: any,
  ): Promise<AccountIdentity> {
    try {
      const rsp = await this.public_api.toSession(xSessionToken, cookie, options);
      return new AccountIdentity(rsp.data.identity);
    } catch (e) {
      if (e?.response?.data?.error) {
        const error = e?.response?.data?.error;
        throw new HttpException(error, error.code);
      }
      throw e;
    }
  }

  /**
   * @description Get Server health. Basically a wrapper around kratos
   */
  async updateProfile(
    xSessionToken?: string,
    traits?: any,
    options?: { csrfToken: string; flowOption: any },
  ): Promise<AccountIdentity> {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceSettingsFlowWithoutBrowser(
          xSessionToken,
          options?.flowOption,
        );

      const rsp = await this.public_api.submitSelfServiceSettingsFlow(
        flow.id,
        xSessionToken,
        {
          method: SubmitSelfServiceSettingsFlowWithPasswordMethodBodyMethodEnum.Profile,
          csrf_token: options.csrfToken,
          traits,
        },
      );
      return new AccountIdentity(rsp.data.identity);
    } catch (e) {
      if (e?.response?.data?.error) {
        const error = e?.response?.data?.error;
        throw new HttpException(error.reason, error.code);
      }
      throw e;
    }
  }

  /**
   * @description Update account password. (Basically a wrapper around kratos)
   * @param xSessionToken
   * @param password
   * @param options
   */
  async updatePassword(
    xSessionToken: string,
    password: string,
    options?: { csrfToken: string; flowOption: any },
  ): Promise<AccountIdentity> {
    try {
      const { data: flow } =
        await this.public_api.initializeSelfServiceSettingsFlowWithoutBrowser(
          xSessionToken,
          options?.flowOption,
        );

      const rsp = await this.public_api.submitSelfServiceSettingsFlow(
        flow.id,
        xSessionToken,
        {
          method: SubmitSelfServiceSettingsFlowWithPasswordMethodBodyMethodEnum.Password,
          csrf_token: options.csrfToken,
          password,
        },
      );
      return new AccountIdentity(rsp.data.identity);
    } catch (e) {
      if (e?.response?.data?.error) {
        const error = e?.response?.data?.error;
        throw new HttpException(error.reason, error.code);
      }
      throw e;
    }
  }
}
