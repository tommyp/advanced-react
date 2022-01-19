/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
query {
  authenticatedItem {
    ... on User {
      id 
      email
      name
      # TODO: query the cart once we have it
    }
  }
}
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}

export const SIGN_OUT_MUTATION = gql`
mutation {
  endSession
}
`;
