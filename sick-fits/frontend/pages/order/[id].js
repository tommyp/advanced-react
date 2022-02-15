import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';
import OrderItem from '../../components/OrderItem';
import OrderStyles from '../../components/styles/OrderStyles';

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
        id
        name
        price
        quantity
        description
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
    <OrderStyles>
      <Head>
        <title>
          Sick Fits -
          {' '}
          {order.id}
        </title>
      </Head>
      <h2>{order.label}</h2>
      <p>
        <span>
          Total:
        </span>
        <span>
          {formatMoney(order.total)}
        </span>
      </p>
      <p>
        <span>Items:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((orderItem) => <OrderItem key={orderItem.id} item={orderItem} />)}
      </div>
    </OrderStyles>
  );
};

export default Order;
