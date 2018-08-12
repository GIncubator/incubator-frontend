import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class Startup extends React.Component {
    
    render() {
        return (
            <div className="col-md-4">
                <div className="jr-card p-0">
                <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
                    <li className="media">
                    Application Status: {this.props.startup.applicationStatus}
                    </li>
                    <hr/>
                    <h3 className="card-heading">{this.props.startup.name}</h3>
                    <p className="sub-heading">
                        Fund raised: {this.props.startup.raisedFunds}
                    </p>  
                </div>

                <div className="card-body">
                    <ul className="contact-list list-unstyled">
                        <li className="media">
                            <i className="zmdi zmdi-phone zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                            <span className="media-body">
                                Total Member: {this.props.startup.totalMemberCount}
                            </span>
                        </li>
                        <li className="media">
                            <i className="zmdi zmdi-email zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                            <span className="media-body">
                                Founder name: {this.props.startup.founderName}
                            </span>
                        </li>
                        <li className="media">
                            <i className="zmdi zmdi-facebook-box zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                            <span className="media-body">
                                Contact number: {this.props.startup.founderContactNumber}
                            </span>
                        </li>
                        <li className="media">
                            <i className="zmdi zmdi-twitter-box zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                            <span className="media-body">
                                Founder address: {this.props.startup.founderResidentialAddress}
                            </span>
                        </li>
                        <li className="media">
                            <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                            <span className="media-body">
                                Expected Fund: {this.props.startup.expectedFund}
                            </span>
                        </li>
                    </ul>

                    {/* <Button size="small" color="primary" onClick={() => {onClick(this.props.startup._startupId)}}>Details</Button> */}

                    <Link to={`/app/startup-applications/${this.props.startup._startupId}`}>
                    <Button size="small" color="primary">Details</Button>
                    </Link>
                </div>
            </div>
            </div>
        );
    }
}

export default Startup;