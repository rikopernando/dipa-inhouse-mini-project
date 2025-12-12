/**
 * Custom error types for better error handling
 */

import { HTTP_STATUS_CODES } from './constants';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error. Please check your internet connection.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = 'Resource not found', endpoint?: string) {
    super(message, HTTP_STATUS_CODES.NOT_FOUND, endpoint);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = 'Unauthorized. Please check your API credentials.') {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Too many requests. Please try again later.') {
    super(message, HTTP_STATUS_CODES.TOO_MANY_REQUESTS);
    this.name = 'RateLimitError';
  }
}

/**
 * Handle API errors and transform them into user-friendly error objects
 */
export function handleAPIError(error: unknown, endpoint?: string): never {
  // Network error (no response from server)
  if (error && typeof error === 'object' && 'code' in error) {
    const axiosError = error as { code?: string; message?: string };
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ERR_NETWORK') {
      throw new NetworkError();
    }
  }

  // Axios error with response
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: { status_message?: string; message?: string };
      };
      message?: string;
    };

    const status = axiosError.response?.status;
    const message =
      axiosError.response?.data?.status_message ||
      axiosError.response?.data?.message ||
      axiosError.message;

    switch (status) {
      case HTTP_STATUS_CODES.UNAUTHORIZED:
        throw new UnauthorizedError(message);
      case HTTP_STATUS_CODES.NOT_FOUND:
        throw new NotFoundError(message, endpoint);
      case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
        throw new RateLimitError(message);
      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS_CODES.BAD_GATEWAY:
      case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
        throw new APIError('Server error. Please try again later.', status, endpoint);
      default:
        throw new APIError(message || 'An unexpected error occurred', status, endpoint);
    }
  }

  // Unknown error
  if (error instanceof Error) {
    throw new APIError(error.message);
  }

  throw new APIError('An unexpected error occurred');
}
