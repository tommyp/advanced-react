import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query: { id } }) => (
  <>
    <UpdateProduct id={id} />
  </>
);

export default UpdatePage;
