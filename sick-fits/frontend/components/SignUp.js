/* eslint-disable no-underscore-dangle */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/dist/client/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
// import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
  createUser(data: {
    email: $email,
    name: $name,
    password: $password,
  }) {
    id
    email
    name
  }
}
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',

  });

  const [signUp, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
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
        <h2>Sign up for an account</h2>
        <fieldset>
          {data?.createUser && (
          <p>
            Signed up with
            {' '}
            {data.createUser.email}
            {' '}
            - please go ahead and sign in
          </p>
          )}
          <label htmlFor="name">
            Name
            <input type="text" name="name" id="name" onChange={handleChange} placeholder="Your name " autoComplete="name" value={inputs.name} />
          </label>
          <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" onChange={handleChange} placeholder="Your Email Addres" autoComplete="email" value={inputs.email} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" id="password" onChange={handleChange} placeholder="Your password" value={inputs.password} />
          </label>
          <button type="submit">Sign in</button>
        </fieldset>
      </Form>
    </>
  );
}
