import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY(
  $id: ID!
) {
  product: Product(where: {
    id: $id
  }) {
    name
    price
    description
    id
    photo {
      image {
        publicUrlTransformed
      }
    }
  }
}
`;
export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { product } = data;

  return (
    <ProductStyles data-testid="singleProduct">
      <Head>
        <title>
          {product.name}
          {' '}
          | Sick Fits
        </title>
      </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>

    </ProductStyles>
  );
}

export { SINGLE_ITEM_QUERY };
