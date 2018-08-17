import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import Startup from "../Startup";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getStartupListDetails } from "actions/Auth";
import { PulseLoader} from 'react-spinners'
import { css } from 'react-emotion'

class StartupInfoList extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getStartupListDetails();
  }

  render() {
    const pulseLoaderClass = css`
			text-align: center;
			margin-top: 20px;
    `;

    return this.props.startupInfoList ?
    (
      <div className="app-wrapper">
        <div>
          <ContainerHeader
            match={this.props.match}
            title={<span>Startup Applications</span>}
          />
          <div className="row">
            {Object.keys(this.props.startupInfoList).map(key => {
              let val = this.props.startupInfoList[key];
              val._startupId = key;
              return <Startup key={key} startup={val} />;
            })}
          </div>
        </div>
      </div>
    )
    :
    <PulseLoader
			className={pulseLoaderClass}
			size={12}
			loading={true}
		/>
  }
}

const mapStateToProps = state => {
  const { startupInfoList } = state.discussion;
  return { startupInfoList };
};

const mapDispatchToProps = dispatch => {
  return {
    getStartupListDetails: bindActionCreators(getStartupListDetails, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartupInfoList);
