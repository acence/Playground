import react from 'react';

class PageLayout extends react.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className='pageLayout'>
            {this.props.children}
        </div>);
    }
};

export default PageLayout;