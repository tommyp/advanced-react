/* eslint-disable no-alert */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
/* eslint-disable no-restricted-globals */

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item')) {
          deleteProduct().catch((err) => alert(err.mesage));
        }
      }}
    >
      {children}
    </button>
  );
}
