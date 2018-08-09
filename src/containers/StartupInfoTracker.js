// http://localhost:4000/api/v1/startupinfo/5b6ad79384843a725dbd0f5a

import React from 'react';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getSingleStartupDetails } from 'actions/Auth';
import TopNav from './TopNav';

const Startup = ({props}) => {
  return (
      <div className="col-md-8">
         <div className="jr-card p-0" style={{width: '700px'}}>
          <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
              <h1 className="media">
              {props.name}
              </h1>
              <hr/>
              <h3 className="card-heading">
              Application Status: {props.applicationStatus}
              </h3>
              <p className="sub-heading">
                  Fund raised: {props.raisedFunds}
              </p>  
          </div>

          <div className="card-body">
              <ul className="contact-list list-unstyled">
                  <li className="media">
                      <i className="zmdi zmdi-phone zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                      <span className="media-body">
                          Total Member: {props.totalMemberCount}
                      </span>
                  </li>
                  <li className="media">
                      <i className="zmdi zmdi-email zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                      <span className="media-body">
                          Founder name: {props.founderName}
                      </span>
                  </li>
                  <li className="media">
                      <i className="zmdi zmdi-facebook-box zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                      <span className="media-body">
                          Contact number: {props.founderContactNumber}
                      </span>
                  </li>
                  <li className="media">
                      <i className="zmdi zmdi-twitter-box zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                      <span className="media-body">
                         Founder address: {props.founderResidentialAddress}
                      </span>
                  </li>
                  <li className="media">
                      <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-lg text-primary align-self-center"/>
                      <span className="media-body">
                          Expected Fund: {props.expectedFund}
                      </span>
                  </li>
              </ul>
          </div>
      </div>
      </div>
  );
}

class StartupInfoList extends React.Component {
    componentDidMount() {
        let url = new URL(window.location);
        let id = url.hash.replace('#/application?id=', '')
        this.props.getSingleStartupDetails(id);
    }
    
    render() {
        return (
          <div className="app-container mini-drawer">
                <div className="app-main-container">
                <TopNav/>
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                        <div className="app-wrapper d-flex justify-content-center align-items-center">
      
     
                <div className="row">
                { this.props.startupInfo && <Startup props={this.props.startupInfo}/> }
                { !this.props.startupInfo &&  <div className="col-md-8">
         <div className="jr-card p-10" style={{width: '700px'}}>
          <h3>Startup not found</h3>
         </div>
         </div>}
                </div>

            </div>
            </div>
            </main>
            </div>
            </div>
        );
    }
}


const mapStateToProps = ({startup}) => {
    const { startupInfo } = startup
    return { startupInfo }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSingleStartupDetails }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)