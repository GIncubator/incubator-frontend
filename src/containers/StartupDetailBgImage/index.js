import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Work from "@material-ui/icons/Work";
import { updateStartUpInfo } from "../../services";
import { getStartupListDetails } from "actions/Auth";
import { connect } from "react-redux";

const styles = theme => ({
  card: {
    marginBottom: 0
  },
  bgImage: {
    maxWidth: "100%",
    minHeight: "300px !important",
    maxHeight: "300px !important"
  },
  dataRow: {
    "margin-top": "150px"
  },
  companyDetails: {
    "margin-left": "15px"
  },
  lgText: {
    "font-size": "30px"
  },
  select: {
    color: "white",
    fontSize: '24px'
  },
  startUpName: {
    float: 'right',
    marginRight: '50px'
  },
  submissionStatus: {
    float: 'let',
    marginLeft: '50px'
  },
  disabled: {
    color: 'white'
  }
});

const iconFontSize = "35px";

class StartupDetailBgImage extends Component {
  possibleApplicationStatus = ["Submitted", "Acknowledged", "Under Review - Initial Stage", "Under Review - Final Stage", "Approved", "Rejected"]

  constructor(props) {
    super();
    this.state = {
      applicationStatus: props.selectedStartUpDetails.applicationStatus
    };
    this.submitApplicationStatus.bind(this);
  }

  submitApplicationStatus(evt) {
    const applicationStatus = evt.target.value;
    this.setState({
      applicationStatus
    });
    updateStartUpInfo(
      this.props.selectedStartUpDetails._startupId,
      applicationStatus
    );
    this.props.getStartupListDetails();
  }

  render() {
    const { classes, startUpName, authUser } = this.props;
    return (
      <div className={`img-overlay-card shadow ripple-effect ${classes.card}`}>
        <div className={`${classes.bgImage}`}>
          <img
            src={require("public/images/company-bg-1.jpg")}
            style={{ width: "100%" }}
          />
        </div>
        <div className="jr-cart-ab layer">
          <div className={`row w-100 ${classes.dataRow}`}>
            {/* <img src={require('public/images/startup-logo-placeholder-200x140.jpg')} style={{width: '30%'}} /> */}
            <div className="col-sm-6 text-truncate">
              <li className={`media ${classes.startUpName}`}>
                <i
                  className="align-self-center"
                  style={{ "font-size": iconFontSize }}
                >
                  <Work fontSize="inherit" />
                </i>
                <span
                  className={`media-body ${classes.lgText} ${
                    classes.companyDetails
                  }`}
                >
                  {startUpName}
                </span>
              </li>
            </div>
            <div className="col-sm-6 text-truncate">
              <FormControl className={classes.submissionStatus}>
                <InputLabel style={{ color: "white" }}>
                  Application Status *
                </InputLabel>
                <Select
                  value={this.state.applicationStatus}
                  defaultValue={this.state.applicationStatus}
                  onChange={evt => this.submitApplicationStatus(evt)}
                  className={classes.select}
                  disabled={authUser.GUSEC_ROLE !== 'GUSEC_ADMIN'}
                  classes={{
                    disabled: classes.disabled
                  }}
                >
                  {this.possibleApplicationStatus.map(status => (
                    <MenuItem key={status} value={status}>
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
}

const mapStateToProps = state => {
  let { authUser } = state.auth
  return { authUser }
};

const mapDispatchToProps = dispatch => {
  return {
    getStartupListDetails
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StartupDetailBgImage));
