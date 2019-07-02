module.exports = {
  success: {
    passwordUpdated: {
      code: 'PasswordUpdated',
      message: 'Updated password'
    },
    accountActivated: {
      code: 'AccountActivated',
      message: 'Your account has been activated'
    },
    userDataUpdated: {
      code: 'UserDataUpdated',
      message: 'User data updated successfully'
    },
    userHasAccess: {
      code: 'userHasAccess',
      message: 'The user has access to the event'
    }
  },
  error: {
    unauthorized: {
      code: 'Unauthorized',
      message: 'User Not Authorized'
    },
    expired: {
      code: 'ExpiredToken',
      message: 'Token has expired'
    },
    badRequest: {
      code: 'BadRequest',
      message: 'Error in the request'
    },
    errorUnknown: {
      code: 'ErrorUnknown',
      message: 'Unknown'
    },
    errorFCMToken: {
      code: 'ErrorFCMToken',
      message: 'Error updating FCM Token'
    },
    notificationError: {
      code: 'NotificationError',
      message: 'Firebase notification error'
    },
    refreshTokenExpired: {
      code: 'RefreshTokenExpired',
      message: 'The refresh_token has expired'
    },
    noNotificationsFound: {
      code: 'NoNotificationsFound',
      message: 'No notifications found'
    },
    userExist: {
      code: "UserExist",
      message: "User already registered"
    },
    errorCreateUser: {
      code: 'ErrorCreateUser',
      message: 'Error creating the user.'
    },
    errorUserRole: {
      code: 'ErrorUserRole',
      message: 'You cannot make changes for this role of users.'
    },
    errorData: {
      code: 'DataNotValid',
      message: 'The data provided is not valid.'
    },
    errorPassEmail: {
      code: 'ErrorPassEmail',
      message: 'Email or password not valid.'
    },
    accountBloqued: {
      code: 'AccountBloqued',
      message: 'Your account has been blocked for security reasons.'
    },
    accountNotVerified: {
      code: 'AccountNotVerified',
      message: 'Your account is not verified yet.'
    },
    errorPassword: {
      code: 'ErrorSetPass',
      message: 'The password must have more than 6 characters, and at least one uppercase, one lower case and one number.'
    },
    emailVerificationFailed: {
      code: 'EmailVerificationFailed',
      message: 'Email verification failed.'
    },
    emailAlreadyVerified: {
      code: 'EmailAlreadyVerified',
      message: 'Email already verified.'
    },
    userNotFound: {
      code: 'UserNotFound',
      message: 'The user id provided not exist.'
    },
    userCanNotUpdate: {
      code: 'UserCanNotUpdate',
      message: 'Problem updating user.'
    },
    errorNotActiveDelete: {
      code: 'ErrorNotActiveDelete',
      message: 'This user has not requested to delete the account.'
    },
    errorUserDeleted: {
      code: 'ErrorUserDeleted',
      message: 'This user is allready deleted.'
    },
    errorUserInProcessOfDeleted: {
      code: 'ErrorUserInProcessOfDeleted',
      message: 'This user is allready in process to be deleted.'
    },
    userForbiddenAccess: {
      code: 'userForbiddenAccess',
      message: 'Forbidden access'
    },
    eventDoesNotExists: {
        code: 'eventDoesNotExists',
        message: 'This event does not exists'
    }
  }
}
