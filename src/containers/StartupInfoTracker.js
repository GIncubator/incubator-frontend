// http://localhost:4000/api/v1/startupinfo/5b6ad79384843a725dbd0f5a

import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import NoAuthHeader from "components/NoAuthHeader"
import { Field, reduxForm } from "redux-form"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { NotificationContainer, NotificationManager } from "react-notifications"
import { getSingleStartupDetails, hideStartUpMessage, showStartUpLoader, hideStartUpLoader } from "actions/StartUp"
import CircularProgress from "@material-ui/core/CircularProgress"
import Icon from '@material-ui/core/Icon';
import Group from '@material-ui/icons/Group';
import Call from '@material-ui/icons/Call';
import Person from '@material-ui/icons/Person';
import Place from '@material-ui/icons/Place';
import AttachMoney from '@material-ui/icons/AttachMoney';

const errorColor = "#f44336"
const formStyle = {
  width: "1000px"
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div>
      <TextField
        label={label}
        error={touched && error}
        {...input}
        {...custom}
      />
      {touched && error ? (
        <p className="mb-0" style={{ color: errorColor }}>
          {error}
        </p>
      ) : (
        ""
      )}
    </div>
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    "applicationTrackingId"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "* Required"
    }
  })

  const emailFields = [
    'founderEmailAddress',
  ]
  emailFields.map(email => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[email])) {
      errors[email] = "* Invalid email address"
    }
  })

  return errors
}

const StartUp = ({ props }) => {
  const iconFontSize = "17.33px"

  return (
    <div className="jr-card p-0" style={{ width: "700px" }}>
      <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
        <h1 className="media">{props.name}</h1>
        <hr />
        <h3 className="card-heading">
          Application Status: {props.applicationStatus}
        </h3>
        <p className="sub-heading">Fund raised: {props.raisedFunds}</p>
      </div>

      <div className="card-body">
        <ul className="contact-list list-unstyled">
          <li className="media">
            <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
              <Group fontSize="inherit"/>
            </i>
            <span className="media-body">
              Total Member: {props.totalMemberCount}
            </span>
          </li>
          <li className="media">
            <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
              <Person fontSize="inherit" />
            </i>
            <span className="media-body">
              Founder name: {props.founderName}
            </span>
          </li>
          <li className="media">
            <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
              <Call fontSize="inherit" />
            </i>
            <span className="media-body">
              Contact number: {props.founderContactNumber}
            </span>
          </li>
          <li className="media">
            <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
              <Place fontSize="inherit" />
            </i>
            <span className="media-body">
              Founder address: {props.founderResidentialAddress}
            </span>
          </li>
          <li className="media">
            <i className="text-primary align-self-center" style={{"font-size": iconFontSize}}>
              <AttachMoney fontSize="inherit" />
            </i>
            <span className="media-body">
              Expected Fund: {props.expectedFund}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

class StartupInfoList extends React.Component {
  constructor() {
    super()
    this.state = {
      founderEmailAddress: '',
      applicationTrackingId: ''
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideStartUpMessage()
      }, 3000)
    }
  }

  checkApplicationStatus() {
    this.props.showStartUpLoader()
    setTimeout(() => {
      this.props.hideStartUpLoader()
    }, 3000)
    this.props.getSingleStartupDetails({trackingId: this.state.applicationTrackingId, founderEmailAddress: this.state.founderEmailAddress})
  }

  render() {
    const { handleSubmit, showMessage, loader, alertMessage, showSSIFDoneMessage } = this.props
    const { founderEmailAddress, applicationTrackingId } = this.state

    const renderForm = () => {
      return (
        <form
          method="post"
          onSubmit={handleSubmit(this.checkApplicationStatus.bind(this))}
        >
          <div className="jr-card">
            <h2 className="mb-10">Application Tracking Details</h2>
            <Field
              type="text"
              name="founderEmailAddress"
              label="Founder's Email Address *"
              component={renderTextField}
              onChange={event =>
                this.setState({
                  founderEmailAddress: event.target.value
                })
              }
              fullWidth
              defaultValue={founderEmailAddress}
              margin="normal"
              className="mt-0 mb-2"
            />

            <Field
              type="text"
              name="applicationTrackingId"
              label="Application Tracking Id *"
              component={renderTextField}
              onChange={event =>
                this.setState({
                  applicationTrackingId: event.target.value
                })
              }
              fullWidth
              defaultValue={applicationTrackingId}
              margin="normal"
              className="mt-0 mb-2"
            />
            <p className="text-muted">
              You received the Tracking Id after successful submission of your
              startup's application.{" "}
            </p>
          </div>

          <Button
            type="submit"
            variant="raised"
            color="primary"
          >
            Check Application Status
          </Button>

          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && NotificationManager.error(alertMessage)}
          {showSSIFDoneMessage && NotificationManager.success(alertMessage)}
          <NotificationContainer />
        </form>
      )
    }

    return (
      <div className="app-container mini-drawer">
        <div className="app-main-container">
          <NoAuthHeader />
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <div className="app-wrapper d-flex justify-content-center align-items-center">
                <div className="">
                  { !showSSIFDoneMessage ?
                    <div className="jr-card" style={formStyle}>
                      <div className="jr-card-header">
                        <h1 className="mb-0">Enter tracking details</h1>
                      </div>
                      {renderForm()}
                    </div>
                    :
                    [
                      this.props.startUpInfo ?
                        <StartUp props={this.props.startUpInfo} />
                      :
                        <div className="jr-card p-10" style={{ width: "700px" }}>
                          <h3>We don't have any startups with the provided Tracking Id registered yet. Please use a correct Tracking Id and give it another spin.</h3>
                        </div>
                    ]
                  }
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ startup }) => {
  const { startUpInfo, loader, alertMessage, showMessage, showSSIFDoneMessage } = startup
  return { startUpInfo, loader, alertMessage, showMessage, showSSIFDoneMessage }
}

export default connect(
  mapStateToProps,
  {
    getSingleStartupDetails,
    hideStartUpMessage,
    showStartUpLoader,
    hideStartUpLoader
  }
)(
  reduxForm({
    form: "StartUpStatus",
    validate
  })(StartupInfoList)
)
