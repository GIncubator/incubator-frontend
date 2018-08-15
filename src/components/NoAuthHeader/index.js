import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER
} from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import MailNotification from "../MailNotification";
import AppNotification from "../AppNotification";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { switchLanguage, toggleCollapsedNav } from "actions/Setting";
import IntlMessages from "util/IntlMessages";
import LanguageSwitcher from "components/LanguageSwitcher/index";
import Menu from "components/TopNav/Menu";
import UserInfoPopup from "components/UserInfo/UserInfoPopup";

class NoAuthHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false
    };
  }

  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }

  render() {
    const {
      drawerType,
      locale,
      navigationStyle,
      horizontalNavPosition
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-block d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
        ? "d-block"
        : "d-none";

    return (
      <AppBar className="app-main-header" position="static">
        <Toolbar>
          <Link className="app-logo d-none d-sm-block mb-0 mr-auto" to="/">
            <img
              src={require('public/images/gusec-logo.png')}
              alt="Gusec Incubator"
              title="Gusec Incubator"
            />
          </Link>

          <SearchBox styleName="d-none d-sm-block" />

          <Button size="small" className="ml-3 text-white d-none d-sm-block">
            <Link className="mb-0 mr-auto" style={{color: '#fff'}} to="/signin">
              Login
            </Link>
          </Button>

          <Button size="small" className="ml-3 text-white d-none d-sm-block">
            <Link className="mb-0 mr-auto" style={{color: '#fff'}} to="/signup">
              Sign Up
            </Link>
          </Button>

          <div className="d-inline-block d-sm-none list-inline-item">
            <Dropdown
              className="quick-menu nav-searchbox"
              isOpen={this.state.searchBox}
              toggle={this.onSearchBoxSelect.bind(this)}
            >
              <DropdownToggle
                className="d-inline-block"
                tag="span"
                data-toggle="dropdown"
              >
                <IconButton className="icon-btn size-30">
                  <i className="zmdi zmdi-search zmdi-hc-fw" />
                </IconButton>
              </DropdownToggle>

              <DropdownMenu right className="p-0">
                <SearchBox
                  styleName="search-dropdown"
                  placeholder=""
                  onChange={this.updateSearchText.bind(this)}
                  value={this.state.searchText}
                />
              </DropdownMenu>
            </Dropdown>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition
  } = settings;
  return { drawerType, locale, navigationStyle, horizontalNavPosition };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, switchLanguage }
  )(NoAuthHeader)
);
