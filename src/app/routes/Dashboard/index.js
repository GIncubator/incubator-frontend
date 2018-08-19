import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class Dashboard extends React.Component {

    componentDidMount() {
        let href = window.location.href;
        console.log(href);
    }
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={'Dashboard'}/>
                <div className="text-center mt-5" style={{fontSize: '20px'}}>
                  Nothing here yet!
                </div>
            </div>
        );
    }
}

export default Dashboard;
