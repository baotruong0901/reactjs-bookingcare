import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
    }

    componentDidMount() {
    }

    toggle=()=>{
        this.props.toggleUserModal()
    }

    handleOnchangeInput=(e)=>{
        // let copyState={...this.state}
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

    handleAddnewUser=()=>{
        let isValid = this.checkValideInput()
        if(isValid===true){
            this.props.createNewUser(this.state)
        }
        
    }
    render() {
        return (
            <div>
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={()=>this.toggle()} 
                    className={'modal-add-new'}
                    size="lg"
                    centered
                    
                >
                    <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 mt-3">
                            <div className=" col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Email"
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className=" col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputEmail4">First name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="firstName" 
                                    placeholder="First name"
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className=" col-md-6">
                                <label htmlFor="inputPassword4">Last name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="lastName" placeholder="Last name"
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    name="address" placeholder="32 Nguyen Xien"
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>
                        
                            <div className="col-md-6">
                                <label htmlFor="inputPhone">Phone number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phoneNumber"
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputState">Sex</label>
                                <select name="gender" className="form-control">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputRole">Role</label>
                                <select name="roleId" className="form-control">
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                         color="primary"
                          onClick={()=>this.handleAddnewUser()}
                          >Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
