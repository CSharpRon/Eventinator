import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
 
export class RSOPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: true,
            isPaneOpenLeft: false,
            returning:'',
            RSOs:["1", "2"]
        }
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    displayPanel(){
        this.setState({ isPaneOpen: true });
    }

    addRSO(objs){
        //return this.;
        //console.log(this.state.event);
        
        //this.setState({ isPaneOpen: false });
        //return this.state.event;

        // this.props.onComments({event: {name: this.refs.eventName.value, description: this.refs.description.value, rating: "0", lat: "1",
        // lng: "1",private: true, rsoid: "1", date: this.refs.date.value,phone: this.refs.phone.value, email: this.refs.email.value, 
        // category: this.refs.category.value, attendees: this.refs.attendees.value}});
        console.log(this.state.RSOs);
        this.state.RSOs.push(objs);
        console.log(this.state.RSOs);
        this.refs.Rso.value = objs;
        this.forceUpdate();
    }

    passRSO()
    {
        this.setState({ isPaneOpen: false });
        console.log(this.refs.Rso.value);
     //   console.log(this.state.RSOs);
     this.props.onRSO(this.state.RSOs, this.refs.selectRso.value);   
    }
 
    render() {
        return <div ref={ref => this.el = ref}>  
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title='Add Event'
                width='15%'
                // subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                   // this.props.onComments(this.state.event);

                } }>
                    <div class="modal-body">
                        <form id="add_contact_form" action="{{ url_for('add_contact') }}" method="post">
                            <div class="form-group">
                            <label for="Select RSO">Select RSO</label>
                            <select id = "selectRso"  ref ="selectRso">
                            {this.state.RSOs.map(obj =>{
                                return (
                                    <option value={obj}>{obj}</option>
                                    
                                ); })}
                            </select>
                        </div>
                                    <label for="RSO">RSO</label>
                                    <input name="Rso" type="text" class="form-control" id="Rso" ref ="Rso" placeholder="Enter an RSO">
                                    </input>
                        <button id="add_contact_submit" type="button" data-dismiss="modal" class="btn btn-primary" onClick={() => this.passRSO(this.props)} >Enroll</button>
                        <button type="button" class="btn btn-alert" data-dismiss="modal" onClick={()=>this.addRSO(this.refs.Rso.value)}>Add RSO</button>
                    </form>
                </div>
                <br />
            </SlidingPane>
        </div>;
    }
}


render(<RSOPage />, document.getElementById('root'));
 