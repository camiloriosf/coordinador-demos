import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import Header from "../components/common/header";

function withHeader(Component, { drawer = false } = {}) {
  class WithHeader extends React.Component {
    state = {
      open: false
    };
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
    };
    render() {
      const { ...passThroughProps } = this.props;
      return (
        <div>
          <Header
            open={this.state.open}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
          >
            <Component {...passThroughProps} open={this.state.open} />
          </Header>
          {/* <div style={{ marginTop: 120 }} />
          <Component {...passThroughProps} /> */}
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
