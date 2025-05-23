import { ApiError, ApiErrorType } from "@customTypes/error";
import { NextResponse } from "next/server";

export function createApiError(
  code: ApiErrorType,
  message: string,
  status: number = 500,
  detail?: string
) {
  const error: ApiError = { code, message };
  if (detail) {
    error.detail = detail;
  }

  return NextResponse.json(error, { status });
}
