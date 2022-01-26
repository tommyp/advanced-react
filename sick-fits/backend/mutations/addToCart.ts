/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';
import { CartItem } from '../schemas/CartItem';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. query the current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }

  // 2. query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id quantity',
  });

  // 3. see if the item is in their cart
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `there are already ${existingCartItem.quantity} in the cart, increment by 1`
    );
    // 4. if it is, increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
  }

  // 5. if not, add a new cart item

  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: sesh.itemId,
        },
      },
    },
    resolveFields: 'id quantity',
  });
}
