import { authenticate } from './admin-authenticate';
import { UserEntity } from '../users/entity/user.entity';
import { adminConfig } from '#src/common/configs/admin.config';
import { Section } from '../sections/entities/section.entity';
import { Ground } from '../grounds/entities/ground.entity';
import { Event } from '../events/entities/event.entity';
import { AssetEntity } from '../assets/entities/asset.entity';

export const adminOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [UserEntity, Section, Ground, Event, AssetEntity],
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: adminConfig.adminPanelSecret,
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: adminConfig.adminPanelSecret,
  },
};
