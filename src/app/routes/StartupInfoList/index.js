import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';
import { onBackClick, onSelectStartup } from 'actions/Discussion';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import StartupDetails from '../StartupDetails';
import Conversation from '../Conversation';
import {
	hideMessage
} from 'actions/Auth';

class StartupInfoList extends React.Component {
    constructor() {
        super();
        this.selectStartup = this.selectStartup.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
    }

    selectStartup(key) {
        this.props.onSelectStartup(key)
    }

    onBackClick() {
        this.props.onBackClick();
    }


	componentDidUpdate() {
		if (this.props.showMessage) {
			setTimeout(() => {
				this.props.hideMessage();
			}, 1500);
		}
	}

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
    const { chatPanel, showStartupDetailView, selectedStartup, startupInfoList } = state.discussion;
	const {  alertMessage, showMessage } = state.auth;
    return { startupInfoList, chatPanel, showStartupDetailView, selectedStartup, alertMessage, showMessage};
}

const mapDispatchToProps = dispatch => {
    return {
        getStartupListDetails: bindActionCreators(getStartupListDetails, dispatch),
        onBackClick: bindActionCreators(onBackClick, dispatch),
        onSelectStartup: bindActionCreators(onSelectStartup, dispatch),
        hideMessage: bindActionCreators(hideMessage, dispatch)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)