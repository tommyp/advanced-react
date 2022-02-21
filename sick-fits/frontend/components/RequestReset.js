/* eslint-disable no-underscore-dangle */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import Form from './styles/Form';
// import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
mutation REQUEST_RESET_MUTATION($email: String!) {
  sendUserPasswordResetLink(
    email: $email
  ) {
    code
    message
    
  }
}
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',

  });

  const [signUp, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
    // refetchQueries: [{
    //   query: CURRENT_USER_QUERY,
    // }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp().catch(console.error);
    resetForm();
  };

  return (
    <>
      <Form onSubmit={handleSubmit} method="POST">
        <DisplayError error={error} />
        <h2>Request reset</h2>
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
          <p>
            Success! Check your email for a link!
          </p>
          )}
          <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" onChange={handleChange} placeholder="Your email address" autoComplete="email" value={inputs.email} />
          </label>
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </>
  );
}
