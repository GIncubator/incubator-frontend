import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';

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

	componentDidMount() {

	}

	handleClick(event, discussionThread) {
		let isAuthUserInList = discussionThread.participants.some(d => d.uid === this.props.authUser.uid);
		if (!isAuthUserInList) {
			console.log('Not permitted');
			return;
		}
		console.log(this.props);
		console.log(discussionThread);
	}

	render() {
		const { classes } = this.props;
		const {threads} = this.props.discussion;
		let startUpThreads = threads[this.props.selectedStartupDetails._startupId];
		return (
			<Paper className={`${classes.root} ${classes.noElevation}`}>
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
						{startUpThreads && Object.keys(startUpThreads).map((key, val) => {
								let discussionThread = startUpThreads[key];
								return (
									<TableRow key={key} onClick={event => this.handleClick(event, discussionThread)} className={classes.rowHover}>
										<TableCell
											component="th"
											scope="row"
											className={classes.mdText}
										>
											{discussionThread.title}
										</TableCell>
										<TableCell numeric>
											{
												moment(discussionThread.comments[0].createdAt).format('lll')
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
											{discussionThread.comments.length}
										</TableCell>
										<TableCell numeric>
												<CardHeader className={`${classes.noLRPadding} ${classes.xsText}`}
													avatar={
														<Avatar
														alt=""
														src={discussionThread.comments[discussionThread.comments.length - 1].photoURL}
														/>
													}
													title={discussionThread.comments[discussionThread.comments.length - 1].sentBy.displayName}
													subheader={moment(discussionThread.comments[discussionThread.comments.length - 1].createdAt).fromNow()}
												/>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Paper>
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

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchDiscussionThreads: params => dispatch(fetchDiscussionThreads())
// 	};
// };

export default connect(
	mapStateToProps
)(withStyles(styles)(DiscussionList));
