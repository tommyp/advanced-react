import Link from 'next/link';
import { useMutation } from '@apollo/client';
import NavStyles from './styles/NavStyles';
import { useUser, SIGN_OUT_MUTATION, CURRENT_USER_QUERY } from './User';

export default function Nav() {
  const user = useUser();

  const [endSession, { data, error, loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{
      query: CURRENT_USER_QUERY,
    }],
  });

  const signOut = () => {
    endSession();
  };

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

      <Link href="/cart">Cart</Link>
    </NavStyles>
  );
}
