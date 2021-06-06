export const SUCCESS = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const SESSION_EXPIRED = 401;
export const NOT_FOUND = 404;
export const RESOURCE_IN_USED = 424;
export const INTERNAL_SERVER_ERROR = 500;

export const isSuccess = (httpStatusCode) => {
  return httpStatusCode >= 200 && httpStatusCode <= 299;
};

export const isClientError = (httpStatusCode) => {
  return httpStatusCode >= 400 && httpStatusCode <= 499;
};

export const isServerError = (httpStatusCode) => {
  return httpStatusCode >= 500 && httpStatusCode <= 599;
};

export const isError = (httpStatusCode) => {
  return isClientError(httpStatusCode) || isServerError(httpStatusCode);
};
