import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const OrderItemStyles = styled.li`
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

const OrderItem = ({ item }) => (
  <OrderItemStyles>
    <img width={100} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
    <div>
      <h3>
        {item.name}
      </h3>
      <p>
        {formatMoney(item.price * item.quantity)}
        {' '}
        -
        <em>
          {item.quantity}
          {' '}
          &times;
          {' '}
          {formatMoney(item.price)}
          {' '}
          each
        </em>
      </p>
    </div>

  </OrderItemStyles>
);

export default OrderItem;
