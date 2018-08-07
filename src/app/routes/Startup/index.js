import React from 'react';
import Button from '@material-ui/core/Button';

const Startup = ({props}) => {
  return (
      <div className="col-md-4">
         <div className="jr-card p-0">
          <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">{props.name}</h3>
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
              <Button size="small" color="primary">Details</Button>
          </div>
      </div>
      </div>
  );
}

export default Startup;