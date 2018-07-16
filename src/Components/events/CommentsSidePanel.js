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
            isPaneOpenLeft: false,
            test:'ayy',
            event: 
            {
                "name": "More Jank",
                "description": "Jank presentation",
                "rating": "0",
                "lat": "28.599900", 
                "lng": "-81.197718",
                "private": true,
                "rsoid": "1",
                "date": "07/16/2018 07:00",
                "phone": "912",
                "email": "titties@titties.edu",
                "category": "strip club",
                "attendees": ["camilo", "stephanie"]
            }
        };
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    displayPanel(){
        this.setState({ isPaneOpen: true });
    }

    addEvent(objs){
        //return this.;
        //console.log(this.state.event);
        this.setState({event: {name: this.refs.eventName.value, description: this.refs.description.value, rating: "0",
        private: true, rsoid: "1", date: this.refs.date.value,phone: this.refs.phone.value, email: this.refs.email.value, 
        category: this.refs.category.value, attendees: this.refs.attendees.value}});
        
        this.setState({ isPaneOpen: false });
        //return this.state.event;
        this.props.onComments(
            {
                event: 
                {
                    name: this.refs.eventName.value, 
                    description: this.refs.description.value, 
                    rating: "0",
                    private: true, 
                    rsoid: "1", 
                    date: this.refs.date.value,
                    phone: this.refs.phone.value, 
                    email: this.refs.email.value, 
                    category: this.refs.category.value, 
                    attendees: this.refs.attendees.value
                }
            }
        );

    }
 
    render() {
        return <div ref={ref => this.el = ref}>  
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title='Add Event'
                width='45%'
                // subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                   // this.props.onComments(this.state.event);

                } }>
                    <div class="modal-body">
                        <form id="add_contact_form" action="{{ url_for('add_contact') }}" method="post">
                                <div class="form-group">
                            <div class="form-group">
                                <div class="form-group col-md-6">
                                    <label for="inputFirstName">Event Name</label>
                                    <input name="event_name" type="name" class="form-control" id="eventName" ref="eventName" placeholder="Event Name" required="">
                                    </input>
                                </div>
                                
                                <div class="form-group">
                                    <div class="form-group col-md-6">
                                        <label for="description">Description</label>
                                        <input name="description" type="name" class="form-control" id="description" placeholder="Description" ref="description" required="">
                                        </input>
                                    </div>
                                
                                    <div class="form-group">
                                        <label for="date">Date</label>
                                        <input name= "date" type="text" class="form-control" id="date" ref="date" placeholder="12/27/2018">
                                        </input>
                                        <div class="form-group">
                                            <label for="phone">Phone Number</label>
                                            <input name="phone" type="text" class="form-control" id="phone" ref="phone" placeholder="555 555-5555">
                                            </input>
                                            <div class="form-group">
                                                <label for="email">Email</label>
                                                <input name="email" type="text" class="form-control" id="email" ref ="email" placeholder="titties@titties.edu">
                                                </input>
                                                <div class="form-row">
                                                    <div class="form-group col-md-9">
                                                        <label for="category">Category</label>
                                                        <input name="category" type="text" class="form-control" id="category" ref="category">
                                                        </input>
                                                        <div class="form-group col-md-10">
                                                            <label for="attendees">Attendees</label>
                                                            <input name="attendees" type="text" class="form-control" id="attendees" ref="attendees">
                                                            </input>
                                                        </div>
                                                        <button id="add_contact_submit" type="button" data-dismiss="modal" class="btn btn-primary" onClick={() => this.addEvent(this.props)} >Add Contact</button>
                                                        <button type="button" class="btn btn-alert" data-dismiss="modal">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
            </SlidingPane>
        </div>;
    }
}


render(<CommentsSidePanel />, document.getElementById('root'));
 