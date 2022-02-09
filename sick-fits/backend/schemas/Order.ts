/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
  // TODO
  // access:
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `tommy is cool ${item.total}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
