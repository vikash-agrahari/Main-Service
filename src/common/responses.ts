/**
 * @file response
 * @description defines response for entity
 */

import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  SESSION_EXPIRED: 'Session Expired.',
  USER_NOT_EXIST: 'User not exists.',
  INVALID_AUTHORIZATION_TOKEN: 'Invalid authorization token.',
  FIREBASE_ID_TOKEN_EXPIRED: 'The provided firebase ID token has expired',
  USER_ALREADY_EXIST: 'Entered phone number and email is already associated with an account.',
  ACCOUNT_BLOCKED: 'Account has been temporarily blocked. Please contact with admin support.',
  SIGN_UP: 'Sign-up Successfully.',
  LOGOUT: 'Logout successfully.',
  INVALID_OTP: 'Incorrect OTP.',
  EXPIRE_OTP: 'OTP has expired. Please try generating a new one.',
  LOGIN: 'Login Successfully.',
  SAME_PASSWORD: `Password shouldn't be same as your previous password.`,
  SEND_OTP: 'OTP sent successfully.',
  VERIFY_OTP: 'OTP verified successfully.',
  PROFILE_DETAILS: 'Profile Details.',
  PROFILE_UPDATE: 'Profile update successfully.',
  PASSWORD_RESET: 'Password reset successfully.',
  EMAIL_NOT_EXIST: `Couldn't find any account associated with the email address.`,
  USER_EXIST: 'User already exists.',
  INVALID_PASSWORD: 'Enter a valid password.',
  MOBILE_NO_ALREADY_EXIST: 'Entered Phone number is associated with another account.',


};

export const RESPONSE_DATA = {
  SUCCESS: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SUCCESS,
  },
  ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.ERROR,
  },
  USER_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.USER_ALREADY_EXIST,
  },
  EMAIL_NOT_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.EMAIL_NOT_EXIST,
  },
  EXPIRE_OTP: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.EXPIRE_OTP,
  },
  ADMIN_NOT_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.USER_NOT_EXIST,
  },
  SAME_PASSWORD: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.SAME_PASSWORD,
  },
  LOGOUT: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.LOGOUT,
  },
  PASSWORD_RESET: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.PASSWORD_RESET,
  },
  SEND_OTP: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SEND_OTP,
  },
  LOGIN: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.LOGIN,
  },
  PROFILE: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.PROFILE_DETAILS,
  },
  MOBILE_NO_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.MOBILE_NO_ALREADY_EXIST,
  },
  VERIFY_OTP: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.VERIFY_OTP,
  },
};
