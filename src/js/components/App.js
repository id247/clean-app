import React, { Component } from 'react'
import { connect } from 'react-redux'

const App = React.createClass({
  render: function() {
    return <div>Привет, { this.props.user }!!!3</div>
  }
});

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
