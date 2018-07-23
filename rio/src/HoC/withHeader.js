import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import Header from "../components/common/header";

function withHeader(Component, { drawer = false } = {}) {
  class WithHeader extends React.Component {
    render() {
      const { ...passThroughProps } = this.props;
      return (
        <div>
          <Header />
          <div style={{ marginTop: 120 }} />
          <Component {...passThroughProps} />
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
    changePage: bindActionCreators(link => push(link), dispatch)
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithHeader);
}

export default withHeader;
