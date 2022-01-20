/* eslint-disable no-underscore-dangle */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../lib/useForm';
import Form from './styles/Form';
// import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
  redeemUserPasswordResetToken(
    email: $email,
    password: $password,
    token: $token,
  ) {
    code
    message
  }
}
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [redeemResetTolen, { data }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await redeemResetTolen().catch(console.error);
    console.log(res);
    resetForm();
  };

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken : undefined;

  return (
    <>
      <Form onSubmit={handleSubmit} method="POST">
        <DisplayError error={error} />
        <h2>Reset your password</h2>
        <fieldset>
          {data?.redeemUserPasswordReset === null && (
          <p>
            Success!
          </p>
          )}
          <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" onChange={handleChange} placeholder="Your Email Addres" autoComplete="email" value={inputs.email} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" id="password" onChange={handleChange} placeholder="Your password" value={inputs.password} />
          </label>
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </>
  );
}
