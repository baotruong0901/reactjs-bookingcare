import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllCodeApi } from '../../../services/userService';
import { LANGUAGES , CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableUser from './TableUser';
class UserRedux extends Component {

    constructor(props){
        super(props)
        this.state={
            genderArr:[],
            roleArr:[],
            positionArr:[],
            previewImgUrl:'',
            isOpen:false,
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',

            action:''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let propsGender=this.props.genderRedux
            this.setState({
                genderArr:propsGender,
                gender:propsGender && propsGender.length>0 ? propsGender[0].keyMap :''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            let propsrole=this.props.roleRedux
            this.setState({
                roleArr:propsrole,
                role:propsrole && propsrole.length>0 ? propsrole[0].keyMap : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            let propsPosition=this.props.positionRedux
            this.setState({
                positionArr:propsPosition,
                position:propsPosition && propsPosition.length>0 ? propsPosition[0].keyMap : ''
            })
        }

        if(prevProps.users !== this.props.users){
            let propsGender=this.props.genderRedux
            let propsrole=this.props.roleRedux
            let propsPosition=this.props.positionRedux
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender:propsGender && propsGender.length>0 ? propsGender[0].keyMap :'',
                position:propsPosition && propsPosition.length>0 ? propsPosition[0].keyMap : '',
                role:propsrole && propsrole.length>0 ? propsrole[0].keyMap : '',
                previewImgUrl:'',
                action:CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImg=async(e)=>{
        let data=e.target.files
        let file = data[0]
        if(file){
            let base64=await CommonUtils.getBase64(file)
            console.log('>>>>',base64);
            let Url=URL.createObjectURL(file)
            this.setState({
                previewImgUrl:Url,
                avatar:base64
            })
        }
        
        
    }
    openPreviewImage = ()=>{
        if(!this.state.previewImgUrl){
            return
        }
        this.setState({
            isOpen:true
        })
    }

    handleSubmitUser = () =>{
        let isValid= this.checkValidateInput()
        if(isValid===false) return
        let {action}=this.state

        if(action===CRUD_ACTIONS.CREATE){
            //fire redux action create
            this.props.createNewUser({
                email: this.state.email,
                password:this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber:this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId:this.state.position,
                avatar:this.state.avatar
            })
        }
        if(action===CRUD_ACTIONS.UPDATE){
            //fire redux action update
            this.props.updateUserRedux({
                id:this.state.id,
                email: this.state.email,
                password:this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber:this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId:this.state.position,
                avatar:this.state.avatar
            })
        }

        
    }

    checkValidateInput = () =>{
        let isValid=true
        let arrCheck=['email','password','lastName','firstName','phoneNumber','address']
        for (let index = 0; index < arrCheck.length; index++) {
            if(!this.state[arrCheck[index]]){
                isValid=false
                alert('This input requires: '+ arrCheck[index])
                break
            }
        }
        return isValid
    }

    onChangeInput = (e,id)=>{
        let copyState = {...this.state}
        copyState[id]=e.target.value
        this.setState({
            ...copyState
        })
    }

    handleUpdateUserFromParent = (user)=>{
        let imageBase64=''
        if(user.image){
            const imageBuffer= new Buffer(user.image,'base64')
            imageBase64=imageBuffer.toString('binary')
        }
        this.setState({
            id:user.id,
            email: user.email,
            password:'hello',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber:user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            position:user.positionId,
            previewImgUrl:imageBase64,
            action:CRUD_ACTIONS.UPDATE
        })
    }

    render() {
        let {language,isLoadingGender}=this.props
        let {genderArr,positionArr,roleArr}=this.state
        let {email,password,lastName,firstName,phoneNumber,address,gender,position,role,avatar}=this.state
        console.log('>>>>>>>>>>',this.state);
        return (
            <div className='user-redux'>
                <div className='container'>
                    <div className="text-center title" >User Redux</div>
                    <div className='user-redux-body'>
                          <Form className='row mb-5'>
                            <div className='col-12'>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                            <Form.Group className='mb-2'>
                                <Button variant="primary" type="button">
                                    <FormattedMessage id="manage-user.add" />
                                </Button>
                            </Form.Group>

                            <Form.Group className="mb-2 col-3" controlId="formBasicEmail">
                                <Form.Label><FormattedMessage id="manage-user.email" /></Form.Label>
                                <Form.Control
                                    disabled={this.state.action===CRUD_ACTIONS.UPDATE ? true :false } 
                                    type="email" name='email' value={email} 
                                    placeholder='Enter email' 
                                    onChange={(e)=>this.onChangeInput(e,'email')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 col-3" controlId="formBasicPassword">
                                <Form.Label><FormattedMessage id="manage-user.password" /></Form.Label>
                                <Form.Control 
                                    disabled={this.state.action===CRUD_ACTIONS.UPDATE ? true :false } 
                                    type="password" name='password' value={password} 
                                    placeholder="Password" 
                                    onChange={(e)=>this.onChangeInput(e,'password')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 col-3" controlId="formBasicFirstName">
                                <Form.Label><FormattedMessage id="manage-user.first-name" /></Form.Label>
                                <Form.Control type="text" name='firstName' value={firstName} placeholder="Fisrt name" 
                                onChange={(e)=>this.onChangeInput(e,'firstName')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 col-3" controlId="formBasicLastName">
                                <Form.Label><FormattedMessage id="manage-user.last-name" /></Form.Label>
                                <Form.Control type="text" name='lastName' value={lastName} placeholder="Last name" 
                                onChange={(e)=>this.onChangeInput(e,'lastName')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 col-3" controlId="formBasicPhoneNumber">
                                <Form.Label><FormattedMessage id="manage-user.phone-number" /></Form.Label>
                                <Form.Control type="text" name='phoneNumber' value={phoneNumber} placeholder="Phone number" 
                                onChange={(e)=>this.onChangeInput(e,'phoneNumber')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2 col-9" controlId="formBasicAddress">
                                <Form.Label><FormattedMessage id="manage-user.address" /></Form.Label>
                                <Form.Control type="text" name='address' value={address} placeholder="Address" 
                                onChange={(e)=>this.onChangeInput(e,'address')}
                                />
                            </Form.Group>

                            <Form.Group  className='mb-2 col-3'>
                                <Form.Label><FormattedMessage id="manage-user.gender" /></Form.Label>
                                <Form.Select name='gender' value={gender} onChange={(e)=>this.onChangeInput(e,'gender')}>
                                    {genderArr && genderArr.length>0 && genderArr.map((item,index)=>{
                                        return (
                                            <>
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            </>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group  className='mb-2 col-3'>
                                <Form.Label><FormattedMessage id="manage-user.position" /></Form.Label>
                                <Form.Select name='position' value={position} onChange={(e)=>this.onChangeInput(e,'position')}>
                                    {positionArr && positionArr.length>0 && positionArr.map((item,index)=>{
                                            return (
                                                <>
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </>
                                            )
                                        })}
                                </Form.Select >
                            </Form.Group>

                            <Form.Group  className='mb-2 col-3'>
                                <Form.Label><FormattedMessage id="manage-user.role" /></Form.Label>
                                <Form.Select name='role' value={role} onChange={(e)=>this.onChangeInput(e,'role')}>
                                    {roleArr && roleArr.length>0 && roleArr.map((item,index)=>{
                                            return (
                                                <>
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </>
                                            )
                                        })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group  className='mb-2 col-3'>
                                <Form.Label className='mb-2'><FormattedMessage id="manage-user.image" /></Form.Label>
                                <Form.Group>
                                    <Form.Label className='label-upload col-12' htmlFor='previewImg' ><i className='fas fa-images'></i><span><FormattedMessage id="manage-user.upload"/></span></Form.Label>
                                    <Form.Control hidden type="file" id='previewImg' placeholder='image'
                                        onChange={(e)=>this.handleOnchangeImg(e)}
                                    />

                                </Form.Group>
                            </Form.Group>

                            <Form.Group className='col-9'>
                                <Button variant={this.state.action===CRUD_ACTIONS.UPDATE ? "warning" :"primary" } type="button"
                                    onClick={()=> this.handleSubmitUser()}
                                    
                                >
                                    {this.state.action===CRUD_ACTIONS.UPDATE ?
                                    <FormattedMessage id="manage-user.update" />
                                    :
                                    <FormattedMessage id="manage-user.submit" />
                                    }
                                </Button>
                            </Form.Group>
                            <Form.Group className='col-3'>
                                {this.state.previewImgUrl!=='' ?
                                <div className='privew-image' 
                                    style={{backgroundImage:`url(${this.state.previewImgUrl})`}}
                                    onClick={()=>this.openPreviewImage()}
                                >
                                </div> 
                                :
                                ''   
                                }
                                
                            </Form.Group>

                            
                        </Form>
                        <TableUser 
                        handleUpdateUserFromParent={this.handleUpdateUserFromParent}
                        action={this.state.action}
                        />
                    </div>

                    {this.state.isOpen === true && 
                        <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        genderRedux:state.admin.genders,
        roleRedux:state.admin.roles,
        positionRedux:state.admin.positions,
        isLoadingGender:state.admin.isLoadingGender,
        users:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:()=>dispatch(actions.fetchGenderStart()),
        getRoleStart:()=>dispatch(actions.fetchRoleStart()),
        getPositionStart:()=>dispatch(actions.fetchPositionStart()),
        createNewUser:(data)=>dispatch(actions.createNewUser(data)),
        updateUserRedux: (data)=>dispatch(actions.updateUser(data)),
        // processLogout:()=>dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language)=>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
