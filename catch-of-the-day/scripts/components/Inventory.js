import React from 'react';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://sizzling-inferno-7336.firebaseio.com/');
import AddFishForm from './AddFishForm';

/**
 * Inventory
 */

@autobind
class Inventory extends React.Component {

  constructor() {
    super();

    this.state = {
      uid: ''
    }
  }

  authenticate(provider) {
    console.log('Trying to auth with ' + provider);
    ref.authWithOAuthPopup(provider, function(err, authData) {
      console.log(authData);
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manange your store's inventory</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
        <input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
        <button type="submit" onClick={this.props.removeFish.bind(null, key)}>Remove Item</button>
      </div>
    )
  }

  render() {
    let logoutButton = <button>Log Out!</button>

    // first check if they are logged in
    if (!this.state.uid) {
      return(
        <div>{this.renderLogin()}</div>
      )
    }

    // then check if they aren't the owner of the current store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store.</p>
          {logoutButton}
        </div>
      )
    }

    return (
      <div>
        {logoutButton}
        <h2>Inventory</h2>

        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm  {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
    linkState: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired 
}

export default Inventory;
