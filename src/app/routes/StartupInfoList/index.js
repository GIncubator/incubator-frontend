import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';

class StartupInfoList extends React.Component {
    componentDidMount() {
        this.props.getStartupListDetails();
    }
    
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<span>Startup Applications</span>}/>
                <div className="d-flex">
                    {
                        this.props.startupInfoList.map((d, i) => {
                            return (<Startup key={i} props={d} />)
                        })
                    }
                </div>

            </div>
        );
    }
}


const mapStateToProps = ({auth}) => {
    console.log(auth);
    const { startupInfoList } = auth
    return { startupInfoList }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getStartupListDetails }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(StartupInfoList)