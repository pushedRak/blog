export type ApiErrorType =
  | "DB_UPDATE_ERROR"
  | "DB_TRANSACTION_ERROR"
  | "DB_CONNECTION_ERROR"
  | "DB_QUERY_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "INTERNAL_SERVER_ERROR"
  | "UNKNOWN"
  | "BAD_REQUEST";

export interface ApiError {
  code: ApiErrorType;
  message: string;
  detail?: string; // 개발자용 상세 정보
}
