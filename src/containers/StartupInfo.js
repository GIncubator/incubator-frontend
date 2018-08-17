import React from "react"
import { connect } from "react-redux"
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications"
import CircularProgress from "@material-ui/core/CircularProgress"
import NoAuthHeader from 'components/NoAuthHeader'

import {
  hideMessage,
  showAuthLoader,
  userSignUp,
} from "actions/Auth"
import {
  hideStartUpMessage,
  showStartUpLoader,
  submitStartupInfo
} from "actions/StartUp"
import StartUpApplicationForm from 'components/StartUpApplicationForm'

const formStyle = {
  width: "1000px"
}

class StartupInfo extends React.Component {
  constructor() {
    super()
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideStartUpMessage()
      }, 3000)
    }
  }

  render() {
    const {
      showMessage,
      loader,
      alertMessage,
      showSISDoneMessage
    } = this.props
    return (
      <div className="app-container mini-drawer">
        <div className="app-main-container">
          <NoAuthHeader />
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <div className="app-wrapper d-flex justify-content-center align-items-center">
                { !showSISDoneMessage ?
                  <div className="jr-card" style={formStyle}>
                    <div className="jr-card-header">
                      <h1 className="mb-0">
                        Information about your startup and its team
                      </h1>
                      <p className="text-muted">
                        Startups which successfully clear the interview round of
                        shortlisting procedure to join GUSEC have to fill the Form
                        B that covers basic information about the startup and the
                        team behind it.
                      </p>
                    </div>
                    <StartUpApplicationForm />
                    {loader && (
                      <div className="loader-view">
                        <CircularProgress />
                      </div>
                    )}
                    {showMessage && NotificationManager.error(alertMessage)}
                    {showSISDoneMessage && NotificationManager.success(alertMessage)}
                    <NotificationContainer />
                  </div>
                  :
                  <div className="jr-card" style={formStyle}>
                    <div className="jr-card-header">
                      <h1 className="mb-0">
                        Details about your submission
                      </h1>
                      <p className="text-muted">
                        This is the only time Application Tracking ID can be viewed. You cannot recover it later. Please store it safely for any future communications about your application.
                      </p>
                    </div>
                    <div>
                      <h1 className="mb-0">
                        Tracking ID: <span>{this.props.startUpRegistrationInfo && this.props.startUpRegistrationInfo.trackingId}</span>
                      </h1>
                    </div>
                  </div>
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ startup }) => {
  const { loader, alertMessage, showMessage, showSISDoneMessage, startUpRegistrationInfo } = startup
  return { loader, alertMessage, showMessage, showSISDoneMessage, startUpRegistrationInfo }
}

export default connect(
  mapStateToProps,
  {
    userSignUp,
    hideStartUpMessage,
    showStartUpLoader,
    submitStartupInfo
  }
)(StartupInfo)
