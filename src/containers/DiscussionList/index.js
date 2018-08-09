import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchDiscussionThreads } from "actions/Discussion";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

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
		this.props.fetchDiscussionThreads();
	}

	handleClick(event, discussionThread) {
		console.log(discussionThread)
	}

	render() {
		const { classes, discussionThreads } = this.props;
		console.log(this.props.discussionThreads);
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
						{discussionThreads &&
							discussionThreads.map(discussionThread => {
								return (
									<TableRow onClick={event => this.handleClick(event, discussionThread)} className={classes.rowHover}>
										<TableCell
											component="th"
											scope="row"
											className={classes.mdText}
										>
											{discussionThread.title}
										</TableCell>
										<TableCell numeric>
											{discussionThread.sentAt}
										</TableCell>
										<TableCell numeric>
											<div className={classes.row}>
												{discussionThread.participants.map(
													user => {
														return (
															<Avatar
																alt=""
																src="https://s.gravatar.com/avatar/3300539243f6973420509d515aef07ed?s=100&r=x&d=identicon"
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
														src="https://s.gravatar.com/avatar/3300539243f6973420509d515aef07ed?s=100&r=x&d=identicon"
														/>
													}
													title={discussionThread.lastActivity.user || 'Dummy Name'}
													subheader={discussionThread.lastActivity.sentAt}
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

const mapStateToProps = ({ discussion }) => {
	const { discussionThreads } = discussion;
	return {
		discussionThreads
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchDiscussionThreads: params => dispatch(fetchDiscussionThreads())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(DiscussionList));
