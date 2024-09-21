import { authenticate } from './admin-authenticate';
import { UserEntity } from '../users/entity/user.entity';
import { adminConfig } from '#src/common/configs/admin.config';
import { Company } from '#src/core/companies/entities/company.entity';
import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';

export const adminOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [UserEntity, Company, CompanyAvatarEntity],
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
