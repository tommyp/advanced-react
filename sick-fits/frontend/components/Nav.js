import Link from 'next/link';
import { useMutation } from '@apollo/client';
import NavStyles from './styles/NavStyles';
import { useUser, SIGN_OUT_MUTATION, CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();

  const [endSession] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{
      query: CURRENT_USER_QUERY,
    }],
  });

  const signOut = () => {
    endSession();
  };

  const { toggleCart } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {
        user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={signOut}>signout</button>
          <button type="button" onClick={toggleCart}>
            cart
            {' '}
            <CartCount count={user.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
          </button>

        </>
        )
      }
      {
        !user && (
          <>
            <Link href="/signin">Sign in</Link>
          </>
        )
      }

    </NavStyles>
  );
}
