import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('adminJWT') {}
export class JwtUserAuthGuard extends AuthGuard('userJWT') {}
