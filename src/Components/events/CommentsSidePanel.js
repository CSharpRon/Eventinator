import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
 
export class CommentsSidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: true,
            isPaneOpenLeft: false
        };
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    displayPanel(){
        this.setState({ isPaneOpen: true });
    }
 
    render() {
        return <div ref={ref => this.el = ref}>  
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title='Hey, it is optional pane title.  I can be React component too.'
                subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                    this.props.onComments(false);
                } }>
                <div>And I am pane content. BTW, what rocks?</div>
                <br />
            </SlidingPane>
        </div>;
    }
}


render(<CommentsSidePanel />, document.getElementById('root'));
 