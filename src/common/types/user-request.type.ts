import { UserEntity } from '../../../../KazanDigitalHack/src/core/users/entity/user.entity';

export type UserRequest = Pick<UserEntity, 'id'>;
