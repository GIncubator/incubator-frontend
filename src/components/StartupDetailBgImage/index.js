import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
	card: {
		marginBottom: 0
	},
	bgImage: {
		maxWidth: '100%',
		minHeight: '300px !important',
		maxHeight: '300px !important'
	}
})

class StartupDetailBgImage extends Component {
	render() {
		const {classes, name, founderName } = this.props
		return (
			<div className={`img-overlay-card shadow ripple-effect ${classes.card}`}>
				<div className={`${classes.bgImage}`}>
					<img src={require('public/images/company-bg-1.jpg')} style={{width: '100%'}}/>
				</div>
				<div className="jr-cart-ab layer">
					<div className="row text-center w-100">
						<div className="col-sm-6 text-truncate">
							<i className="zmdi zmdi-pin text-white mr-2" />
							<span>{name}</span>
						</div>
						<div className="col-sm-6 text-truncate">
							<i className="zmdi zmdi-coffee text-white mr-2" />
							<span>{founderName}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

};

export default withStyles(styles)(StartupDetailBgImage);
