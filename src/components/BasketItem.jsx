function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket = Function.prototype,
    addQuantity = Function.prototype,
    minusQuantity = Function.prototype
  } = props;

  return (
    <li classNameName="collection-item">
      {name} <i className="material-icons del-order basket-quantity" onClick={() => minusQuantity(id)}>exposure_neg_1</i> x{quantity} 
      <i className="material-icons del-order basket-quantity" onClick={() => addQuantity(id)}>exposure_plus_1</i>
      {price * quantity} руб.
      <span className="secondary-content" onClick={() => removeFromBasket(id)}>
        <i className="material-icons del-order right">close</i>
      </span>
    </li>
  );
}

export { BasketItem };
