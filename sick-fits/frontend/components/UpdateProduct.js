import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: {
      id: $id
    }) {
    id
    name
    price
    description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
mutation UPDATE_PRODUCT_MUTATION(
  $id: ID!
  $name: String
  $description: String
  $price: Int
) {
  updateProduct(
    id: $id,
    data: {
      name: $name,
      description: $description,
      price: $price,
    }
  ) {
    id
    name
    description
    price
  }
}
`;

export default function UpdateProduct({ id }) {
  // 1. we need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const {
    inputs, handleChange, clearForm,
  } = useForm(data?.Product);

  // 2. we need to get the mutation to update the product
  const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 3. we need the form to handle the updates

  if (loading) return <p>loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            ...inputs,

          },
        });

        Router.push({
          pathname: `/product/${res.data.updateProduct.id}`,
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Update Product</button>
      </fieldset>
    </Form>
  );
}
