import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopNav from "./TopNav"

import {
    hideMessage,
    showAuthLoader,
    userSignUp,
    submitStartupInfo
} from 'actions/Auth';

const formStyle = {
    width: '800px'
}

class StartupInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            founderName: '',
            coFounders: [
                {
                name: '',
                designation: ''
            }],
            totalMemberCount: '',
            typeOfIncorporation: 'No incorporation',
            legalEntityName: '',
            legalEntityMembers: [
                {
                    name: '',
                    designation: ''
                }
            ],
            raisedFunds: '',
            expectedFund: '',
            registeredAddress: '',
            founderResidentialAddress: '',
            founderContactNumber: '',
            founderEmailAddress: '',
            secondaryContactName: '',
            secondaryContactNumber: '',
            secondaryEmailAddress: '',
            startupWebsite: '',
            socialMediaLinks: [
                ''
            ],
            startupPAN: '',
            bankAccountNumber: '',
            bankName: '',
            bankIFSC: '',
            facilitiesNeededFromGUSEC: {
                mentorship: false,
                support_in_fundraising: false,
                gusec_id_card: false,
                coworking_access: false,
                desktop_computer_access: false,
                dedicated_silent_zone: false,
                gusec_email_address: false
            },
            gusecPremisesAccess: ''
        }
    }

   

    submitApplication() {
        this.props.showAuthLoader();
        this.props.submitStartupInfo(this.state);
    }

    handleCheckBoxChange(name) { 
        return (event) => {
        let facilitiesNeededFromGUSEC = this.state.facilitiesNeededFromGUSEC;
        facilitiesNeededFromGUSEC[name] = !facilitiesNeededFromGUSEC[name];
        this.setState({facilitiesNeededFromGUSEC});
      }
    }

    componentDidUpdate() {
        if (this.props.showMessage) {
            setTimeout(() => {
                this.props.hideMessage();
            }, 3000);
        }
    }

    handleCofounderNameChange(idx) { 
        return (evt) => {
        const newCofounders = this.state.coFounders.map((coFounder, sidx) => {
          if (idx !== sidx) return coFounder;
          return { ...coFounder, name: evt.target.value };
        });
        
        this.setState({ coFounders: newCofounders });
      }
    }


      handleCofounderDesgChange (idx) {
          return (evt) => {
        const newCofounders = this.state.coFounders.map((coFounder, sidx) => {
          if (idx !== sidx) return coFounder;
          return { ...coFounder, designation: evt.target.value };
        });
        
        this.setState({ coFounders: newCofounders });
      }
    }

    addCofounder() {
        this.setState({
            coFounders: this.state.coFounders.concat([{ name: '', designation: '' }])
        })
    }

    handleLegalEntityMemberNameChange(idx) { 
        return (evt) => {
        const newlegalEntityMembers = this.state.legalEntityMembers.map((legalEntity, sidx) => {
          if (idx !== sidx) return legalEntity;
          return { ...legalEntity, name: evt.target.value };
        });
        
        this.setState({ legalEntityMembers: newlegalEntityMembers });
      }
    }

      handleLegalEntityMemberDesgChange (idx) {
          return (evt) => {
        const newlegalEntityMembers = this.state.legalEntityMembers.map((legalEntity, sidx) => {
          if (idx !== sidx) return legalEntity;
          return { ...legalEntity, designation: evt.target.value };
        });
        
        this.setState({ legalEntityMembers: newlegalEntityMembers });
      }
    }

    addLegalEntityMember() {
        this.setState({
            legalEntityMembers: this.state.legalEntityMembers.concat([{ name: '', designation: '' }])
        })
    }

    handleSocialMediaLinkChange (idx) {
        return (evt) => {
      const newSocialMediaLinks = this.state.socialMediaLinks.map((link, sidx) => {
        if (idx !== sidx) return link;
        return evt.target.value;
      });
      
      this.setState({ socialMediaLinks: newSocialMediaLinks });
    }
  }

  addSocialLink() {
      this.setState({
          socialMediaLinks: this.state.socialMediaLinks.concat([''])
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
        } = this.state;
        const {showMessage, loader, alertMessage, showDoneMessage } = this.props;
        return (
            <div className="app-container mini-drawer">
                <div className="app-main-container">
                    <TopNav />
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                        <div className="app-wrapper d-flex justify-content-center align-items-center">
                        <div className="jr-card" style={formStyle}>
                        <div className="jr-card-header">
                            <h1 className="mb-0">
                            Information about your startup and its team
                            </h1>
                            <p className="text-muted">
                                Startups which successfully clear the interview round of shortlisting procedure to join GUSEC have to fill the Form B that covers basic information about the startup and the team behind it.
                            </p>
                        </div>
                            <form method="post" action="/">
                               <div className="jr-card">
                                <h3 className="mb-0">
                                    Startup and Founder Section
                                </h3>
                                <TextField
                                    type="text"
                                    label="Name of your startup"
                                    onChange={(event) => this.setState({name: event.target.value})}
                                    fullWidth
                                    defaultValue={name}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

                                <TextField
                                    type="text"
                                    label="Name of the founder"
                                    onChange={(event) => this.setState({founderName: event.target.value})}
                                    fullWidth
                                    defaultValue={founderName}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
                          
                                <TextField
                                    type="text"
                                    label="Total Member Count"
                                    onChange={(event) => this.setState({totalMemberCount: event.target.value})}
                                    fullWidth
                                    defaultValue={totalMemberCount}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
                                </div>
                                <div className="jr-card">
                                <h3 className="mb-0">
                                    Details about cofounders
                                </h3>
                                <p className="text-muted">
                                Add only cofounder and respective designation per line. If the startup has no co-founders, please specify "No co-founders" in Cofounder Name
                                    </p>
                                {this.state.coFounders.map((f, i) => <div key={i}>
                                    <TextField
                                    type="text"
                                    label="Cofounder Name"
                                    onChange={this.handleCofounderNameChange(i)}
                                    fullWidth
                                    defaultValue={f.name}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                     />
                                    <TextField
                                    type="text"
                                    label="Cofounder Designation"
                                    onChange={this.handleCofounderDesgChange(i)}
                                    fullWidth
                                    defaultValue={f.designation}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                    />
                                    </div>)}
                                    <Button variant="raised" onClick={this.addCofounder.bind(this)} type="button" color="primary">
                                    Add more Cofounder
                                    </Button>
                                    </div>

                            <div className="jr-card">
                            <h3 className="mb-0">
                                    Incorporation type and legal entities
                                </h3>
                                
                                <Select
                                    type="text"
                                    label="Type Of Incorporation"
                                    onChange={(event) => this.setState({typeOfIncorporation: event.target.value})}
                                    fullWidth
                                    value={this.state.typeOfIncorporation}
                                    margin="dense"
                                    className="mt-0 mb-2"
                                >
                                <MenuItem value="No incorporation">
                                    <em>Type Of Incorporation</em>
                                </MenuItem>
                                <MenuItem value={'Private Limited Company'}>Private Limited Company</MenuItem>
                                <MenuItem value={'Limited Liability Partnership'}>Limited Liability Partnership</MenuItem>
                                <MenuItem value={'Partnership Firm'}>Partnership Firm</MenuItem>
                                <MenuItem value={'Proprietorship'}>Proprietorship</MenuItem>
                                <MenuItem value={'Non-for-profit entity (Section 8 / Society / Trust)'}>Non-for-profit entity (Section 8 / Society / Trust)</MenuItem>

                                </Select>
                                </div>
                                <div className="jr-card">
                                    <p className="text-muted">
                                    If your startup is incorporated, please state the individuals who are formally a part of the legal entity, along with their roles.
                                    In case of private company, mention the directors and their types, if applicable. In case of a partnership firm, mention all the partners. If your startup is not incorporated, please mention "Not incorporated yet"
                                    </p>
                                <TextField
                                    type="text"
                                    label="Legal Entity Name"
                                    onChange={(event) => this.setState({legalEntityName: event.target.value})}
                                    fullWidth
                                    defaultValue={legalEntityName}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                               {this.state.legalEntityMembers.map((f, i) => <div key={i}>
                                    <TextField
                                    type="text"
                                    label="Legal Entity Member Name"
                                    onChange={this.handleLegalEntityMemberNameChange(i)}
                                    fullWidth
                                    defaultValue={f.name}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                     />
                                    <TextField
                                    type="text"
                                    label="Legal Entity Member Designation"
                                    onChange={this.handleLegalEntityMemberDesgChange(i)}
                                    fullWidth
                                    defaultValue={f.designation}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                    />
                                    </div>)}
                                    <Button variant="raised" onClick={this.addLegalEntityMember.bind(this)} type="button" color="primary">
                                    Add more Legal Entity Member
                                    </Button>
                            </div>
                            <div className="jr-card">
                            <h3 className="mb-0">
                                    Funding status
                                </h3>
                                <p className="text-muted">
                                Has your startup raised any funds. If yes, how much?
                                    </p>
                                
                                <TextField
                                    type="text"
                                    label="Raised Funds"
                                    onChange={(event) => this.setState({raisedFunds: event.target.value})}
                                    fullWidth
                                    defaultValue={raisedFunds}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

<p className="text-muted">
                                Are you looking for funds in the next six months. If yes, how much?
                                    </p>
                                <TextField
                                    type="text"
                                    label="Expected Fund"
                                    onChange={(event) => this.setState({expectedFund: event.target.value})}
                                    fullWidth
                                    defaultValue={expectedFund}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
                        </div>


                        <div className="jr-card">
                            <h3 className="mb-0">
                                    Addresses
                                </h3>
                                <p className="text-muted">
                                Use the address of your legal entity. If your startup is not incorporated, please use the address that you shall be using at the time of incorporation
                                    </p>
                                <TextField
                                    type="text"
                                    label="Registered Address"
                                    onChange={(event) => this.setState({registeredAddress: event.target.value})}
                                    fullWidth
                                    defaultValue={registeredAddress}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Founder Residential Address"
                                    onChange={(event) => this.setState({founderResidentialAddress: event.target.value})}
                                    fullWidth
                                    defaultValue={founderResidentialAddress}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

            </div>
            <div className="jr-card">
                            <h3 className="mb-0">
                                    Primary Contact Details
                                </h3>
                                <TextField
                                    type="text"
                                    label="Founder Contact Number"
                                    onChange={(event) => this.setState({founderContactNumber: event.target.value})}
                                    fullWidth
                                    defaultValue={founderContactNumber}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Founder Email Address"
                                    onChange={(event) => this.setState({founderEmailAddress: event.target.value})}
                                    fullWidth
                                    defaultValue={founderEmailAddress}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
</div>
<div className="jr-card">
                            <h3 className="mb-0">
                                    Secondary Contact Details
                                </h3>
                                <p className="text-muted">
                                Ideally, a co-founder or a partner or a director. Please don't enter details of an intern or a non-permanent member for the secondary contact.
                                    </p>
                                <TextField
                                    type="text"
                                    label="Secondary Contact Name"
                                    onChange={(event) => this.setState({secondaryContactName: event.target.value})}
                                    fullWidth
                                    defaultValue={secondaryContactName}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Secondary Contact Number"
                                    onChange={(event) => this.setState({secondaryContactNumber: event.target.value})}
                                    fullWidth
                                    defaultValue={secondaryContactNumber}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Secondary Email Address"
                                    onChange={(event) => this.setState({secondaryEmailAddress: event.target.value})}
                                    fullWidth
                                    defaultValue={secondaryEmailAddress}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

            </div>
            <div className="jr-card">
                            <h3 className="mb-0">
                                    Online identities
                                </h3>
                                <TextField
                                    type="text"
                                    label="Startup Website"
                                    onChange={(event) => this.setState({startupWebsite: event.target.value})}
                                    fullWidth
                                    defaultValue={startupWebsite}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
</div>
                <div className="jr-card">
                            <h3 className="mb-0">
                                    Social media links ( Facebook, Twitter etc profiles) 
                                </h3>
                                {this.state.socialMediaLinks.map((f, i) => <div key={i}>
                                    <TextField
                                    type="text"
                                    label="Social media link"
                                    onChange={this.handleSocialMediaLinkChange(i)}
                                    fullWidth
                                    defaultValue={f}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                     />
                                    </div>)}
                                    <Button variant="raised" onClick={this.addSocialLink.bind(this)} type="button" color="primary">
                                    Add more link
                                    </Button>
</div>
<div className="jr-card">
                            <h3 className="mb-0">
                                    Bank Details
                                </h3>
                                <p className="text-muted">

If your startup is not incorporated, please mention "Not incorporated" and if your startup is incorporated but does not have a bank account, please mention "No Bank Account"
                                    </p>
                                <TextField
                                    type="text"
                                    label="Startup PAN"
                                    onChange={(event) => this.setState({startupPAN: event.target.value})}
                                    fullWidth
                                    defaultValue={startupPAN}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Bank Account Number"
                                    onChange={(event) => this.setState({bankAccountNumber: event.target.value})}
                                    fullWidth
                                    defaultValue={bankAccountNumber}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Bank Name"
                                    onChange={(event) => this.setState({bankName: event.target.value})}
                                    fullWidth
                                    defaultValue={bankName}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Bank IFSC"
                                    onChange={(event) => this.setState({bankIFSC: event.target.value})}
                                    fullWidth
                                    defaultValue={bankIFSC}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />
</div>
<div className="jr-card  align-items-center">
                            <h3 className="mb-0">
                            Facilities Needed From GUSEC
                                </h3>

                              

                                    <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['mentorship']} onChange={this.handleCheckBoxChange('mentorship')} value="mentorship" />
              }
              label="Mentorship"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['support_in_fundraising']} onChange={this.handleCheckBoxChange('support_in_fundraising')} value="support_in_fundraising" />
              }
              label="Support in fundraising"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['gusec_id_card']} onChange={this.handleCheckBoxChange('gusec_id_card')} value="gusec_id_card"
                />
              }
              label="GUSEC ID card"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['dedicated_silent_zone']} onChange={this.handleCheckBoxChange('dedicated_silent_zone')} value="dedicated_silent_zone"
                />
              }
              label="Dedicated quiet / silent zone"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['desktop_computer_access']} onChange={this.handleCheckBoxChange('desktop_computer_access')} value="desktop_computer_access"
                />
              }
              label="Desktop computer access"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['gusec_email_address']} onChange={this.handleCheckBoxChange('gusec_email_address')} value="gusec_email_address"
                />
              }
              label="A @gusec.edu.in email address"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.facilitiesNeededFromGUSEC['coworking_access']} onChange={this.handleCheckBoxChange('coworking_access')} value="coworking_access"
                />
              }
              label="24x7 co-working access"
            />
          </FormGroup>
