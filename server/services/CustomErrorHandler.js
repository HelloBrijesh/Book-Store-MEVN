class CustomErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
  }

  static alreadyExists(message = "Already Exists") {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Username or Password is wrong") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not Found") {
    return new CustomErrorHandler(404, message);
  }

  static serverError(message = "Internal server Error") {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
