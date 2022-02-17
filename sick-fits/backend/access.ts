/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// at it's simplest, access control is either a true or false value depending on the users session

import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// permissions check if someone meets a criteria - yes or no
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('tommy');
  },
};

// rule based
// rules can return a boolean - yes or no - or a filter which limits which products they can crud.

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // 1. do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. if not do they own the item
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // they should only see available products
    return { status: 'AVAILABLE' };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn(session)) {
      return false;
    }
    // 1. do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. if not do they own the item
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // 1. do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. if not do they own the item
    return { order: { user: { id: session.itemId } } };
  },
};
