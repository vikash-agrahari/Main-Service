import { Injectable } from '@nestjs/common';
import { ENUM } from 'src/common/enum';
import { UserEntity } from 'src/entity/user.entity';
import { ClientListing } from './interface/client-management.interface';
import { ClientListingDto } from './dto/create-client-management.dto';

@Injectable()
export class UserManagementService {
  constructor(private readonly userEntity: UserEntity) {}

  async clientListing(clientListingDto: ClientListingDto) {
    const options: ClientListing = clientListingDto;
    const pipeline = [];
    const matchCondition = [];
    matchCondition.push({ status: { $ne: ENUM.CLIENT_PROFILE_STATUS.DELETED } });
    if (clientListingDto.search) {
      const escapedSearchTerm = clientListingDto.search.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\+$&');
      matchCondition.push({
        $or: [
          { firstName: { $regex: `.*${clientListingDto.search}.*`, $options: 'si' } },
          { lastName: { $regex: `.*${clientListingDto.search}.*`, $options: 'si' } },
          { email: { $regex: `.*${clientListingDto.search}.*`, $options: 'si' } },
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


 
}
