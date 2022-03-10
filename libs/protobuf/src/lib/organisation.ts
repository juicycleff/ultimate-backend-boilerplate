/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'ultimate_backend.srv.organisation';

export enum InvitationStatus {
  /** PENDING - option allow_alias = true; */
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export interface Organisation {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  /** @inject_tag: bson:"normalizedName,omitempty" */
  normalizedName: string;
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"tokens,omitempty" */
  tokens: OrganisationAccess[];
  /** @inject_tag: bson:"createdBy,omitempty" */
  createdBy: string;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt: string;
  /** @inject_tag: bson:"members,omitempty" */
  members: OrganisationMember[];
  /** @inject_tag: bson:"settings,omitempty" */
  settings?: Settings;
  /** @inject_tag: bson:"payment,omitempty" */
  billing?: BillingSettings;
  /** @inject_tag: bson:"payment,omitempty" */
  totalPoints: number;
}

export interface UpdateOrganisationPayload {
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"settings,omitempty" */
  settings?: Settings;
}

export interface OrganisationAccess {
  /** @inject_tag: bson:"key,omitempty" */
  key: string;
  /** @inject_tag: bson:"secret,omitempty" */
  secret: string;
  /** @inject_tag: bson:"active,omitempty" */
  active: boolean;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
}

export interface BillingSettings {
  /** @inject_tag: bson:"currentPlan,omitempty" */
  currentPlan: string;
  /** @inject_tag: bson:"subscriptionPlan,omitempty" */
  currentSubscription: string;
}

export interface ConnectionSettings {
  /** @inject_tag: bson:"host,omitempty" */
  host: string;
}

export interface Settings {
  /** @inject_tag: bson:"connection,omitempty" */
  showStatusIcon: boolean;
  /** @inject_tag: bson:"connection,omitempty" */
  connection?: ConnectionSettings;
}

export interface OrganisationMember {
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
  /** @inject_tag: bson:"email,omitempty" */
  email: string;
  /** @inject_tag: bson:"userId,omitempty" */
  userId: string;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
  /** @inject_tag: bson:"status,omitempty" */
  status: string;
  /** @inject_tag: bson:"role,omitempty" */
  role: string;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt: string;
}

/** Organisation */
export interface CreateOrganisationRequest {
  name: string;
  planId: string;
  couponId: string;
  cardId: string;
}

export interface CreateOrganisationResponse {
  tenant?: Organisation;
}

export interface FindOrganisationRequest {
  filter: string;
}

export interface OrganisationAvailableRequest {
  identifier: string;
}

export interface OrganisationAvailableResponse {
  available: boolean;
}

export interface FindOrganisationResponse {
  tenants: Organisation[];
}

export interface DeleteOrganisationRequest {
  id: string;
}

export interface DeleteOrganisationResponse {
  tenant?: Organisation;
}

export interface ReadOrganisationRequest {
  filter: string;
}

export interface ReadOrganisationResponse {
  tenant?: Organisation;
}

export interface UpdateOrganisationRequest {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  data?: UpdateOrganisationPayload;
}

export interface UpdateOrganisationResponse {
  tenant?: Organisation;
}

/** Organisation Members */
export interface InviteOrganisationMemberRequest {
  /** @inject_tag: bson:"email,omitempty" */
  email: string;
  /** @inject_tag: bson:"userId,omitempty" */
  userId: string;
  /** @inject_tag: bson:"role,omitempty" */
  role: string;
}

export interface InviteOrganisationMemberResponse {
  member?: OrganisationMember;
}

export interface FindOrganisationMemberRequest {
  status: string;
  role: string;
  tenantId: string;
}

export interface FindOrganisationMemberResponse {
  members: OrganisationMember[];
}

export interface DeleteOrganisationMemberRequest {
  id: string;
}

export interface DeleteOrganisationMemberResponse {
  member?: OrganisationMember;
}

export interface ReadOrganisationMemberRequest {
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
}

export interface ReadOrganisationMemberResponse {
  member?: OrganisationMember;
}

export interface UpdateOrganisationMemberRequest {
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
  /** @inject_tag: bson:"status,omitempty" */
  status: string;
  /** @inject_tag: bson:"role,omitempty" */
  role: string;
}

export interface UpdateOrganisationMemberResponse {
  member?: OrganisationMember;
}

export interface AcceptOrganisationMemberInvitationRequest {
  /** @inject_tag: bson:"token,omitempty" */
  token: string;
}

export interface AcceptOrganisationMemberInvitationResponse {
  member?: OrganisationMember;
}

export const ULTIMATE_BACKEND_SRV_ORGANISATION_PACKAGE_NAME =
  'ultimate_backend.srv.organisation';

export interface OrganisationServiceClient {
  /** Organisations */

