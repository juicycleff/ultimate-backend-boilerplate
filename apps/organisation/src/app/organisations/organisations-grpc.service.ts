import { Controller } from '@nestjs/common';
import {
  CreateOrganisationRequest,
  CreateOrganisationResponse,
  DeleteOrganisationRequest,
  DeleteOrganisationResponse,
  FindOrganisationRequest,
  FindOrganisationResponse,
  OrganisationAvailableRequest,
  OrganisationAvailableResponse,
  OrganisationServiceController,
  ReadOrganisationRequest,
  ReadOrganisationResponse,
  UpdateOrganisationRequest,
  UpdateOrganisationResponse,
  OrganisationServiceControllerMethods,
} from '@ub-boilerplate/protobuf/organisation';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrganisationCommand } from '../common/commands';

@Controller()
@OrganisationServiceControllerMethods()
export class OrganisationsGrpcService implements OrganisationServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createOrganisation(
    request: CreateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateOrganisationResponse>
    | Observable<CreateOrganisationResponse>
    | CreateOrganisationResponse {
    return this.commandBus.execute(new CreateOrganisationCommand());
  }

  deleteOrganisation(
    request: DeleteOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteOrganisationResponse>
    | Observable<DeleteOrganisationResponse>
    | DeleteOrganisationResponse {
    return undefined;
  }

  findOrganisation(
    request: FindOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindOrganisationResponse>
    | Observable<FindOrganisationResponse>
    | FindOrganisationResponse {
    return undefined;
  }

  organisationAvailable(
    request: OrganisationAvailableRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<OrganisationAvailableResponse>
    | Observable<OrganisationAvailableResponse>
    | OrganisationAvailableResponse {
    return undefined;
  }

  readOrganisation(
    request: ReadOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadOrganisationResponse>
    | Observable<ReadOrganisationResponse>
    | ReadOrganisationResponse {
    return undefined;
  }

  updateOrganisation(
    request: UpdateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<UpdateOrganisationResponse>
    | Observable<UpdateOrganisationResponse>
    | UpdateOrganisationResponse {
    return undefined;
  }
}
