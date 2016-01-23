var React = require('react');
var Post = require('./Post');

require('./style/feed.scss');

var Feed = React.createClass({

  render: function() {
    return (
      <div className="feed">
        <Post />
        <Post />
        <Post />
      </div>
    );
  }

});

module.exports = Feed;