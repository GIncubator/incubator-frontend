import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import Group from '@material-ui/icons/Group'
import Call from '@material-ui/icons/Call'
import Person from '@material-ui/icons/Person'
import Place from '@material-ui/icons/Place'
import AttachMoney from '@material-ui/icons/AttachMoney'
import { withStyles } from "@material-ui/core/styles"

const iconFontSize = "17.33px"

const styles = () => {
  return {
    links: {
      ['&:hover']: {
        'text-decoration': 'none'
      }
    }
  }
}

class Startup extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className="col-md-4">
        <div className="jr-card p-0">
          <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
            <li className="media">
              Application Status: {this.props.startup.applicationStatus}
            </li>
            <hr />
            <h3 className="card-heading">{this.props.startup.startUpName}</h3>
            <p className="sub-heading">
              Fund raised: {this.props.startup.raisedFunds}
            </p>
          </div>

          <div className="card-body">
            <ul className="contact-list list-unstyled">
              <li className="media">
                <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
                  <Group fontSize="inherit"/>
                </i>
                <span className="media-body">
                  Total Member: {this.props.startup.totalMemberCount}
                </span>
              </li>
              <li className="media">
                <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
                  <Person fontSize="inherit" />
                </i>
                <span className="media-body">
                  Founder name: {this.props.startup.founderName}
                </span>
              </li>
              <li className="media">
                <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
                  <Call fontSize="inherit" />
                </i>
                <span className="media-body">
                  Contact number: {this.props.startup.founderContactNumber}
                </span>
              </li>
              <li className="media">
                <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
                  <Place fontSize="inherit" />
                </i>
                <span className="media-body">
                  Founder address:{" "}
                  {this.props.startup.founderResidentialAddress}
                </span>
              </li>
              <li className="media">
                <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
                  <AttachMoney fontSize="inherit" />
                </i>
                <span className="media-body">
                  Expected Fund: {this.props.startup.expectedFund}
                </span>
              </li>
            </ul>

            {/* <Button size="small" color="primary" onClick={() => {onClick(this.props.startup._startupId)}}>Details</Button> */}

            <Link
              to={`/app/startup-applications/${this.props.startup._startupId}/details`}
              className={classes.links}
            >
              <Button size="small" color="primary">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true})(Startup)
