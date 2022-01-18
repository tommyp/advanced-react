import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './user';

export default function Nav() {
  const user = useUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {
        user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
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
