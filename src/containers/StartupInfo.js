import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';


import {
    hideMessage,
    showAuthLoader,
    userSignUp,
    submitStartupInfo
} from 'actions/Auth';

const formStyle = {
    width: '700px'
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
            typeOfIncorporation: '',
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
            facilitiesNeededFromGUSEC: '',
            gusecPremisesAccess: ''
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
        console.log(this)
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
            typeOfIncorporation,
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
            bankIFSC,
            facilitiesNeededFromGUSEC,
            gusecPremisesAccess,
        } = this.state;
        const {showMessage, loader, alertMessage} = this.props;
        return (
            <div className="app-container mini-drawer">
                <div className="app-main-container">
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                        <div className="app-wrapper d-flex justify-content-center align-items-center">
                        <div className="jr-card" style={formStyle}>
                        <div className="jr-card-header">
                            <h3 className="mb-0">
                            Information about your startup and its team
                            </h3>
                            <p className="text-muted">
                                Startups which successfully clear the interview round of shortlisting procedure to join GUSEC have to fill the Form B that covers basic information about the startup and the team behind it.
                            </p>
                        </div>
                            <form method="post" action="/">
                               
                                <TextField
                                    type="text"
                                    label="Name"
                                    onChange={(event) => this.setState({name: event.target.value})}
                                    fullWidth
                                    defaultValue={name}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

                                <TextField
                                    type="text"
                                    label="Founder Name"
                                    onChange={(event) => this.setState({founderName: event.target.value})}
                                    fullWidth
                                    defaultValue={founderName}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

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
                              
                                <TextField
                                    type="text"
                                    label="Total Member Count"
                                    onChange={(event) => this.setState({totalMemberCount: event.target.value})}
                                    fullWidth
                                    defaultValue={totalMemberCount}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Type Of Incorporation"
                                    onChange={(event) => this.setState({typeOfIncorporation: event.target.value})}
                                    fullWidth
                                    defaultValue={typeOfIncorporation}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


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


                                <TextField
                                    type="text"
                                    label="Raised Funds"
                                    onChange={(event) => this.setState({raisedFunds: event.target.value})}
                                    fullWidth
                                    defaultValue={raisedFunds}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="Expected Fund"
                                    onChange={(event) => this.setState({expectedFund: event.target.value})}
                                    fullWidth
                                    defaultValue={expectedFund}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


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


                                <TextField
                                    type="text"
                                    label="Startup Website"
                                    onChange={(event) => this.setState({startupWebsite: event.target.value})}
                                    fullWidth
                                    defaultValue={startupWebsite}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


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


                                <TextField
                                    type="text"
                                    label="Facilities Needed From GUSEC"
                                    onChange={(event) => this.setState({facilitiesNeededFromGUSEC: event.target.value})}
                                    fullWidth
                                    defaultValue={facilitiesNeededFromGUSEC}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


                                <TextField
                                    type="text"
                                    label="GUSEC Premises Access"
                                    onChange={(event) => this.setState({gusecPremisesAccess: event.target.value})}
                                    fullWidth
                                    defaultValue={gusecPremisesAccess}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

                                                                
                                    <Button variant="raised" onClick={() => {
                                        this.props.showAuthLoader();
                                        this.props.submitStartupInfo(this.state);
                                    }} color="primary">
                                        Submit
                                    </Button>
                                   
                
                            {
                                loader &&
                                <div className="loader-view">
                                    <CircularProgress/>
                                </div>
                            }
                            {showMessage && NotificationManager.error(alertMessage)}
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
    const {loader, alertMessage, showMessage} = auth;
    return {loader, alertMessage, showMessage}
};

export default connect(mapStateToProps, {
    userSignUp,
    hideMessage,
    showAuthLoader,
    submitStartupInfo
})(StartupInfo);
