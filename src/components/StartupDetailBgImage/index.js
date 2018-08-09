import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
	card: {
		marginBottom: 0
	},
	bgImage: {
		maxWidth: '100%',
		minHeight: '300px !important'
	}
})

class StartupDetailBgImage extends Component {
	render() {
		const {classes} = this.props
		return (
			<div className={`img-overlay-card shadow ripple-effect ${classes.card}`}>
				<div className={`center-crop-img ${classes.bgImage}`}>
					<img src="https://user-images.githubusercontent.com/12299906/43918178-fb2ae0ac-9c2f-11e8-8d9b-b1023c3fab61.jpg"/>
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
