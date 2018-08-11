import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';
import { onBackClick, onSelectStartup } from 'actions/Discussion';

import StartupDetails from '../StartupDetails';


class StartupInfoList extends React.Component {
    constructor() {
        super()
        this.state = {
            showStartupDetailView: false,
            selectedStartup: null
        }
        this.selectStartup = this.selectStartup.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
    }

    selectStartup(key) {
        this.props.onSelectStartup(key)
    }

    onBackClick() {
        this.props.onBackClick();
    }

    componentDidMount() {
        this.props.getStartupListDetails();
    }
    
    render() {
        let { chatPanel, showStartupDetailView, selectedStartup } = this.props;
        return (
            <div className="app-wrapper">
                { !showStartupDetailView && 
                <div>
                    <ContainerHeader match={this.props.match} title={<span>Startup Applications</span>}/>
                    <div className="row">
                        {
                            Object.keys(this.props.startupInfoList).map(key => {
                                let val = this.props.startupInfoList[key]
                                val._startupId = key;
                                return (<Startup key={key} props={val} onClick={this.selectStartup}/>)
                            })              
                        }
                    </div>
                 </div>
                }
                {
                    showStartupDetailView && <StartupDetails onBackClick={this.onBackClick} selectedStartupDetails={this.props.startupInfoList[selectedStartup]}/>
                }
                {
                    showStartupDetailView && chatPanel && <h2>Chat Screen</h2>
                }

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { chatPanel, showStartupDetailView, selectedStartup, startupInfoList } = state.discussion;
    return { startupInfoList, chatPanel, showStartupDetailView, selectedStartup};
}

const mapDispatchToProps = dispatch => {
    return {
        getStartupListDetails: bindActionCreators(getStartupListDetails, dispatch),
        onBackClick: bindActionCreators(onBackClick, dispatch),
        onSelectStartup: bindActionCreators(onSelectStartup, dispatch)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)