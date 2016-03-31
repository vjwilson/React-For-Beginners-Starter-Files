import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator';
import h from '../helpers';

/**
 * Order
 */

@autobind
class Order extends React.Component {
  renderOrder(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>;

    if (!fish) {
      return (<li key={key}>Sorry, fish no longer available! {removeButton}</li>);
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup compenent="span" transitionName="count" transitionLeaveTimeout={250} transitionEnterTimeout={250}>
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs. {fish.name}
          {removeButton}
        </span>
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Object.keys(nextProps.fishes).length) {
      return true;
    }
    return false;
  }

  render() {
    var orderIds = Object.keys(this.props.order);

    var total = orderIds.reduce((prevTotal, key) => {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>

        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={5000}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>

        <p>Order</p>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
