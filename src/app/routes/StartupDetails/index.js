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
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

import StartupDisabledFormView from '../StartupDisabledFormView';

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
    open: false,
    threadForm: {
      name: '',
      message: '',
      participants: ''
    }
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

  handleRequestClose = (type) => {
      this.setState({open: false});
      if(type) {
        
        this.setState({ threadForm: { name: '', message: '', participants: ''}})
      }
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
        <Dialog open={this.state.open} onClose={() => this.handleRequestClose(null)} fullWidth>
            <DialogTitle>Create new thread</DialogTitle>
            <DialogContent>
              <div className="jr-card">
                <TextField
                    autoFocus
                    margin="dense"
                    label="Thread name"
                    type="text"
                    onChange={(evt) => this.setState({
                      threadForm: { ...this.state.threadForm, name: evt.target.value }
                      })
                    }
                    defaultValue={this.state.threadForm.name}
                    fullWidth
                    required
                />
                </div>
                <div className="jr-card">
                <TextField
                    autoFocus
                    margin="dense"
                    label="Post content"
                    type="text"
                    fullWidth
                    multiline
                    required
                    onChange={(evt) => this.setState({
                      threadForm: { ...this.state.threadForm, message: evt.target.value }
                      })
                    }
                    defaultValue={this.state.threadForm.message}
                    rows="2"
                />
                </div>
                <div className="jr-card">
                <TextField
                    autoFocus
                    margin="dense"
                    label="Add users (emails separted by a comma)"
                    type="text"
                    fullWidth
                    multiline
                    required
                    defaultValue={this.state.threadForm.participants}
                    onChange={(evt) => this.setState({
                      threadForm: { ...this.state.threadForm, participants: evt.target.value }
                      })
                    }
                    rows="2"
                />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleRequestClose('create')} color="primary">
                    Create
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
          <TabContainer dir={theme.direction}>
            <StartupDisabledFormView selectedStartupDetails={this.props.selectedStartupDetails}/>
          </TabContainer>
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
