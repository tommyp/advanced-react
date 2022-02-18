import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });

  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });

  it('Updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={12} />);
    expect(container.textContent).toBe('12');
    rerender(<CartCount count={13} />);
    expect(container.textContent).toBe('1312');
    await wait(400);
    expect(container.textContent).toBe('13');

    expect(container).toMatchSnapshot();
  });
});
