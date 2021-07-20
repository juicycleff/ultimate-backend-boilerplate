import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cookie, NestCookieRequest } from './cookie.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { req, res } = this.getRequestResponse(context);
    return next.handle().pipe(
      tap(() => {
        const cookieStrings: string[] = req._cookies?.map(this.parseCookie);
        res.header('Set-Cookie', cookieStrings);
      }),
    );
  }

  public parseCookie(cookie: Cookie): string {
    let optionString = '';
    for (const [option = '', value] of Object.entries(cookie.options ?? {})) {
      switch (option) {
        case 'expires':
          optionString += `Expires=${(value as Date).toUTCString()}`;
          break;
        case 'maxAge':
          optionString += `Max-Age=${value}`;
          break;
        case 'domain':
          optionString += `Domain=${value}`;
          break;
        case 'path':
          optionString += `Path=${value}`;
          break;
        case 'secure':
          optionString += `Secure`;
          break;
        case 'httpOnly':
          optionString += 'HttpOnly';
          break;
        case 'sameSite':
          optionString += `SameSite=${value}`;
          break;
        default:
          break;
      }
      optionString += '; ';
    }
    return `${cookie.name}=${encodeURIComponent(cookie.value)}; ${optionString.trim()}`;
  }

  public getRequestResponse(context: ExecutionContext): {
    req: NestCookieRequest<unknown>;
    res: { header: (key: string, value: string[]) => void };
  } {
    const http = context.switchToHttp();
    return { req: http.getRequest(), res: http.getResponse() };
  }
}

@Injectable()
export class GqlCookieInterceptor extends CookiesInterceptor {
  getRequestResponse(context: ExecutionContext) {
    const gql = GqlExecutionContext.create(context);
    return {
      req: gql.getContext().req,
      res: gql.getContext().res,
    };
  }
}
