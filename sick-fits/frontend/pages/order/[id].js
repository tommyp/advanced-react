import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import formatMoney from '../../lib/formatMoney';
import OrderItem from '../../components/OrderItem';

const ORDER_QUERY = gql`
  query ORDER_QUERY(
    $id: ID!
  ) {
    order: Order(where: {
      id: $id
    }) {
      id
      label
      total
      items {
        name
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }

  const { order } = data;

  return (
    <>
      <h2>{order.label}</h2>
      <h3>
        Total:
        {' '}
        {formatMoney(order.total)}
      </h3>
      {order.items.map((orderItem) => <OrderItem key={orderItem.id} item={orderItem} />)}
    </>
  );
};

export default Order;
