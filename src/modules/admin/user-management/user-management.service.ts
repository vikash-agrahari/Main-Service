import { Injectable } from '@nestjs/common';
import { ENUM } from 'src/common/enum';
import { UserEntity } from 'src/entity/user.entity';
import { UserListing } from './interface/user-management.interface';
import { BlockUnblockDto, UserListingDto } from './dto/create-user-management.dto';
import { UserSessionEntity } from 'src/entity/userSession.entity';

@Injectable()
export class UserManagementService {
  constructor(private readonly userEntity: UserEntity,private readonly userSession:UserSessionEntity) {}

  async userListing(userListingDto: UserListingDto) {
    const options: UserListing = userListingDto;
    const pipeline = [];
    const matchCondition = [];
    matchCondition.push({ status: { $ne: ENUM.USER_PROFILE_STATUS.DELETED } });
    if (userListingDto.search) {
      const escapedSearchTerm = userListingDto.search.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\+$&');
      matchCondition.push({
        $or: [
          { firstName: { $regex: `.*${userListingDto.search}.*`, $options: 'si' } },
          { lastName: { $regex: `.*${userListingDto.search}.*`, $options: 'si' } },
          { email: { $regex: `.*${userListingDto.search}.*`, $options: 'si' } },
          { mobileNo: { $regex: `.*${escapedSearchTerm}.*`, $options: 'si' } },
        ],
      });
    }
    pipeline.push({
      $project: {
        _id: '$_id',
        userId: '$userId',
        firstName: '$firstName',
        lastName: '$lastName',
        fullName: '$fullName',
        email: '$email',
        mobileNo: '$mobileNo',
        createdAt: '$createdAt',
      },
    });
    if (matchCondition.length) pipeline.push({ $match: { $and: matchCondition } });
     pipeline.push({ $sort: { createdAt: -1 } });
    options.getCount = true;
    return await this.userEntity.listing(pipeline, options);
  } 

  async blockUnblockService(blockUnblockDto:BlockUnblockDto){
    const checkClientExist = await this.userEntity.getUserDetails({_id:blockUnblockDto.userId});
    if(checkClientExist){
      await this.userEntity.findOneAndUpdate({_id:blockUnblockDto.userId},{blockedStatus:blockUnblockDto.blockedStatus,blockReason:blockUnblockDto.blockReason},{new:true})
     
    }
  }
}
