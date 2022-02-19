import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';

import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

// mocks for signed out, signed in and signed in with cart items

const noSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [{
  request: { query: CURRENT_USER_QUERY },
  result: { data: { authenticatedItem: fakeUser() } },
}];

const signedInMocksWithCartItems = [{
  request: { query: CURRENT_USER_QUERY },
  result: {
    data: {
      authenticatedItem: fakeUser({
        cart: [fakeCartItem()],
      }),
    },
  },
}];

describe('<Nav/>', () => {
  it('renders signed out user', () => {
    const { container } = render(
      <MockedProvider mocks={noSignedInMocks}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>,
    );

    expect(container).toHaveTextContent('Sign in');
    expect(container).toMatchSnapshot();
  });

  it('renders a full nav when signed in', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={signedInMocks}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>,
    );

    await screen.findByText('Account');

    expect(container).not.toHaveTextContent('Sign in');
    expect(container).toHaveTextContent('Sign out');
    expect(container).toHaveTextContent('My cart');
    expect(container).toMatchSnapshot();
  });

  it('renders the amount of items in the cart', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <CartStateProvider>
          <Nav />
        </CartStateProvider>
      </MockedProvider>,
    );

    await screen.findByText('Account');

    expect(container).not.toHaveTextContent('Sign in');
    expect(container).toHaveTextContent('Sign out');
    expect(container).toHaveTextContent('My cart 3');

    expect(container).toMatchSnapshot();
  });
});
