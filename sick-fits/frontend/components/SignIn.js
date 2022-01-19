/* eslint-disable no-underscore-dangle */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
mutation SIGNIN_MUTATION($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      item {
        id
        email
        name   
      }   
    }
    ... on UserAuthenticationWithPasswordFailure {
      code
      message
    }
  }
}
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{
      query: CURRENT_USER_QUERY,
    }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);

    await signIn();
    resetForm();
  };

  const error = data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined;

  return (
    <>
      <DisplayError error={error} />
      <Form onSubmit={handleSubmit} method="POST">
        <h2>Sign into your account</h2>
        <fieldset>
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
