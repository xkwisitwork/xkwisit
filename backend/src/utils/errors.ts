export class AppError extends Error {
  status: number;
  code: string;
  details?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    status = 500,
    code = "INTERNAL_ERROR",
    details?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function badRequest(message: string, details?: AppError["details"]) {
  return new AppError(message, 400, "BAD_REQUEST", details);
}

export function unauthorized(message = "Unauthorized") {
  return new AppError(message, 401, "UNAUTHORIZED");
}

export function forbidden(message = "Forbidden") {
  return new AppError(message, 403, "FORBIDDEN");
}

export function notFound(message = "Not found") {
  return new AppError(message, 404, "NOT_FOUND");
}

export function conflict(message: string) {
  return new AppError(message, 409, "CONFLICT");
}

export function tooManyRequests(message: string) {
  return new AppError(message, 429, "TOO_MANY_REQUESTS");
}

export function validationError(
  message: string,
  details?: AppError["details"],
) {
  return new AppError(message, 422, "VALIDATION_ERROR", details);
}

export function notImplemented(feature = "This feature") {
  return new AppError(
    `${feature} is not implemented yet`,
    501,
    "NOT_IMPLEMENTED",
  );
}
