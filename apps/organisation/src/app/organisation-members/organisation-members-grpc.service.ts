import { Controller } from '@nestjs/common';
import {
  AcceptOrganisationMemberInvitationRequest,
  AcceptOrganisationMemberInvitationResponse,
  DeleteOrganisationMemberRequest,
  DeleteOrganisationMemberResponse,
  FindOrganisationMemberRequest,
  FindOrganisationMemberResponse,
  InviteOrganisationMemberRequest,
  InviteOrganisationMemberResponse,
  OrganisationMemberServiceController,
  ReadOrganisationMemberRequest,
  ReadOrganisationMemberResponse,
  UpdateOrganisationMemberRequest,
  UpdateOrganisationMemberResponse,
  OrganisationMemberServiceControllerMethods,
} from '@ub-boilerplate/protobuf/organisation';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

@Controller()
@OrganisationMemberServiceControllerMethods()
export class OrganisationMembersGrpcService
  implements OrganisationMemberServiceController
{
  acceptOrganisationMemberInvitation(
    request: AcceptOrganisationMemberInvitationRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<AcceptOrganisationMemberInvitationResponse>
    | Observable<AcceptOrganisationMemberInvitationResponse>
    | AcceptOrganisationMemberInvitationResponse {
    return undefined;
  }

  deleteOrganisationMember(
    request: DeleteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteOrganisationMemberResponse>
    | Observable<DeleteOrganisationMemberResponse>
    | DeleteOrganisationMemberResponse {
    return undefined;
  }

  findOrganisationMembers(
    request: FindOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindOrganisationMemberResponse>
    | Observable<FindOrganisationMemberResponse>
    | FindOrganisationMemberResponse {
    return undefined;
  }

  inviteOrganisationMember(
    request: InviteOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<InviteOrganisationMemberResponse>
    | Observable<InviteOrganisationMemberResponse>
    | InviteOrganisationMemberResponse {
    return undefined;
  }

  readOrganisationMember(
    request: ReadOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadOrganisationMemberResponse>
    | Observable<ReadOrganisationMemberResponse>
    | ReadOrganisationMemberResponse {
    return undefined;
  }

  updateOrganisationMember(
    request: UpdateOrganisationMemberRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<UpdateOrganisationMemberResponse>
    | Observable<UpdateOrganisationMemberResponse>
    | UpdateOrganisationMemberResponse {
    return undefined;
  }
}