  createOrganisation(
    request: CreateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateOrganisationResponse>;

  readOrganisation(
    request: ReadOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadOrganisationResponse>;

  findOrganisation(
    request: FindOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindOrganisationResponse>;

  updateOrganisation(
    request: UpdateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<UpdateOrganisationResponse>;

  deleteOrganisation(
    request: DeleteOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<DeleteOrganisationResponse>;

  organisationAvailable(
    request: OrganisationAvailableRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<OrganisationAvailableResponse>;
}

export interface OrganisationServiceController {
  /** Organisations */

  createOrganisation(
    request: CreateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateOrganisationResponse>
    | Observable<CreateOrganisationResponse>
    | CreateOrganisationResponse;

  readOrganisation(
    request: ReadOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadOrganisationResponse>
    | Observable<ReadOrganisationResponse>
    | ReadOrganisationResponse;

  findOrganisation(
    request: FindOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindOrganisationResponse>
    | Observable<FindOrganisationResponse>
    | FindOrganisationResponse;

  updateOrganisation(
    request: UpdateOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<UpdateOrganisationResponse>
    | Observable<UpdateOrganisationResponse>
    | UpdateOrganisationResponse;

  deleteOrganisation(
    request: DeleteOrganisationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteOrganisationResponse>
    | Observable<DeleteOrganisationResponse>
    | DeleteOrganisationResponse;

  organisationAvailable(
    request: OrganisationAvailableRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<OrganisationAvailableResponse>
    | Observable<OrganisationAvailableResponse>
    | OrganisationAvailableResponse;
}

export function OrganisationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createOrganisation',
      'readOrganisation',
      'findOrganisation',
      'updateOrganisation',
      'deleteOrganisation',
      'organisationAvailable',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrganisationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrganisationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORGANISATION_SERVICE_NAME = 'OrganisationService';

export interface OrganisationMemberServiceClient {
  /** Organisation Members */

  inviteOrganisationMember(
    request: InviteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<InviteOrganisationMemberResponse>;

  acceptOrganisationMemberInvitation(
    request: AcceptOrganisationMemberInvitationRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<AcceptOrganisationMemberInvitationResponse>;

  updateOrganisationMember(
    request: UpdateOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<UpdateOrganisationMemberResponse>;

  deleteOrganisationMember(
    request: DeleteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<DeleteOrganisationMemberResponse>;

  readOrganisationMember(
    request: ReadOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadOrganisationMemberResponse>;

  findOrganisationMembers(
    request: FindOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindOrganisationMemberResponse>;
}

export interface OrganisationMemberServiceController {
  /** Organisation Members */

  inviteOrganisationMember(
    request: InviteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<InviteOrganisationMemberResponse>
    | Observable<InviteOrganisationMemberResponse>
    | InviteOrganisationMemberResponse;

  acceptOrganisationMemberInvitation(
    request: AcceptOrganisationMemberInvitationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<AcceptOrganisationMemberInvitationResponse>
    | Observable<AcceptOrganisationMemberInvitationResponse>
    | AcceptOrganisationMemberInvitationResponse;

  updateOrganisationMember(
    request: UpdateOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<UpdateOrganisationMemberResponse>
    | Observable<UpdateOrganisationMemberResponse>
    | UpdateOrganisationMemberResponse;

  deleteOrganisationMember(
    request: DeleteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteOrganisationMemberResponse>
    | Observable<DeleteOrganisationMemberResponse>
    | DeleteOrganisationMemberResponse;

  readOrganisationMember(
    request: ReadOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadOrganisationMemberResponse>
    | Observable<ReadOrganisationMemberResponse>
    | ReadOrganisationMemberResponse;

  findOrganisationMembers(
    request: FindOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindOrganisationMemberResponse>
    | Observable<FindOrganisationMemberResponse>
    | FindOrganisationMemberResponse;
}

export function OrganisationMemberServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'inviteOrganisationMember',
      'acceptOrganisationMemberInvitation',
      'updateOrganisationMember',
      'deleteOrganisationMember',
      'readOrganisationMember',
      'findOrganisationMembers',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrganisationMemberService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrganisationMemberService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORGANISATION_MEMBER_SERVICE_NAME = 'OrganisationMemberService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
