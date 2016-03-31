import React from 'react';
import h from '../helpers';

/**
 * Fish
 */

class Fish extends React.Component {
  onOrderButtonClick () {
    this.props.addToOrder(this.props.index);
  }

  render() {
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
        <button type="button" disabled={!isAvailable} onClick={this.onOrderButtonClick.bind(this)}>{buttonText}</button>
      </li>
    );
  }
}

export default Fish;
