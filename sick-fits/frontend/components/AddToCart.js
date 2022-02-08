import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
mutation ADD_TO_CART_MUTATION($id: ID!) {
  addToCart(productId: $id) {
    id
  }
}
`;

export default function AddToCart({ id }) {
  const { toggleCart } = useCart();

  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{
      query: CURRENT_USER_QUERY,
    }],
  });

  const handleClick = () => {
    addToCart();
    toggleCart();
  };

  return (
    <button disabled={loading} type="button" onClick={handleClick}>
      Add
      {' '}
      {loading && 'ing'}
      {' '}
      to cart 🛒
    </button>
  );
}
