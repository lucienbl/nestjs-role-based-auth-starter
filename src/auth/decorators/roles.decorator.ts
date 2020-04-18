import { SetMetadata } from '@nestjs/common';
import { Roles } from '../Roles';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata('roles', roles);