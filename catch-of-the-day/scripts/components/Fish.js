import React from 'react';
import h from '../helpers';

/**
 * Fish
 */
var Fish = React.createClass({
  onOrderButtonClick: function() {
    this.props.addToOrder(this.props.index);
  },
  render: function() {
    var details = this.props.details;
    var isAvailable = (details.status === 'available') ? true : false;
    var buttonText = (isAvailable) ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={'Picture of ' + details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button type="button" disabled={!isAvailable} onClick={this.onOrderButtonClick}>{buttonText}</button>
      </li>
    );
  }
});

export default Fish;
