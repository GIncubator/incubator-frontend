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
import {
	showAuthMessage
} from 'actions/Auth';

import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';
import {
	watchOnComments
} from 'actions/Discussion';

const styles = theme => ({
	root: {
		width: "100%",
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	},
	rowHover: {
		'&:hover': {
			cursor: 'pointer'
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
	mdText: {
		fontSize: "1.2rem"
	},
	noLRPadding: {
		paddingLeft: 0,
		paddingRight: 0
	},
	xsText: {
		fontSize: '.75rem'
	}
});

class DiscussionList extends Component {
	constructor() {
		super();
		this.state = {};
	}


	handleClick(event, discussionThread, threadId) {
		let isAuthUserInList = discussionThread.participants.some(d => d.uid === this.props.authUser.uid);
		if (!isAuthUserInList) {
			this.props.showAuthMessage("You don't have required permission to participate in this discussion thread");
			return;
		}
		let startupKey = this.props.discussion.selectedStartup;
		this.props.watchOnComments({threadId, startupKey});
		this.props.history.push(`/startup-applications/${startupKey}/conversations/${threadId}`);
	}

	render() {
		const { classes } = this.props;
		const {threads} = this.props.discussion;
		let startUpThreads = threads[this.props.selectedStartupDetails._startupId];
		return (
			<div>
			<Paper className={`${classes.root} ${classes.noElevation}`}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell numeric>DATE STARTED</TableCell>
							<TableCell numeric>PARTICIPANTS</TableCell>
							<TableCell numeric>COMMENTS</TableCell>
							<TableCell numeric>LATEST ACTIVITY</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{startUpThreads && Object.keys(startUpThreads).map((key) => {
								let discussionThread = startUpThreads[key];
								return (
									<TableRow key={key} onClick={event => this.handleClick(event, discussionThread, key)} className={classes.rowHover}>
										<TableCell
											component="th"
											scope="row"
											className={classes.mdText}
										>
											{discussionThread.title}
										</TableCell>
										<TableCell numeric>
											{
												moment(discussionThread.createdAt).format('lll')
											}
										</TableCell>
										<TableCell numeric>
											<div className={classes.row}>
												{discussionThread.participants.map(
													(user, i) => {
														return (
															<Avatar
																key={i}
																alt={user.displayName}
																src={user.photoURL}
															/>
														);
													}
												)}
											</div>
										</TableCell>
										<TableCell numeric>
											{(discussionThread.comments && Object.keys(discussionThread.comments).length) || 0}
										</TableCell>
										<TableCell numeric>
												<CardHeader className={`${classes.noLRPadding} ${classes.xsText}`}
													avatar={
														<Avatar
														alt=""
														src={discussionThread.lastActivityBy.photoURL}
														/>
													}
													title={discussionThread.lastActivityBy.displayName}
													subheader={moment(discussionThread.lastActivityBy.createdAt).fromNow()}
												/>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Paper>
			</div>
		);
	}
}

DiscussionList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	let { authUser } = state.auth;
	let discussion = state.discussion;
	return { discussion, authUser };
};

const mapDispatchToProps = dispatch => {
  return {
		watchOnComments: bindActionCreators(watchOnComments, dispatch),
		showAuthMessage: bindActionCreators(showAuthMessage, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(DiscussionList));
