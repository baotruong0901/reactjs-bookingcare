import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalUpdateUser extends Component {

    constructor(props){
        super(props)
        this.state={
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phoneNumber:'',
        }
    }

    componentDidMount() {
        let user=this.props.currentUser
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'harcode',
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
                phoneNumber:user.phoneNumber,
            })
        }
    }

    toggle=()=>{
        this.props.toggleUserModal()
    }

    handleOnchangeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    checkValideInput = ()=>{
        let isValid=true
        let arrInput=['email', 'password','firstName','lastName','address']
        for(let i=0;i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid=false
                alert('Missing parameter: '+arrInput[i])
                break
            }
        }
        return isValid
    }

    handleUpdateUser=()=>{
        let isValid = this.checkValideInput()
        if(isValid===true){
            //call api editt user
            this.props.editUser(this.state)
        }
        
    }
    render() {
        return (
            <div>
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={()=>this.toggle()} 
                    className={'modal-add-new'}
                    size="md"
                    centered
                    
                >
                    <ModalHeader toggle={this.toggle}>Update a new user</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 mt-3">
                            <div className=" col-md-12">
                                <label htmlFor="inputEmail4">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" placeholder="Email" 
                                    value={this.state.email}
                                    disabled
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="inputEmail4">First name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="firstName" 
                                    placeholder="First name"
                                    value={this.state.firstName}
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>
                            
                            <div className=" col-md-12">
                                <label htmlFor="inputPassword4">Last name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="lastName" 
                                    placeholder="Last name"
                                    value={this.state.lastName}
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    name="address" 
                                    placeholder="32 Nguyen Xien"
                                    value={this.state.address}
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>
                        
                            <div className="col-md-12">
                                <label htmlFor="inputPhone">Phone number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                         color="primary"
                          onClick={()=>this.handleUpdateUser()}
                          >Update</Button>
                        <Button color="secondary" onClick={()=>this.toggle()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);
