import Pagination from '../components/Pagination';
import Products from '../components/Products';

const OrderPage = () => (
  <>
    <Pagination page={1} />
    <Products />
    <Pagination page={1} />

  </>
);

export default OrderPage;
