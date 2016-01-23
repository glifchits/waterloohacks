var React = require('react');

require('./style/post.scss');

var Post = React.createClass({

  render: function() {
    return (
      <div  className="post">
        <div className="date">Monday, August 7th 2015</div>
        <div className="img"></div>
        <div className="caption">
          This is a caption
        </div>
      </div>
    );
  }

});

module.exports = Post;