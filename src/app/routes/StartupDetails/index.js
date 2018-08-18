import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import StartupDetailWithBgImage from "containers/StartupDetailBgImage";
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { NotificationContainer, NotificationManager } from "react-notifications"


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
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
  };
};

class StartupDetails extends Component {
  state = {
    value: 0,
    open: false,
    threadForm: {
      name: "",
      message: "",
      participants: []
    },
    tabSelected: 'details',
    tabSelectedIndex: 0
  };

  tabs = ['details', 'discussions', 'resources']

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );

    const {match: {params}} = this.props

    if (params.tabId !== 'resources') {
      this.props.getStartupListDetails()

      if (params.tabId === 'discussions') {
        this.props.onSelectStartup(params.startupId)
        this.props.watchOnThread(params.startupId)
      }
    }

    this.state.tabSelected = params.tabId
    this.state.tabSelectedIndex = this.tabs.indexOf(params.tabId)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = type => {
    this.setState({ open: false });
    if (type) {
      // FIXME : direct state mutation is very very bad. did due to something not working and scarcity of time.
      const emails = []
      this.state.threadForm.participants.map(participantString => {
        const {key} = JSON.parse(participantString)
        emails.push(key)
      })
      this.state.threadForm.participants = emails.join(',')

      let thread = this.state.threadForm;
      thread.startupKey = this.selectedStartupDetails._startupId;
      this.props.createThread(thread);
      this.setState({
        threadForm: { name: "", message: "", participants: [] }
      });
      this.props.getStartupListDetails();
    }
  };

  handleChange = (event, value) => {
    const { match: {params} } = this.props
    const index = parseInt(event.currentTarget.getAttribute('index'))
    this.setState({ tabSelected: value, tabSelectedIndex: index })

    let newPath
    const currentPath = this.props.history.location.pathname
    if (params.tabId && currentPath.endsWith(params.tabId)) {
      newPath = currentPath.replace(params.tabId, value)
    }
    this.props.history.push(newPath)
  };

  handleChangeIndex = index => {
    this.setState({ tabSelectedIndex: index });
  };

  handleAddNewThread(event) {
    this.handleClickOpen();
  }

  render() {
    const pulseLoaderClass = css`
      text-align: center;
      margin-top: 20px;
    `;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const { classes, theme } = this.props;
    const { authUser } = this.props;
    const { match: { params } } = this.props;
    const { showMessage, alertMessage } = this.props

    if (this.props.discussion.startupInfoList) {
      this.selectedStartupDetails = this.props.discussion.startupInfoList[params.startupId];
      this.selectedStartupDetails._startupId = params.startupId
    }

    this.users = []
    if (this.props.users) {
      Object.keys(this.props.users).map(email => {
        const user = this.props.users[email]
        if (user.email !== this.props.authUser.email) {
          this.users.push({key: user.email, value: user.displayName})
        }
      })
    }

    return this.selectedStartupDetails ?
    (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match}  title={<span>Startup Details</span>}/>
        <StartupDetailWithBgImage
          startUpName={this.selectedStartupDetails.startUpName}
          founderName={this.selectedStartupDetails.founderName}
          selectedStartUpDetails={this.selectedStartupDetails}
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
            <FormControl fullWidth>
              <InputLabel htmlFor="select-multiple-chip">Team Members *</InputLabel>
              <Select
                multiple
                value={this.state.threadForm.participants}
                onChange={evt =>
                  this.setState({
                    threadForm: {
                      ...this.state.threadForm,
                      participants: evt.target.value
                    }
                  })
                }
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {
                      selected.map((userString) => {
                        const {key, value} = JSON.parse(userString)
                        return <Chip key={key} label={value} className={classes.chip} />
                      })
                    }
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {this.users.map((user) => (
                  <MenuItem
                    key={user.key}
                    value={JSON.stringify(user)}
                    style={{
                      fontWeight:
                      this.state.threadForm.participants.indexOf(user.key) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {user.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            // value={this.state.value}
            value={this.state.tabSelected}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
          >
            <Tab className="tab" label="Details" value="details" index={0} />
            <Tab className="tab" label="Discussions" value="discussions" index={1} />
            <Tab className="tab" label="Resources" value="resources" index={2} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.tabSelectedIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <StartUpApplicationForm initialValues={this.selectedStartupDetails} hideButtons={true} disableForm={true} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {authUser.GUSEC_ROLE === "GUSEC_ADMIN" && (
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={event => this.handleAddNewThread(event)}
                disabled={this.users && this.users.length > 0 ? false : true}
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

        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />

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
  let { authUser, users, showMessage, alertMessage } = state.auth;
  return { discussion, authUser, users, showMessage, alertMessage };
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
