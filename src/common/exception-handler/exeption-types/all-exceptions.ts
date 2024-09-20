export namespace AllExceptions {
  export enum AuthExceptions {
    IsNotVerified = 'Please add an email to your account. Go to Profile > Settings',
    WrongPassword = 'Wrong password',
    ExpiredToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum UserExceptions {
    UserNotFound = 'User is not found',
    UserAlreadyExists = 'User already exists',
  }

  export enum NotFoundExceptions {
    NotFound = 'Not found',
  }
}
