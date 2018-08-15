import React from "react"
import { connect } from "react-redux"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

import Button from "@material-ui/core/Button"
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
import { Field, reduxForm } from "redux-form"
import uuidv4 from 'uuid/v4'

const formStyle = {
  width: "1000px"
}

const errorColor = "#f44336"

const validate = values => {
  const errors = {}
  const requiredFields = [
    "startUpName",
    "founderName",
    "totalTeamMembers",
    "legalEntityName",
    "raisedFunds",
    "expectedFund",
    "registeredAddress",
    "founderResidentialAddress",
    "founderContactNumber",
    "founderEmailAddress",
    "secondaryContactName",
    "secondaryContactNumber",
    "secondaryEmailAddress",
    "startupWebsite",
    "startupPAN",
    "bankAccountNumber",
    "bankName",
    "bankIFSC",
    "typeOfIncorporation",
    "raisedFunds",
    "expectedFund",
    "gusecPremisesAccess",
    "facilitiesNeededFromGUSEC"
  ]
  const dynamicFields = [
    "coFounderName-0",
    "coFounderDesignation-0",
    "legalEntityMemberName-0",
    "legalEntityMemberDesignation-0",
    "socialMediaLinks-0"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "* Required"
    }
  })
  dynamicFields.map(field => {
    const position = Object.keys(values).indexOf(field)
    const key = Object.keys(values)[position]

    if (position === -1 || !values[key]) {
      errors[field] = "* Required"
    }
  })

  const emailFields = [
    'founderEmailAddress',
    'secondaryEmailAddress'
  ]
  emailFields.map(email => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[email])) {
      errors[email] = "* Invalid email address"
    }
  })

  return errors
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
        hintText={label}
        floatingLabelText={label}
        error={touched && error}
        errorText={touched && error}
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

const renderCheckbox = ({ input, label, meta: {touched, error}, ...rest }) => (
  <FormControl component="fieldset" error={touched && error}>
    <FormLabel component="h3" style={touched && error ? {color: errorColor} : {color: 'inherit'}} style={{'margin-top': '15px'}}>{label}</FormLabel>
    <FormGroup
      onChange={(event, value) => input.onChange(event)}
    >
    {rest.children}
    </FormGroup>
    {
      touched && error ?
      <p className="mb-0" style={{ color: errorColor }}> {error} </p> :
      ''
    }
  </FormControl>
)

const renderRadioGroup = ({ input, label, meta: {touched, error}, ...rest }) => (
  <FormControl component="fieldset" error={touched && error}>
    <FormLabel component="h3" style={touched && error ? {color: errorColor} : {color: 'inherit'}} style={{'margin-top': '15px'}}>{label}</FormLabel>
    <RadioGroup
      {...input}
      {...rest}
      value={input.value}
      onChange={(event, value) => input.onChange(event)}
    />
    {
      touched && error ?
      <p className="mb-0" style={{ color: errorColor }}> {error} </p> :
      ''
    }
  </FormControl>
)

class StartupInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      trackingId: uuidv4(),
      name: "",
      founderName: "",
      coFounders: [
        {
          name: "",
          designation: ""
        }
      ],
      totalMemberCount: "",
      typeOfIncorporation: "No incorporation",
      legalEntityName: "",
      legalEntityMembers: [
        {
          name: "",
          designation: ""
        }
      ],
      raisedFunds: "",
      expectedFund: "",
      registeredAddress: "",
      founderResidentialAddress: "",
      founderContactNumber: "",
      founderEmailAddress: "",
      secondaryContactName: "",
      secondaryContactNumber: "",
      secondaryEmailAddress: "",
      startupWebsite: "",
      socialMediaLinks: [""],
      startupPAN: "",
      bankAccountNumber: "",
      bankName: "",
      bankIFSC: "",
      facilitiesNeededFromGUSEC: {
        mentorship: false,
        support_in_fundraising: false,
        gusec_id_card: false,
        coworking_access: false,
        desktop_computer_access: false,
        dedicated_silent_zone: false,
        gusec_email_address: false
      },
      gusecPremisesAccess: ""
    }
  }

  submitApplication() {
    this.props.showStartUpLoader()
    this.props.submitStartupInfo(this.state)
  }

  handleCheckBoxChange(name) {
    return event => {
      let facilitiesNeededFromGUSEC = this.state.facilitiesNeededFromGUSEC
      facilitiesNeededFromGUSEC[name] = !facilitiesNeededFromGUSEC[name]
      this.setState({ facilitiesNeededFromGUSEC })
    }
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideStartUpMessage()
      }, 3000)
    }
  }

  handleCofounderNameChange(idx) {
    return evt => {
      const newCofounders = this.state.coFounders.map((coFounder, sidx) => {
        if (idx !== sidx) return coFounder
        return { ...coFounder, name: evt.target.value }
      })

      this.setState({ coFounders: newCofounders })
    }
  }

  handleCofounderDesgChange(idx) {
    return evt => {
      const newCofounders = this.state.coFounders.map((coFounder, sidx) => {
        if (idx !== sidx) return coFounder
        return { ...coFounder, designation: evt.target.value }
      })

      this.setState({ coFounders: newCofounders })
    }
  }

  addCofounder() {
    this.setState({
      coFounders: this.state.coFounders.concat([{ name: "", designation: "" }])
    })
  }

  handleLegalEntityMemberNameChange(idx) {
    return evt => {
      const newlegalEntityMembers = this.state.legalEntityMembers.map(
        (legalEntity, sidx) => {
          if (idx !== sidx) return legalEntity
          return { ...legalEntity, name: evt.target.value }
        }
      )

      this.setState({ legalEntityMembers: newlegalEntityMembers })
    }
  }

  handleLegalEntityMemberDesgChange(idx) {
    return evt => {
      const newlegalEntityMembers = this.state.legalEntityMembers.map(
        (legalEntity, sidx) => {
          if (idx !== sidx) return legalEntity
          return { ...legalEntity, designation: evt.target.value }
        }
      )

      this.setState({ legalEntityMembers: newlegalEntityMembers })
    }
  }

  addLegalEntityMember() {
    this.setState({
      legalEntityMembers: this.state.legalEntityMembers.concat([
        { name: "", designation: "" }
      ])
    })
  }

  handleSocialMediaLinkChange(idx) {
    return evt => {
      const newSocialMediaLinks = this.state.socialMediaLinks.map(
        (link, sidx) => {
          if (idx !== sidx) return link
          return evt.target.value
        }
      )

      this.setState({ socialMediaLinks: newSocialMediaLinks })
    }
  }

  addSocialLink() {
    this.setState({
      socialMediaLinks: this.state.socialMediaLinks.concat([""])
    })
  }

  render() {
    const {
      name,
      founderName,
      totalMemberCount,
      legalEntityName,
      raisedFunds,
      expectedFund,
      registeredAddress,
      founderResidentialAddress,
      founderContactNumber,
      founderEmailAddress,
      secondaryContactName,
      secondaryContactNumber,
      secondaryEmailAddress,
      startupWebsite,
      startupPAN,
      bankAccountNumber,
      bankName,
      bankIFSC
    } = this.state
    const {
      showMessage,
      loader,
      alertMessage,
      showDoneMessage,
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props
    return (
      <div className="app-container mini-drawer">
        <div className="app-main-container">
          <NoAuthHeader />
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <div className="app-wrapper d-flex justify-content-center align-items-center">
                { !showDoneMessage ?
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
                    <form
                      method="post"
                      onSubmit={handleSubmit(this.submitApplication.bind(this))}
                    >
                      <div className="jr-card">
                        <h2 className="mb-10">Startup and Founder Section *</h2>
                        <Field
                          type="text"
                          name="startUpName"
                          label="Name of your startup *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              name: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={name}
                          margin="normal"
                          className="mt-0 mb-2"
                        />

                        <Field
                          type="text"
                          name="founderName"
                          label="Name of the founder *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              founderName: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={founderName}
                          margin="normal"
                          className="mt-0 mb-2"
                        />

                        <Field
                          type="text"
                          name="totalTeamMembers"
                          label="Total number of team members in your startup including co-founders, employees, fellows, interns, etc *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              totalMemberCount: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={totalMemberCount}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                      </div>

                      {/* <div className="jr-card">
                        <h2 className="mb-0">Details about cofounders *</h2>
                        <p className="text-muted">
                          Add only cofounder and respective designation per line.
                          If the startup has no co-founders, please specify "No
                          co-founders" in Cofounder Name and "N/A" in Cofounder
                          Designation
                        </p>
                        {this.state.coFounders.map((f, i) => (
                          <div key={i}>
                            <Field
                              type="text"
                              name={`coFounderName-${i}`}
                              label="Cofounder Name *"
                              component={renderTextField}
                              onChange={this.handleCofounderNameChange(i)}
                              fullWidth
                              defaultValue={f.name}
                              margin="normal"
                              className="mt-0 mb-2"
                            />
                            <Field
                              type="text"
                              name={`coFounderDesignation-${i}`}
                              label="Cofounder Designation *"
                              component={renderTextField}
                              onChange={this.handleCofounderDesgChange(i)}
                              fullWidth
                              defaultValue={f.designation}
                              margin="normal"
                              className="mt-0 mb-2"
                            />
                          </div>
                        ))}
                        <Button
                          variant="raised"
                          onClick={this.addCofounder.bind(this)}
                          type="button"
                          color="primary"
                          style={{ "margin-top": "10px" }}
                        >
                          Add more Cofounder
                        </Button>
                      </div>

                      <div className="jr-card">
                        <h2 className="mb-10">Legal details *</h2>
                        <Field
                          type="text"
                          name="typeOfIncorporation"
                          label="Type Of Incorporation *"
                          component={renderRadioGroup}
                          onChange={event =>
                            this.setState({
                              typeOfIncorporation: event.target.value
                            })
                          }
                          fullWidth
                          value={this.state.typeOfIncorporation}
                          margin="dense"
                          className="mt-0 mb-2"
                        >
                          <FormControlLabel
                            value="No incorporation"
                            label="No incorporation"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Private Limited Company"
                            label="Private Limited Company"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Limited Liability Partnership"
                            label="Limited Liability Partnership"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Partnership Firm"
                            label="Partnership Firm"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Proprietorship"
                            label="Proprietorship"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Non-for-profit entity (Section 8 / Society / Trust)"
                            label="Non-for-profit entity (Section 8 / Society / Trust)"
                            control={<Radio color="primary"/>}
                          />
                        </Field>
                        <Field
                          type="text"
                          name="legalEntityName"
                          label="Legal Entity Name *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              legalEntityName: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={legalEntityName}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p className="text-muted">
                          If your startup is not incorporated, please mention "Not
                          incorporated"
                        </p>
                        {this.state.legalEntityMembers.map((f, i) => (
                          <div key={i}>
                            <Field
                              type="text"
                              name={`legalEntityMemberName-${i}`}
                              label="Legal Entity Member Name *"
                              component={renderTextField}
                              onChange={this.handleLegalEntityMemberNameChange(i)}
                              fullWidth
                              defaultValue={f.name}
                              margin="normal"
                              className="mt-0 mb-2"
                            />
                            <Field
                              type="text"
                              name={`legalEntityMemberDesignation-${i}`}
                              label="Legal Entity Member Designation *"
                              component={renderTextField}
                              onChange={this.handleLegalEntityMemberDesgChange(i)}
                              fullWidth
                              defaultValue={f.designation}
                              margin="normal"
                              className="mt-0 mb-2"
                            />
                          </div>
                        ))}
                        <p className="text-muted">
                          If your startup is incorporated, please state the
                          individuals who are formally a part of the legal entity,
                          along with their roles. In case of private company,
                          mention the directors and their types, if applicable. In
                          case of a partnership firm, mention all the partners. If
                          your startup is not incorporated, please mention "Not
                          incorporated yet"
                        </p>
                        <Button
                          variant="raised"
                          onClick={this.addLegalEntityMember.bind(this)}
                          type="button"
                          color="primary"
                        >
                          Add more Legal Entity Member
                        </Button>
                      </div>

                      <div className="jr-card">
                        <h2 className="mb-10">Funding status *</h2>
                        <Field
                          type="text"
                          name="raisedFunds"
                          label="Raised Funds *"
                          component={renderRadioGroup}
                          onChange={event =>
                            this.setState({
                              raisedFunds: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={raisedFunds}
                          margin="normal"
                          className="mt-0 mb-2"
                        >
                          <FormControlLabel
                            value="No Funding"
                            label="No Funding"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Raised 10 lakhs or less"
                            label="Raised 10 lakhs or less"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Raised 10 to 25 lakhs"
                            label="Raised 10 to 25 lakhs"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Raised 25 lakhs or more"
                            label="Raised 25 lakhs or more"
                            control={<Radio color="primary"/>}
                          />
                        </Field>
                        <p className="text-muted">
                          Has your startup raised any funds. If yes, how much?
                        </p>
                        <hr />
                        <Field
                          type="text"
                          name="expectedFund"
                          label="Expected Fund *"
                          component={renderRadioGroup}
                          onChange={event =>
                            this.setState({
                              expectedFund: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={expectedFund}
                          margin="normal"
                        >
                          <FormControlLabel
                            value="No, not looking for funds"
                            label="No, not looking for funds"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Looking for seed capital of under 10 lakhs"
                            label="Looking for seed capital of under 10 lakhs"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Looking for seed capital between 10 lakhs and 25 lakhs"
                            label="Looking for seed capital between 10 lakhs and 25 lakhs"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Looking for seed capital between 25 lakhs and 50 lakhs"
                            label="Looking for seed capital between 25 lakhs and 50 lakhs"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Looking for capital above 50 lakhs"
                            label="Looking for capital above 50 lakhs"
                            control={<Radio color="primary"/>}
                          />
                        </Field>
                        <p className="text-muted">
                          Are you looking for funds in the next six months. If
                          yes, how much?
                        </p>
                      </div>

                      <div className="jr-card">
                        <h2 className="mb-10">Address & Contact Details</h2>
                        <Field
                          type="text"
                          name="registeredAddress"
                          label="Registered Address *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              registeredAddress: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={registeredAddress}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p className="text-muted">
                          Use the address of your legal entity. If your startup is
                          not incorporated, please use the address that you shall
                          be using at the time of incorporation
                        </p>
                        <Field
                          type="text"
                          name="founderResidentialAddress"
                          label="Founder's Residential Address *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              founderResidentialAddress: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={founderResidentialAddress}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <Field
                          type="text"
                          name="founderContactNumber"
                          label="Founder's Contact Number *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              founderContactNumber: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={founderContactNumber}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
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
                          name="secondaryContactName"
                          label="Secondary Contact Name *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              secondaryContactName: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={secondaryContactName}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p className="text-muted">
                          Ideally, a co-founder or a partner or a director. Please
                          don't enter details of an intern or a non-permanent
                          member for the secondary contact.
                        </p>
                        <Field
                          type="text"
                          name="secondaryContactNumber"
                          label="Secondary Contact Number *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              secondaryContactNumber: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={secondaryContactNumber}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <Field
                          type="text"
                          name="secondaryEmailAddress"
                          label="Secondary Email Address *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              secondaryEmailAddress: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={secondaryEmailAddress}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                      </div>

                      <div className="jr-card">
                        <h2 className="mb-10">Online identities</h2>
                        <Field
                          type="text"
                          name="startupWebsite"
                          label="Startup Website *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              startupWebsite: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={startupWebsite}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        {this.state.socialMediaLinks.map((f, i) => (
                          <div key={i}>
                            <Field
                              type="text"
                              name={`socialMediaLinks-${i}`}
                              label="Social media link *"
                              component={renderTextField}
                              onChange={this.handleSocialMediaLinkChange(i)}
                              fullWidth
                              defaultValue={f}
                              margin="normal"
                              className="mt-0 mb-2"
                            />
                          </div>
                        ))}
                        <p>
                          Social media links ( Facebook, Twitter etc profiles)
                        </p>
                        <Button
                          variant="raised"
                          onClick={this.addSocialLink.bind(this)}
                          type="button"
                          color="primary"
                          style={{ "margin-top": "10px" }}
                        >
                          Add more link
                        </Button>
                      </div>

                      <div className="jr-card">
                        <h2 className="mb-10">Bank Details</h2>
                        <Field
                          type="text"
                          name="startupPAN"
                          label="PAN of your Startup *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              startupPAN: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={startupPAN}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p className="text-muted">
                          If your startup is not incorporated, please mention "Not
                          incorporated" and if your startup is incorporated but
                          does not have a bank account, please mention "No Bank
                          Account"
                        </p>
                        <Field
                          type="text"
                          name="bankAccountNumber"
                          label="Bank Account Number *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              bankAccountNumber: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={bankAccountNumber}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p>
                          If your startup is not incorporated, please mention "Not
                          incorporated" and if your startup is incorporated but
                          does not have a bank account, please mention "No Bank
                          Account"
                        </p>
                        <Field
                          type="text"
                          name="bankName"
                          label="Name of the Bank *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              bankName: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={bankName}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p>
                          If your startup is not incorporated, please mention "Not
                          incorporated" and if your startup is incorporated but
                          does not have a bank account, please mention "No Bank
                          Account"
                        </p>
                        <Field
                          type="text"
                          name="bankIFSC"
                          label="Bank IFSC *"
                          component={renderTextField}
                          onChange={event =>
                            this.setState({
                              bankIFSC: event.target.value
                            })
                          }
                          fullWidth
                          defaultValue={bankIFSC}
                          margin="normal"
                          className="mt-0 mb-2"
                        />
                        <p>
                          If your startup is not incorporated, please mention "Not
                          incorporated" and if your startup is incorporated but
                          does not have a bank account, please mention "No Bank
                          Account"
                        </p>
                      </div>

                      <div className="jr-card align-items-center">
                        <Field
                          name="facilitiesNeededFromGUSEC"
                          component={renderCheckbox}
                          onChange={(event, value) => {
                              console.log(event.target.value)
                            }
                          }
                          value={() => this.state.facilitiesNeededFromGUSEC}
                          label="Facilities Needed From GUSEC *"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "mentorship"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange("mentorship")}
                                value="mentorship"
                              />
                            }
                            label="Mentorship"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "support_in_fundraising"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "support_in_fundraising"
                                )}
                                value="support_in_fundraising"
                              />
                            }
                            label="Support in fundraising"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "gusec_id_card"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "gusec_id_card"
                                )}
                                value="gusec_id_card"
                              />
                            }
                            label="GUSEC ID card"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "dedicated_silent_zone"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "dedicated_silent_zone"
                                )}
                                value="dedicated_silent_zone"
                              />
                            }
                            label="Dedicated quiet / silent zone"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "desktop_computer_access"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "desktop_computer_access"
                                )}
                                value="desktop_computer_access"
                              />
                            }
                            label="Desktop computer access"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "gusec_email_address"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "gusec_email_address"
                                )}
                                value="gusec_email_address"
                              />
                            }
                            label="A @gusec.edu.in email address"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.facilitiesNeededFromGUSEC[
                                    "coworking_access"
                                  ]
                                }
                                onChange={this.handleCheckBoxChange(
                                  "coworking_access"
                                )}
                                value="coworking_access"
                              />
                            }
                            label="24x7 co-working access"
                          />
                        </Field>
                        < hr />
                        <Field
                          type="text"
                          name="gusecPremisesAccess"
                          label="GUSEC Premises Access *"
                          component={renderRadioGroup}
                          onChange={event =>
                            this.setState({
                              gusecPremisesAccess: event.target.value
                            })
                          }
                          fullWidth
                          value={this.state.gusecPremisesAccess}
                          margin="dense"
                        >
                          <FormControlLabel
                            value="Everyday"
                            label="Everyday"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="2 to 3 times in a week"
                            label="2 to 3 times in a week"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Less than once a week"
                            label="Less than once a week"
                            control={<Radio color="primary"/>}
                          />
                          <FormControlLabel
                            value="Once or twice in a month"
                            label="Once or twice in a month"
                            control={<Radio color="primary"/>}
                          />
                        </Field>
                      </div> */}

                      <Button
                        type="submit"
                        disabled={submitting}
                        variant="raised"
                        color="primary"
                        style={{ "margin-top": "10px" }}
                      >
                        Submit Application
                      </Button>

                      {loader && (
                        <div className="loader-view">
                          <CircularProgress />
                        </div>
                      )}
                      {showMessage && NotificationManager.error(alertMessage)}
                      {showDoneMessage &&
                        NotificationManager.success(alertMessage)}
                      <NotificationContainer />
                    </form>
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
  const { loader, alertMessage, showMessage, showDoneMessage, startUpRegistrationInfo } = startup
  return { loader, alertMessage, showMessage, showDoneMessage, startUpRegistrationInfo }
}

export default connect(
  mapStateToProps,
  {
    userSignUp,
    hideStartUpMessage,
    showStartUpLoader,
    submitStartupInfo
  }
)(
  reduxForm({
    form: "StartupInfo",
    validate
  })(StartupInfo)
)
