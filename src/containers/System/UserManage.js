import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllUsers,CreateNewUserApi,DeleteUserApi,updateUserApi} from "../../services/userService"
import './userManage.scss'
import ModalUser from './ModalUser';
import ModalUpdateUser from './ModalUpdateUser';

class UserManage extends Component {

    constructor(props){
        super(props)
        this.state={
            arrUsers:[],
            isOpenModalUser:false,
            isOpenModalUpdateUser:false,
            userUpdate:{}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async()=>{
        let response= await getAllUsers('ALL')
        if(response && response.errCode===0){
            this.setState({
                arrUsers:response.users
            })

        }
    }

    handleAddNewUser=()=>{
        this.setState({
            isOpenModalUser:true,
        })
    }

    toggleUserModal=()=>{
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser
        })
    }

    toggleUpdateUserModal=()=>{
        this.setState({
            isOpenModalUpdateUser:!this.state.isOpenModalUpdateUser
        })
    }

    createNewUser = async(data)=>{
        //add new user
        try{
            let response = await CreateNewUserApi(data)
            if(response && response.errCode!==0){
                alert(response.message)
            }else{
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser:false
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    handleDelete = async(user) =>{
        try{
            let response=await DeleteUserApi(user.id)
            if(response && response.errCode===0){
                await this.getAllUsersFromReact()
            }else{
                alert(response.message)
            }
        }catch(err){
            console.log(err);
        }
    }

    handleUpdate = (user)=>{
        this.setState({
            isOpenModalUpdateUser:true,
            userUpdate:user
        })
    }

    doUpdateUser =async(user)=>{
        try{
            let response=await updateUserApi(user)
            if(response && response.errCode===0){
                this.setState({
                    isOpenModalUpdateUser:false
                })
                await this.getAllUsersFromReact()
            }else{
                console.log(response)
            }
        }catch(err){
            console.log(err);
        }
    }

    render() {
        let arrUsers=this.state.arrUsers
        return (
            <div className='container w-100'>
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalUpdateUser &&
                    <ModalUpdateUser
                        isOpen={this.state.isOpenModalUpdateUser}
                        toggleUserModal={this.toggleUpdateUserModal}
                        currentUser={this.state.userUpdate}
                        editUser={this.doUpdateUser}
                    />
                }
                <div className="text-center mb-3 title">
                    Manage Users
                </div>
                <div className='btn btn-light mb-3 add-new col-xl-2 col-sm-4 col-md-2'
                onClick={()=>this.handleAddNewUser()}
                >
                    <i className="fas fa-plus"></i> Add new
                </div>
                <table className="table">
                    <thead>
                        <tr className='bg-light'>
                            <th className='col-1' scope="col">ID</th>
                            <th className='col-3' scope="col">Email</th>
                            <th className='col-2' scope="col">First name</th>
                            <th className='col-2' scope="col">Last name</th>
                            <th className='col-2' scope="col">Address</th>
                            <th className='col-2' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                arrUsers && arrUsers.map((item,index)=>{
                                    return(
            
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                onClick={()=>this.handleUpdate(item)}><i className="far fa-edit"></i></button>
                                                <button className='btn-delete'
                                                onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
