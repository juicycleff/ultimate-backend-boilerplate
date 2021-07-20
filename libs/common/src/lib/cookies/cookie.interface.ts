export interface Cookie {
  name: string;
  value: any;
  options?: {
    expires?: Date;
    maxAge?: number;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'None' | 'Lax';
  };
}

export type NestCookieRequest<T> = T & {
  _cookies: Cookie[];
  cookies: Record<string, string>;
};
