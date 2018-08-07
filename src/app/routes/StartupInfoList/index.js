import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import Startup from '../Startup';
import {connect} from 'react-redux';
import { getStartupListDetails } from 'actions/Auth';

class StartupInfoList extends React.Component {
    constructor() {
        super();
        this.state = {
            startupInfoList: [
                {
                   name: 'Flipkart',
                   raisedFunds: '20M',
                   totalMemberCount: '12',
                   founderName: 'John Doe',
                   founderContactNumber: '+82382039123',
                   founderResidentialAddress: 'D/10/320 PO - Habm',
                   expectedFund: '102M'
                },
                {
                   name: 'Myntra',
                   raisedFunds: '20M',
                   totalMemberCount: '12',
                   founderName: 'John Doe',
                   founderContactNumber: '+82382039123',
                   founderResidentialAddress: 'D/10/320 PO - Habm',
                   expectedFund: '102M'
                },
                {
                   name: 'ZoomCar',
                   raisedFunds: '20M',
                   totalMemberCount: '12',
                   founderName: 'John Doe',
                   founderContactNumber: '+82382039123',
                   founderResidentialAddress: 'D/10/320 PO - Habm',
                   expectedFund: '102M'
                }
            ]
        };
    }

    componentDidMount() {
        this.props.getStartupListDetails();
    }
    
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<span>Startup Applications</span>}/>
                <div className="d-flex">
                    {
                        this.state.startupInfoList.map((d, i) => {
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
  
  export default connect(mapStateToProps, {
    getStartupListDetails
  })(StartupInfoList)