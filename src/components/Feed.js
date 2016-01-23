var React = require('react');
var Post = require('./Post');

require('./style/feed.scss');

var Feed = React.createClass({

  render() {
    return (
      <div className="feed">
        <Post 
          img = {"https://cupcakejunky.files.wordpress.com/2011/02/cute-pig1.jpg"}
          date = {1450710313}
          caption = {"I am happy. This is a test caption"}/>
      </div>
    );
  }

});

module.exports = Feed;