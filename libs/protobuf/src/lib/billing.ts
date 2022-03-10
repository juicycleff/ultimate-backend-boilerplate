/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'ultimate_backend.srv.billing';

export enum BillingPlanPriceInterval {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  WEEK = 'WEEK',
  DAY = 'DAY',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export enum BillingInvoiceStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  PAID = 'PAID',
  UNCOLLECTIBLE = 'UNCOLLECTIBLE',
  VOID = 'VOID',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export enum BillingSubscriptionStatus {
  ACTIVE = 'ACTIVE',
  ALL = 'ALL',
  CANCELED = 'CANCELED',
  INCOMPLETE = 'INCOMPLETE',
  INCOMPLETE_EXPIRED = 'INCOMPLETE_EXPIRED',
  PAST_DUE = 'PAST_DUE',
  TRIALING = 'TRIALING',
  UNPAID = 'UNPAID',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export interface TenantBillingSubscription {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  /** @inject_tag: bson:"tenantId,omitempty" */
  tenantId: string;
  /** @inject_tag: bson:"status,omitempty" */
  status: string;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt: string;
  /** @inject_tag: bson:"collectionMethod,omitempty" */
  collectionMethod: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  endedAt: string;
  canceledAt: string;
  latestBillingInvoiceId: string;
  startDate: string;
  trialStart: string;
  trialEnd: string;
  customerEmail: string;
  customerName: string;
}

export interface BillingCustomer {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  /** @inject_tag: bson:"email,omitempty" */
  email: string;
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
}

export interface Address {
  id: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  line: string;
  line2: string;
}

export interface BillingCard {
  id: string;
  name: string;
  cvc: string;
  number: string;
  brand: string;
  currency: string;
  address?: Address;
  expMonth: number;
  expYear: number;
  lastFourDigit: string;
  isDefault: boolean;
}

export interface Price {
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"currency,omitempty" */
  currency: string;
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
  /** @inject_tag: bson:"trialDays,omitempty" */
  trialDays: number;
  /** @inject_tag: bson:"amount,omitempty" */
  amount: number;
}

export interface StripeBillingPlan {
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"currency,omitempty" */
  currency: string;
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
  /** @inject_tag: bson:"trialDays,omitempty" */
  trialDays: number;
  /** @inject_tag: bson:"amount,omitempty" */
  amount: number;
}

export interface Feature {
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"normalizedName,omitempty" */
  normalizedName: string;
  /** @inject_tag: bson:"description,omitempty" */
  description: string;
  /** @inject_tag: bson:"min,omitempty" */
  min: number;
  /** @inject_tag: bson:"max,omitempty" */
  max: number;
  /** @inject_tag: bson:"active,omitempty" */
  active: boolean;
  /** @inject_tag: bson:"full,omitempty" */
  full: boolean;
  /** @inject_tag: bson:"full,omitempty" */
  unit: string;
}

export interface BillingPlan {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  /** @inject_tag: bson:"normalizedName,omitempty" */
  normalizedName: string;
  /** @inject_tag: bson:"prices,omitempty" */
  price?: Price;
  /** @inject_tag: bson:"features,omitempty" */
  features: Feature[];
  /** @inject_tag: bson:"active,omitempty" */
  active: boolean;
  /** @inject_tag: bson:"free,omitempty" */
  free: boolean;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt: string;
  /** @inject_tag: bson:"name,omitempty" */
  name: string;
  /** @inject_tag: bson:"stripeId,omitempty" */
  stripeId: string;
}

export interface BillingInvoice {
  /** @inject_tag: bson:"id,omitempty" */
  id: string;
  accountCountry: string;
  accountName: string;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  billingReason: string;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  dueDate: string;
  endingBalance: number;
  hostedBillingInvoiceUrl: string;
  invoicePdf: string;
  number: string;
  paid: boolean;
  receiptNumber: string;
  startingBalance: number;
  statementDescriptor: string;
  status: string;
  subtotal: number;
  tax: number;
  taxPercent: number;
  total: number;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt: string;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt: string;
}

export interface CreatePriceRequest {
  price: number;
  currency: string;
  id: string;
  nickname: string;
  trialDays: number;
  intervalCount: number;
  interval: string;
}

export interface CreateBillingPlanRequest {
  name: string;
  description: string;
  prices: CreatePriceRequest[];
  features: Feature[];
  active: boolean;
  free: boolean;
}

export interface CreateBillingPlanResponse {
  plan?: BillingPlan;
}

export interface ReadBillingPlanRequest {
  id: string;
}

export interface ReadBillingPlanResponse {
  plan?: BillingPlan;
}

export interface FindBillingPlansRequest {}

export interface FindBillingPlansResponse {
  plans: BillingPlan[];
}

export interface ReadStripeBillingPlanRequest {
  id: string;
}

export interface ReadStripeBillingPlanResponse {
  plan?: StripeBillingPlan;
}

export interface FindStripeBillingPlansRequest {
  productId: string;
}

export interface FindStripeBillingPlansResponse {
  plans: StripeBillingPlan[];
}

export interface ReadBillingInvoiceRequest {
  id: string;
}

export interface ReadBillingInvoiceResponse {
  invoice?: BillingInvoice;
}

export interface FindBillingInvoicesRequest {}

export interface FindBillingInvoicesResponse {
  invoices: BillingInvoice[];
}

/** BillingSubscription */
export interface CreateBillingSubscriptionRequest {
  customerId: string;
  tenantId: string;
  planId: string;
  couponId: string;
  cardId: string;
}

export interface CreateBillingSubscriptionResponse {
  subscription?: TenantBillingSubscription;
}

export interface ChangeBillingSubscriptionRequest {
  customerId: string;
  tenantId: string;
  planId: string;
  couponId: string;
}

export interface ChangeBillingSubscriptionResponse {
  subscription?: TenantBillingSubscription;
}

export interface CancelBillingSubscriptionRequest {
  customerId: string;
  tenantId: string;
}

export interface CancelBillingSubscriptionResponse {
  subscription?: TenantBillingSubscription;
}

export interface ReadBillingSubscriptionRequest {
  id: string;
  tenantId: string;
}

export interface ReadBillingSubscriptionResponse {
  subscription?: TenantBillingSubscription;
}

export interface FindBillingSubscriptionsRequest {
  tenantId: string;
}

export interface FindBillingSubscriptionsResponse {
  subscriptions: TenantBillingSubscription[];
}

/** BillingCards */
export interface CreateBillingCardRequest {
  name: string;
  cvc: string;
  number: string;
  currency: string;
  expMonth: string;
  expYear: string;
  address?: Address;
}

export interface CreateBillingCardResponse {
  card?: BillingCard;
}

export interface SetDefaultBillingCardRequest {
  id: string;
}

export interface SetDefaultBillingCardResponse {
  card?: BillingCard;
}

export interface DeleteBillingCardRequest {
  id: string;
}

export interface DeleteBillingCardResponse {
  card?: BillingCard;
}

export interface ReadBillingCardRequest {
  id: string;
}

export interface ReadBillingCardResponse {
  card?: BillingCard;
}

export interface FindBillingCardsRequest {}

export interface FindBillingCardsResponse {
  cards: BillingCard[];
}

export interface CreateBillingCustomerRequest {
  name: string;
  email: string;
  number: string;
  currency: string;
}

export interface CreateBillingCustomerResponse {
  customer?: BillingCustomer;
}

export interface DeleteBillingCustomerRequest {
  id: string;
}

export interface DeleteBillingCustomerResponse {
  customer?: BillingCustomer;
}

export interface ReadBillingCustomerRequest {
  id: string;
}

export interface ReadBillingCustomerResponse {
  customer?: BillingCustomer;
}

export interface Message {
  say: string;
}

export interface Event {
  /** unique id */
  id: string;
  /** unix timestamp */
  timestamp: number;
  /** message */
  message: string;
  /** message */
  topic: string;
}

export const ULTIMATE_BACKEND_SRV_BILLING_PACKAGE_NAME = 'ultimate_backend.srv.billing';

export interface BillingServiceClient {
  createBillingCustomer(
    request: CreateBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateBillingCustomerResponse>;

  deleteBillingCustomer(
    request: DeleteBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<DeleteBillingCustomerResponse>;

  readBillingCustomer(
    request: ReadBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadBillingCustomerResponse>;

  createBillingPlan(
    request: CreateBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateBillingPlanResponse>;

  readBillingPlan(
    request: ReadBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadBillingPlanResponse>;

  findBillingPlans(
    request: FindBillingPlansRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindBillingPlansResponse>;

  readStripeBillingPlan(
    request: ReadStripeBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadStripeBillingPlanResponse>;

  findStripeBillingPlans(
    request: FindStripeBillingPlansRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindStripeBillingPlansResponse>;

  createBillingCard(
    request: CreateBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateBillingCardResponse>;

  deleteBillingCard(
    request: DeleteBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<DeleteBillingCardResponse>;

  setDefaultBillingCard(
    request: SetDefaultBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<SetDefaultBillingCardResponse>;

  readBillingCard(
    request: ReadBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadBillingCardResponse>;

  findBillingCards(
    request: FindBillingCardsRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindBillingCardsResponse>;

  createBillingSubscription(
    request: CreateBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CreateBillingSubscriptionResponse>;

  cancelBillingSubscription(
    request: CancelBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CancelBillingSubscriptionResponse>;

  changeBillingSubscription(
    request: ChangeBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ChangeBillingSubscriptionResponse>;

  readBillingSubscription(
    request: ReadBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadBillingSubscriptionResponse>;

  findBillingSubscriptions(
    request: FindBillingSubscriptionsRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindBillingSubscriptionsResponse>;

  readBillingInvoice(
    request: ReadBillingInvoiceRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<ReadBillingInvoiceResponse>;

  findBillingInvoices(
    request: FindBillingInvoicesRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindBillingInvoicesResponse>;
}

export interface BillingServiceController {
  createBillingCustomer(
    request: CreateBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateBillingCustomerResponse>
    | Observable<CreateBillingCustomerResponse>
    | CreateBillingCustomerResponse;

  deleteBillingCustomer(
    request: DeleteBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteBillingCustomerResponse>
    | Observable<DeleteBillingCustomerResponse>
    | DeleteBillingCustomerResponse;

  readBillingCustomer(
    request: ReadBillingCustomerRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadBillingCustomerResponse>
    | Observable<ReadBillingCustomerResponse>
    | ReadBillingCustomerResponse;

  createBillingPlan(
    request: CreateBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateBillingPlanResponse>
    | Observable<CreateBillingPlanResponse>
    | CreateBillingPlanResponse;

  readBillingPlan(
    request: ReadBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadBillingPlanResponse>
    | Observable<ReadBillingPlanResponse>
    | ReadBillingPlanResponse;

  findBillingPlans(
    request: FindBillingPlansRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindBillingPlansResponse>
    | Observable<FindBillingPlansResponse>
    | FindBillingPlansResponse;

  readStripeBillingPlan(
    request: ReadStripeBillingPlanRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadStripeBillingPlanResponse>
    | Observable<ReadStripeBillingPlanResponse>
    | ReadStripeBillingPlanResponse;

  findStripeBillingPlans(
    request: FindStripeBillingPlansRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindStripeBillingPlansResponse>
    | Observable<FindStripeBillingPlansResponse>
    | FindStripeBillingPlansResponse;

  createBillingCard(
    request: CreateBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateBillingCardResponse>
    | Observable<CreateBillingCardResponse>
    | CreateBillingCardResponse;

  deleteBillingCard(
    request: DeleteBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<DeleteBillingCardResponse>
    | Observable<DeleteBillingCardResponse>
    | DeleteBillingCardResponse;

  setDefaultBillingCard(
    request: SetDefaultBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<SetDefaultBillingCardResponse>
    | Observable<SetDefaultBillingCardResponse>
    | SetDefaultBillingCardResponse;

  readBillingCard(
    request: ReadBillingCardRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadBillingCardResponse>
    | Observable<ReadBillingCardResponse>
    | ReadBillingCardResponse;

  findBillingCards(
    request: FindBillingCardsRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindBillingCardsResponse>
    | Observable<FindBillingCardsResponse>
    | FindBillingCardsResponse;

  createBillingSubscription(
    request: CreateBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateBillingSubscriptionResponse>
    | Observable<CreateBillingSubscriptionResponse>
    | CreateBillingSubscriptionResponse;

  cancelBillingSubscription(
    request: CancelBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CancelBillingSubscriptionResponse>
    | Observable<CancelBillingSubscriptionResponse>
    | CancelBillingSubscriptionResponse;

  changeBillingSubscription(
    request: ChangeBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ChangeBillingSubscriptionResponse>
    | Observable<ChangeBillingSubscriptionResponse>
    | ChangeBillingSubscriptionResponse;

  readBillingSubscription(
    request: ReadBillingSubscriptionRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadBillingSubscriptionResponse>
    | Observable<ReadBillingSubscriptionResponse>
    | ReadBillingSubscriptionResponse;

  findBillingSubscriptions(
    request: FindBillingSubscriptionsRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindBillingSubscriptionsResponse>
    | Observable<FindBillingSubscriptionsResponse>
    | FindBillingSubscriptionsResponse;

  readBillingInvoice(
    request: ReadBillingInvoiceRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ReadBillingInvoiceResponse>
    | Observable<ReadBillingInvoiceResponse>
    | ReadBillingInvoiceResponse;

  findBillingInvoices(
    request: FindBillingInvoicesRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<FindBillingInvoicesResponse>
    | Observable<FindBillingInvoicesResponse>
    | FindBillingInvoicesResponse;
}

export function BillingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createBillingCustomer',
      'deleteBillingCustomer',
      'readBillingCustomer',
      'createBillingPlan',
      'readBillingPlan',
      'findBillingPlans',
      'readStripeBillingPlan',
      'findStripeBillingPlans',
      'createBillingCard',
      'deleteBillingCard',
      'setDefaultBillingCard',
      'readBillingCard',
      'findBillingCards',
      'createBillingSubscription',
      'cancelBillingSubscription',
      'changeBillingSubscription',
      'readBillingSubscription',
      'findBillingSubscriptions',
      'readBillingInvoice',
      'findBillingInvoices',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('BillingService', method)(
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
      GrpcStreamMethod('BillingService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const BILLING_SERVICE_NAME = 'BillingService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
