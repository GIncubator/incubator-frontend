import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class SamplePage extends React.Component {
    
    componentDidMount() {
        let href = window.location.href;
        console.log(href);
    }
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={'Dashboard'}/>
                
            </div>
        );
    }
}

export default SamplePage;