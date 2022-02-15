import formatMoney from '../lib/formatMoney';

const OrderItem = ({ item }) => (
  <div className="order-item">
    <img width={100} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
    <div className="item-details">
      <h2>
        {item.name}
      </h2>
      <p>{item.description}</p>
      <p>
        {formatMoney(item.price * item.quantity)}
        {' '}
        -
        <em>
          {item.quantity}
          {' '}
          &times;
          {' '}
          {formatMoney(item.price)}
          {' '}
          each
        </em>
      </p>
    </div>

  </div>
);

export default OrderItem;