<hr/>
<h3 className="mb-0">
GUSEC Premises Access
                                </h3>
                                <Select
                                    type="text"
                                    value={this.state.gusecPremisesAccess}
                                    label="GUSEC Premises Access"
                                    onChange={(event) => this.setState({gusecPremisesAccess: event.target.value})}
                                    fullWidth
                                    margin="dense"
                                    className="mt-0 mb-2"
                                >
                                <MenuItem value={'Everyday'}>Everyday</MenuItem>
                                <MenuItem value={'2 to 3 times in a week'}>2 to 3 times in a week</MenuItem>
                                <MenuItem value={'Less than once a week'}>Less than once a week</MenuItem>
                                <MenuItem value={'Once or twice in a month'}>Once or twice in a month</MenuItem>
                               
                                </Select>
                                  
                                    <Button variant="raised" onClick={this.submitApplication.bind(this)} color="primary">
                                        Submit Application
                                    </Button>
                                   
                                    </div> 
                            {
                                loader &&
                                <div className="loader-view">
                                    <CircularProgress/>
                                </div>
                            }
                            {showMessage && NotificationManager.error(alertMessage)}
                            {showDoneMessage && NotificationManager.success(alertMessage)}
                            <NotificationContainer/>
                            </form>
                            </div>
                            </div>
                            </div>
                            </main>
                            </div>
                            </div>
           
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, showDoneMessage } = auth;
    return {loader, alertMessage, showMessage, showDoneMessage}
};

export default connect(mapStateToProps, {
    userSignUp,
    hideMessage,
    showAuthLoader,
    submitStartupInfo
})(StartupInfo);
