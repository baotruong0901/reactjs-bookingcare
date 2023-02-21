import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as actions from "../../store/actions";



import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            isShowPassword:false,
            errMessage:''
        }
    }
    handleOnchangeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLogin =async(e)=>{
        this.setState({
            errMessage:''
        })
        try{
            let data= await handleLoginApi(this.state.username,this.state.password)
            if(data && data.errCode !==0){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data && data.errCode ===0){
                //todo
                this.props.userLoginSuccess(data.userData.user)
            }
        }catch(err){
            if (err.response) {
                if (err.response.data) {
                    this.setState({
                        errMessage:err.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })
    }

    handleKeyDown = (e)=>{
        if(e.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {
        return (
           <>
                <div className='Login'>
                    <div className='container d-flex justify-content-center'>
                        <Form 
                        className='Login-form row p-5'
                        onKeyDown={(e)=>this.handleKeyDown(e)}
                        >
                            <div className='Login-header col-12 mb-5 mt-1'>
                                Login
                            </div>
                            <Form.Group className='col-12 mb-4'>
                                <Form.Label className='label'>Username</Form.Label>
                                <Form.Control className='input' name='username' type="text" placeholder="Enter your user name"
                                    value={this.state.username} 
                                    onChange={(e)=>this.handleOnchangeInput(e)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='form-input-password col-12 mb-2'>
                                <Form.Label className='label'>Password</Form.Label>
                                <Form.Control className='input' name='password' type={this.state.isShowPassword ? 'text' :'password' } placeholder="Enter your password"
                                    value={this.state.password} 
                                    onChange={(e)=>this.handleOnchangeInput(e)}
                                    
                                    >
                                </Form.Control>
                                <span onClick={()=>this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </span>      
                            </Form.Group>
                            <div className='col-12 err mb-2'>
                                <i>
                                    {this.state.errMessage}
                                </i>
                            </div>
                            <Button
                                className='btn-submit mb-4 col-12'
                                onClick={(e)=>this.handleLogin(e)}
                                >
                                Log in
                            </Button>
                            <div className='Forgot-password col-12 mb-5'>
                                Forgot your password?
                            </div>
                            <div className='col-12 text-center mb-3'>
                                Or Login with:
                            </div>
                            <div className='col-12 social-login d-flex justify-content-center mb-1'>
                                <i className="fab fa-facebook-f fb"></i>
                                <i className="fab fa-twitter tw"></i>
                                <i className="fab fa-google-plus-g google"></i>
                            </div>
                        </Form>
                    </div>
                </div>
           </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=>dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
