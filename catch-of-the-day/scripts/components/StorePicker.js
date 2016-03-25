import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

/**
 * StorePicker
 * This will let us make <StorePicker/>
 */

@autobind
class StorePicker extends React.Component {

  render() {
    var name = 'Van';
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store {name}</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    )
  }

  goToStore(event) {
    event.preventDefault();

    // get the data from the input
    var storeId = this.refs.storeId.value;

    // transition from <Storepicket/> to <Inventory/>
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  }
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;
