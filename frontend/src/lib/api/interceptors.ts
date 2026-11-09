/**
 * API request/response interceptors scaffold.
 */
export type ApiInterceptor = {
  onRequest?: (init: RequestInit) => RequestInit | Promise<RequestInit>;
  onResponse?: (res: Response) => Response | Promise<Response>;
};

export const defaultInterceptors: ApiInterceptor[] = [];
