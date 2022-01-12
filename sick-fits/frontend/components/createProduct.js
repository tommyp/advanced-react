import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client'
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? And what types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: { 
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE" 
        photo: {
          create: {
            image: $image
            altText: $name
          }
        }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice shoes",
    price: 32412,
    description: "These are the best shoes",
  });

  const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs
  })

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        
        // submit the input fields to the backend
        const res = await createProduct()
        console.log(res)
        clearForm()
      }}
    >
      <DisplayError error={error}/>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            placeholder="image"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
