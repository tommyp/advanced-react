import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    authenticatedItem {
    ... on User {
      id
      
      orders {
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
  }
}`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInAnOrder = (order) => order.items.reduce((tally, item) => tally + item.quantity, 0);

const Orders = () => {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }

  const { orders } = data.authenticatedItem;

  console.log(orders);

  return (
    <>
      <Head>
        <title>
          Your orders (
          {orders.length}
          )
        </title>
      </Head>
      <h2>
        You have
        {' '}
        {orders.length}
        {' '}
        orders
      </h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles>
            <Link href={{
              pathname: '/order/[id]',
              query: {
                id: order.id,
              },
            }}
            >
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInAnOrder(order)}
                    {' '}
                    item
                    {countItemsInAnOrder(order) > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length}
                    {' '}
                    Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.description}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </>
  );
};

export default Orders;
