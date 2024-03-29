import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GuardService } from './guards.service';
import { BasicStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { CONSTANT } from 'src/common/constant';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { JwtUserStrategy } from './jwt.strategy';
import { JwtAdminStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: CONSTANT.JWT_PASSWORD,
    }),
    PassportModule,
    EntityModule,
  ],
  providers: [GuardService, JwtUserStrategy,JwtAdminStrategy, HttpResponse, BasicStrategy],
  exports: [JwtModule],
})
export class GuardModule {}
