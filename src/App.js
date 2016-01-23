var React = require('react');
var Feed = require('./components/Feed');

require('./components/style/app.scss');

var App = React.createClass({

  render() {
    return (
      <div className="app">
        <Feed />
      </div>
    );
  }

});

module.exports = App;