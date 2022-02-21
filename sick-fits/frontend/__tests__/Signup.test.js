import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();
const password = 'password';

const mocks = [
  // mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    },
  },
];

describe('<SignUp/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>,
    );

    // type into boxes
    await userEvent.type(
      screen.getByLabelText('Name'),
      user.name,
    );

    await userEvent.type(
      screen.getByLabelText('Email'),
      user.email,
    );

    await userEvent.type(
      screen.getByLabelText('Password'),
      password,
    );

    await userEvent.click(
      screen.getByText('Sign up'),
    );

    await screen.findByText(`Signed up with ${user.email} - please go ahead and sign in`);
  });
});
