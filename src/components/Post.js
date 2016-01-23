var React = require('react');
var moment = require('moment');

require('./style/post.scss');

var Post = React.createClass({

  propTypes: {
    img : React.PropTypes.string, //url to image
    date : React.PropTypes.number, //unix millisecond offset
    caption : React.PropTypes.string //user's caption
  },

  render() {
    var postimg = {"backgroundImage" : `url("${this.props.img}")`};
    var postdate = moment.unix(this.props.date).format("MMM Do YY");
    return (
      <div  className="post">
        <div className="date">{postdate}</div>
        <div className="img" style={postimg}></div>
        <div className="caption">
          {this.props.caption}
        </div>
      </div>
    );
  }

});

module.exports = Post;