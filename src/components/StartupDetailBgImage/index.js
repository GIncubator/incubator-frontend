import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = {
	card: {
		marginBottom: 0
	},
	bgImage: {
		maxWidth: '100%',
		minHeight: 300
	}
}

class StartupDetailBgImage extends Component {
	render() {
		const {classes} = this.props
		return (
			<div className={`img-overlay-card shadow ripple-effect ${classes.card}`}>
				<div className={`center-crop-img ${classes.bgImage}`}>
					<img src="http://localhost:5050/static/media/course-bg.98599875.png"/>
				</div>

				<div className="jr-cart-ab layer">
					<div className="row text-center w-100">
						<div className="col-sm-6 text-truncate">
							<i className="zmdi zmdi-pin text-white mr-2" />
							<span>Amazon </span>
						</div>
						<div className="col-sm-6 text-truncate">
							<i className="zmdi zmdi-coffee text-white mr-2" />
							<span>Jeff Bezos </span>
						</div>
					</div>
				</div>
			</div>
		);
	}

};

export default withStyles(styles)(StartupDetailBgImage);
