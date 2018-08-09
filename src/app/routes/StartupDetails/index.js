import React, { Component } from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import StartupDetailWithBgImage from "components/StartupDetailBgImage";
import DiscussionList from 'containers/DiscussionList'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import ThreadDialog from 'containers/ThreadDialog'

function TabContainer({ children, dir }) {
  return (
    <div dir={dir}>
      {children}
    </div>
  );
}

const styles = (theme) => {
	return {
		noPadding: {
			padding: 0
		},
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'flex-end',
		},
		icon: {
			margin: theme.spacing.unit,
		},
		button: {
			margin: theme.spacing.unit * 2,
		}
	}
};

class StartupDetails extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleAddNewThread(event) {

  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="pages.startupDetails" />}
        />
        <StartupDetailWithBgImage />
        <AppBar className="bg-primary" position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
          >
            <Tab className="tab" label="Details" />
            <Tab className="tab" label="Discussions" />
            <Tab className="tab" label="Resources" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          	<TabContainer dir={theme.direction}>{"Item One"}</TabContainer>
        	<TabContainer dir={theme.direction}>
				<Button variant="contained" color="default" className={classes.button} onClick={event => this.handleAddNewThread(event)} >
					NEW THREAD
					<Icon className={classNames(classes.icon, 'fa fa-plus-circle')} />
				</Button>
            	<DiscussionList />
          	</TabContainer>
          	<TabContainer dir={theme.direction}>{"Item Three"}</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StartupDetails);
