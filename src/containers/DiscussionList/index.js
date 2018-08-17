import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { showAuthMessage, hideMessage, fetchUsers } from "actions/Auth";
import CardHeader from "@material-ui/core/CardHeader";
import moment from "moment";
import { watchOnComments } from "actions/Discussion";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { withRouter } from "react-router";
import { PulseLoader } from "react-spinners";
import { css } from "react-emotion";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  rowHover: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  noElevation: {
    boxShadow: "none",
    background: "transparent"
  },
  row: {
    display: "flex",
    justifyContent: "center"
  },
  normalText: {
    fontSize: "1rem"
  },
  lessPadding: {
    padding: '6px  0'
  },
  xsText: {
    fontSize: ".75rem"
  },
  smAvatar: {
    width: 30,
    height: 30
  }
});

class DiscussionList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 1500);
    }
  }

  handleClick(event, discussionThread, threadId) {
    const {
      match: { params }
    } = this.props;
    let isAuthUserInList = discussionThread.participants.some(
      d => d.uid === this.props.authUser.uid
    );
    if (!isAuthUserInList) {
      this.props.showAuthMessage(
        "You don't have required permission to participate in this discussion thread"
      );
      return;
    }
    let startupKey = this.props.discussion.selectedStartup;
    this.props.watchOnComments({ threadId, startupKey });
    this.props.history.push(
      `/app/startup-applications/${startupKey}/threads/${threadId}`
    );
  }

  render() {
    const pulseLoaderClass = css`
      text-align: center;
      margin-top: 20px;
    `;

    const {
      match: { params }
    } = this.props;
    const { classes, showMessage, alertMessage } = this.props;
    const { threads, selectedStartup } = this.props.discussion;
    const { startupId } = params

    if (threads && selectedStartup) {
      this.startUpThreads = threads[selectedStartup];
      this.threadCount = this.props.discussion.startupInfoList[startupId] && this.props.discussion.startupInfoList[startupId].threads && Object.keys(this.props.discussion.startupInfoList[startupId].threads).length
    }

    return (
      <div>
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
        <Paper className={`${classes.root} ${classes.noElevation}`}>
          {this.startUpThreads ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>DATE STARTED</TableCell>
                  <TableCell numeric>PARTICIPANTS</TableCell>
                  <TableCell numeric>COMMENTS</TableCell>
                  <TableCell numeric>LATEST ACTIVITY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.startUpThreads).map(key => {
                  let discussionThread = this.startUpThreads[key];
                  return (
                    <TableRow
                      key={key}
                      onClick={event =>
                        this.handleClick(event, discussionThread, key)
                      }
                      className={`${classes.rowHover} ${classes.rowHeight}`}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.normalText}
                      >
                        {discussionThread.title}
                      </TableCell>
                      <TableCell numeric>
                        {moment(discussionThread.createdAt).format("lll")}
                      </TableCell>
                      <TableCell numeric>
                        <div className={classes.row}>
                          {discussionThread.participants.map((user, i) => {
                            return (
                              <Avatar
                                key={i}
                                alt={user.displayName}
                                src={user.photoURL}
                                className={classes.smAvatar}
                              />
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell numeric>
                        {(discussionThread.comments &&
                          Object.keys(discussionThread.comments).length) ||
                          0}
                      </TableCell>
                      <TableCell numeric>
                        <CardHeader
                          className={`${classes.lessPadding} ${classes.xsText}`}
                          avatar={
                            <Avatar
                              alt=""
                              src={discussionThread.lastActivityBy.photoURL}
                              className={classes.smAvatar}
                            />
                          }
                          title={discussionThread.lastActivityBy.displayName}
                          subheader={moment(
                            discussionThread.lastActivityBy.createdAt
                          ).fromNow()}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )
          :
          [
            (
              !this.threadCount  ?
                <h3 className="text-center">No discussion threads created yet!</h3>
                :
                <PulseLoader
                  className={pulseLoaderClass}
                  size={12}
                  loading={true}
                />
            )
          ]}
        </Paper>
      </div>
    );
  }
}

DiscussionList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  let { authUser, showMessage, alertMessage } = state.auth;
  let discussion = state.discussion;
  return { discussion, authUser, showMessage, alertMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    watchOnComments: bindActionCreators(watchOnComments, dispatch),
    showAuthMessage: bindActionCreators(showAuthMessage, dispatch),
    hideMessage: bindActionCreators(hideMessage, dispatch),
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(DiscussionList))
);
