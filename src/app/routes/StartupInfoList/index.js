import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';
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
        this.setState({
            selectedStartup: key,
            showStartupDetailView: true
        })
    }

    onBackClick() {
        this.setState({
            selectedStartup: null,
            showStartupDetailView: false
        })
    }

    componentDidMount() {
        this.props.getStartupListDetails();
    }
    
    render() {
        let { chatPanel, conversationData } = this.props;
        return (
            <div className="app-wrapper">
                { !this.state.showStartupDetailView && 
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
                    this.state.showStartupDetailView && <StartupDetails onBackClick={this.onBackClick} selectedStartupDetails={this.props.startupInfoList[this.state.selectedStartup]}/>
                }
                {
                    this.state.showStartupDetailView && chatPanel && <h2>Chat Screen</h2>
                }

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { startupInfoList } = state.auth;
    const {conversationData, chatPanel} = state.discussion;
    return { startupInfoList, conversationData, chatPanel };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getStartupListDetails }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)