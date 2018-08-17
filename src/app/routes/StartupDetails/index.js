import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import StartupDetailWithBgImage from "components/StartupDetailBgImage";
import DiscussionList from "containers/DiscussionList";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import ContainerHeader from "components/ContainerHeader/index";
import StartupDisabledFormView from "../StartupDisabledFormView";
import { createThread, watchOnThread } from "actions/Discussion";
import { onSelectStartup } from "actions/Discussion";
import StartUpApplicationForm from 'components/StartUpApplicationForm'
import AddCircle from '@material-ui/icons/AddCircle';
import { PulseLoader} from 'react-spinners'
import { css } from 'react-emotion'
import { getStartupListDetails } from "actions/Auth";

function TabContainer({ children, dir }) {
  return <div dir={dir}>{children}</div>;
}

const styles = theme => {
  return {
    noPadding: {
      padding: 0
    },
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end"
    },
    icon: {
      margin: theme.spacing.unit
    },
    button: {
      margin: '15px 10px 10px 0px',
      padding: '4px 8px 4px 0px'
    },
    dialogHeader: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'inline-block',
      'margin-left': '10px'
    }
  };
};

class StartupDetails extends Component {
  state = {
    value: 0,
    open: false,
    threadForm: {
      name: "",
      message: "",
      participants: ""
    }
  };

  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );

    const {match: {params}} = this.props
    this.props.getStartupListDetails()
    this.props.onSelectStartup(params.startupId)
    this.props.watchOnThread(params.startupId)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = type => {
    this.setState({ open: false });
    if (type) {
      let thread = this.state.threadForm;
      thread.startupKey = this.selectedStartupDetails._startupId;
      this.props.createThread(thread);
      this.setState({
        threadForm: { name: "", message: "", participants: "" }
      });
      this.props.getStartupListDetails();
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleAddNewThread(event) {
    this.handleClickOpen();
  }

  render() {
    const pulseLoaderClass = css`
      text-align: center;
      margin-top: 20px;
    `;
    const { classes, theme } = this.props;
    const { authUser } = this.props;
    const {
      match: { params }
    } = this.props;


    if (this.props.discussion.startupInfoList) {
      this.selectedStartupDetails = this.props.discussion.startupInfoList[params.startupId];
      this.selectedStartupDetails._startupId = params.startupId
    }

    return this.selectedStartupDetails ?
    (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match}  title={<span>Startup Details</span>}/>
        <StartupDetailWithBgImage
          name={this.selectedStartupDetails.name}
          founderName={this.selectedStartupDetails.founderName}
        />
        <Dialog
          open={this.state.open}
          onClose={() => this.handleRequestClose(null)}
          fullWidth
        >
          <DialogTitle>
            <i style={{'fontSize': '48px'}}>
              <AddCircle fontSize="inherit" />
            </i>
            <div className={classes.dialogHeader}>Create new thread</div>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Thread name"
              type="text"
              onChange={evt =>
                this.setState({
                  threadForm: {
                    ...this.state.threadForm,
                    name: evt.target.value
                  }
                })
              }
              defaultValue={this.state.threadForm.name}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Post content"
              type="text"
              fullWidth
              multiline
              required
              onChange={evt =>
                this.setState({
                  threadForm: {
                    ...this.state.threadForm,
                    message: evt.target.value
                  }
                })
              }
              defaultValue={this.state.threadForm.message}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Add users (emails separted by a comma)"
              type="text"
              fullWidth
              multiline
              required
              defaultValue={this.state.threadForm.participants}
              onChange={evt =>
                this.setState({
                  threadForm: {
                    ...this.state.threadForm,
                    participants: evt.target.value
                  }
                })
              }
              rows="2"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleRequestClose("create")}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

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
          <TabContainer dir={theme.direction}>
            {/* <StartupDisabledFormView
              selectedStartupDetails={this.selectedStartupDetails}
            /> */}
            <StartUpApplicationForm initialValues={this.selectedStartupDetails} hideButtons={true} disableForm={true} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {authUser.GUSEC_ROLE === "GUSEC_ADMIN" && (
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={event => this.handleAddNewThread(event)}
              >
                <Icon
                  className={classNames(classes.icon, "fa fa-plus-circle")}
                />
                NEW THREAD
              </Button>
            )}
            <DiscussionList history={this.props.history} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <h2 className="text-center mt-5">Nothing to show here yet!</h2>
          </TabContainer>
        </SwipeableViews>
      </div>
    )
    :
    <PulseLoader
      className={pulseLoaderClass}
      size={12}
      loading={true}
    />
  }
}

const mapStateToProps = state => {
  let discussion = state.discussion;
  let { authUser } = state.auth;
  return { discussion, authUser };
};

const mapDispatchToProps = dispatch => {
  return {
    createThread: bindActionCreators(createThread, dispatch),
    watchOnThread: bindActionCreators(watchOnThread, dispatch),
    onSelectStartup: bindActionCreators(onSelectStartup, dispatch),
    getStartupListDetails: bindActionCreators(getStartupListDetails, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(StartupDetails));
