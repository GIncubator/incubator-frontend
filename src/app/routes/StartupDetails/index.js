import React, { Component } from "react";
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

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
    value: 0,
    open: false
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }



  handleClickOpen = () => {
      this.setState({open: true});
  };

  handleRequestClose = () => {
      this.setState({open: false});
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleAddNewThread(event) {
    this.handleClickOpen()
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Button onClick={this.props.onBackClick} variant="raised" color="primary"> Back </Button>
        <StartupDetailWithBgImage />
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occationally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleRequestClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.handleRequestClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
   

        <AppBar className="bg-primary" position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} scrollable scrollButtons="on">
            <Tab className="tab" label="Details" />
            <Tab className="tab" label="Discussions" />
            <Tab className="tab" label="Resources" />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
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
