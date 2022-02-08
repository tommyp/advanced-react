import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  img {
    margin-right: 1rem;
  }
  h3, p {
    margin: 0;
  }
`;

const CartItem = ({ item }) => {
  const { product } = item;
  return (
    <CartItemStyles>
      <img width={100} src={product?.photo.image?.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>
          {product.name}
        </h3>
        <p>
          {formatMoney(product.price * item.quantity)}
          {' '}
          -
          <em>
            {item.quantity}
            {' '}
            &times;
            {' '}
            {formatMoney(product.price)}
            {' '}
            each
          </em>
        </p>
      </div>
      <RemoveFromCart id={item.id} />

    </CartItemStyles>
  );
};

export default function Cart() {
  const user = useUser();
  const { cartOpen, toggleCart } = useCart();

  if (!user) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>
          {user.name}
          &apos;s Cart
        </Supreme>
        <CloseButton type="button" onClick={toggleCart}>&times;</CloseButton>
      </header>

      <ul>
        {user.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <footer>
        <p>
          {formatMoney(calcTotalPrice(user.cart))}
        </p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
