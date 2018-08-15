import React from "react";
import { withRouter } from "react-router-dom";
import Menu from "./Menu";
import Header from "components/Header/index"

class TopNav extends React.Component {
  render() {
    return (
      <Header style={{left: 0}} />
      // <div className={`app-top-nav d-none d-md-block ${this.props.styleName}`}>
      //     <div className="d-flex app-toolbar align-items-center">
      //         <Menu/>
      //     </div>
      // </div>
    );
  }
}

export default withRouter(TopNav);

TopNav.defaultProps = {
  styleName: ""
};
