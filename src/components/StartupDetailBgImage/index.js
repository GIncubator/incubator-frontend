import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Work from '@material-ui/icons/Work'
import { updateStartupInfo } from '../../services'
import { getStartupListDetails } from 'actions/auth'

const styles = (theme) => ({
	card: {
		marginBottom: 0
	},
	bgImage: {
		maxWidth: '100%',
		minHeight: '300px !important',
		maxHeight: '300px !important'
  },
  dataRow: {
    'margin-top': '150px'
  },
  companyDetails: {
    'margin-left': '15px'
  },
  lgText: {
    'font-size': '30px'
  },
  submissionStatus: {
    width: '50%',
    color: 'white !important'
  },
  select: {
    color: 'white'
  }
})

const iconFontSize = "35px"

class StartupDetailBgImage extends Component {
  state = {
    applicationStatus: ''
  }

  constructor() {
    super()
    this.applicationStatus.bind(this)
  }

  submitApplicationStatus(evt) {
    this.setState({
      applicationStatus: evt.target.value
    })
    updateStartupInfo(startupId, applicationStatus)

  }

	render() {
		const {classes, name, founderName } = this.props
		return (
			<div className={`img-overlay-card shadow ripple-effect ${classes.card}`}>
				<div className={`${classes.bgImage}`}>
					<img src={require('public/images/company-bg-1.jpg')} style={{width: '100%'}}/>
				</div>
				<div className="jr-cart-ab layer">
					<div className={`row w-100 ${classes.dataRow}`}>
            {/* <img src={require('public/images/startup-logo-placeholder-200x140.jpg')} style={{width: '30%'}} /> */}
						<div className="col-sm-6 text-truncate">
              <li className="media">
                <i className="align-self-center" style={{"font-size": iconFontSize}}>
                  <Work fontSize="inherit"/>
                </i>
                <span className={`media-body ${classes.lgText} ${classes.companyDetails}`}>
                  { name }
                </span>
              </li>
						</div>
						<div className="col-sm-6 text-truncate">
              <FormControl className={classes.submissionStatus}>
                <InputLabel style={{color: 'white'}}>Team Members *</InputLabel>
                <Select
                  value={this.state.applicationStatus}
                  onChange={evt =>
                    this.submitApplicationStatus(evt)
                  }
                  className={classes.select}
                  // MenuProps={MenuProps}
                >
                  {['Submitted', 'Approved'].map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default withStyles(styles)(StartupDetailBgImage);
