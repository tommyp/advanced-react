import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const mockProduct = fakeItem();
const mocks = [
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: 'abc123' } },
    result: {
      data: {
        product: mockProduct,
      },
    },
  },
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: '404' } },
    result: {
      errors: [{ message: 'Item not found!!!' }],
    },
  },
];

describe('<SingleProduct />', () => {
  it('renders correctly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id={mockProduct.id} />
      </MockedProvider>,
    );

    await screen.findByTestId('singleProduct');

    expect(container).toMatchSnapshot();
  });

  it('errors out when an item is not found', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="404" />
      </MockedProvider>,
    );

    await screen.findByTestId('graphql-error');

    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!!!');
  });
});
