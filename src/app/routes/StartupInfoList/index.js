import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {
	hideMessage
} from 'actions/Auth';

class StartupInfoList extends React.Component {
    constructor() {
        super();
    }

	// componentDidUpdate() {
	// 	if (this.props.showMessage) {
	// 		setTimeout(() => {
	// 			this.props.hideMessage();
	// 		}, 1500);
	// 	}
	// }

    componentDidMount() {
        this.props.getStartupListDetails();
    }
    
    render() {

        return (
            <div className="app-wrapper">
                <div>
                    <ContainerHeader match={this.props.match} title={<span>Startup Applications</span>}/>
                    <div className="row">
                        {
                            Object.keys(this.props.startupInfoList).map(key => {
                                let val = this.props.startupInfoList[key]
                                val._startupId = key;
                                return (<Startup key={key} startup={val} />)
                            })              
                        }
                    </div>
                 </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {  startupInfoList } = state.discussion;
	// const {  alertMessage, showMessage } = state.auth;
    return { startupInfoList };
}

const mapDispatchToProps = dispatch => {
    return {
        getStartupListDetails: bindActionCreators(getStartupListDetails, dispatch)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)