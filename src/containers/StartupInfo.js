import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import {
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGithubSignIn,
    userGoogleSignIn,
    userSignUp,
    userTwitterSignIn
} from 'actions/Auth';

const formStyle = {
    width: '100%',
    height: '-webkit-fill-available',
    overflowY: 'scroll'
}
class StartupInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            founderName: '',
            coFounders: [],
            totalMemberCount: '',
            typeOfIncorporation: '',
            legalEntityName: '',
            legalEntityMembers: [],
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
            socialMediaLinks: [],
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
        if (this.props.authUser !== null) {
            this.props.history.push('/');
        }
    }

    render() {
        const {
            name,
            founderName,
            coFounders,
            totalMemberCount,
            typeOfIncorporation,
            legalEntityName,
            legalEntityMembers,
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
            socialMediaLinks,
            startupPAN,
            bankAccountNumber,
            bankName,
            bankIFSC,
            facilitiesNeededFromGUSEC,
            gusecPremisesAccess,
        } = this.state;
        const {showMessage, loader, alertMessage} = this.props;
        return (
            <div
                className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                    

                    <div className="app-login-content" style={formStyle}>
                        <div className="app-login-header">
                            <h1>
                            Information about your startup and its team
                            </h1>
                        </div>

                        <div className="app-login-form">
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


                                <TextField
                                    type="text"
                                    label="coFounders"
                                    onChange={(event) => this.setState({coFounders: event.target.value})}
                                    fullWidth
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


                                <TextField
                                    type="text"
                                    label="legalEntityMembers"
                                    onChange={(event) => this.setState({legalEntityMembers: event.target.value})}
                                    fullWidth
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


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


                                <TextField
                                    type="text"
                                    label="Social Media Links"
                                    onChange={(event) => this.setState({socialMediaLinks: event.target.value})}
                                    fullWidth
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />


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

                                                                
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <Button variant="raised" onClick={() => {
                                        this.props.showAuthLoader();
                                        this.props.userSignUp({name, email, password});
                                    }} color="primary">
                                        Submit
                                    </Button>
                                   
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {
                    loader &&
                    <div className="loader-view">
                        <CircularProgress/>
                    </div>
                }
                {showMessage && NotificationManager.error(alertMessage)}
                <NotificationContainer/>
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, authUser} = auth;
    return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
    userSignUp,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn
})(StartupInfo);
