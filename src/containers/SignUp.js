import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import { bindActionCreators } from "redux";
import {
    hideMessage,
    showAuthLoader,
    userGoogleSignIn,
    userSignUp
} from 'actions/Auth';


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
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
            email,
            password
        } = this.state;
        const {showMessage, loader, alertMessage} = this.props;
        return (
            <div
                className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                    <div className="app-logo-content d-flex align-items-center justify-content-center">
                        <Link className="app-logo-md" to="/" title="Gusec Incubator">
                            <img src={require('public/images/gusec-logo.png')} alt="Gusec Incubator" title="Gusec Incubator"/>
                        </Link>
                    </div>

                    <div className="app-login-content">
                        <div className="app-login-header">
                            <h1>Sign Up</h1>
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
                                    type="email"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                    label={<IntlMessages id="appModule.email"/>}
                                    fullWidth
                                    defaultValue={email}
                                    margin="normal"
                                    className="mt-0 mb-2"
                                />

                                <TextField
                                    type="password"
                                    onChange={(event) => this.setState({password: event.target.value})}
                                    label={<IntlMessages id="appModule.password"/>}
                                    fullWidth
                                    defaultValue={password}
                                    margin="normal"
                                    className="mt-0 mb-4"
                                />

                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <Button variant="raised" onClick={() => {
                                        this.props.showAuthLoader();
                                        this.props.userSignUp({name, email, password});
                                    }} color="primary">
                                        <IntlMessages
                                            id="appModule.regsiter"/>
                                    </Button>
                                    <Link to="/signin">
                                        <IntlMessages id="signUp.alreadyMember"/>
                                    </Link>
                                </div>
                                {/* <div className="app-social-block my-1 my-sm-3">
                                    <IntlMessages
                                        id="signIn.connectWith"/>
                                    <ul className="social-link">
                                        <li>
                                            <IconButton className="icon"
                                                        onClick={() => {
                                                            this.props.showAuthLoader();
                                                            this.props.userGoogleSignIn();

                                                        }}>
                                                <i className="zmdi zmdi-google-plus"/>
                                            </IconButton>
                                        </li>
                                    </ul>
                                </div> */}

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
    userGoogleSignIn
})(SignUp);
