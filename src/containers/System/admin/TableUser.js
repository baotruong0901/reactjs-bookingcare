import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableUser.scss'
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableUser extends Component {

    constructor(props){
        super(props)
        this.state={
            listUser:[],
        }
    }

    async componentDidMount() {
        this.props.fetchAllUsersRedux()  
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.users !== this.props.users){
            this.setState({
                listUser:this.props.users
            })
        }
    }
    handleDeleteUser = (user)=>{
        this.props.deleteUserRedux(user.id)
    }
    handleUpdateUser=(user)=>{
        this.props.handleUpdateUserFromParent(user)
    }
    render() {
        let {listUser}=this.state
        return (
            <>
                <table className="table">
                    <thead>
                        <tr className='bg-light'>
                            <th className='col-1' scope="col">ID</th>
                            <th className='col-3' scope="col">Email</th>
                            <th className='col-2' scope="col"><FormattedMessage id="manage-user.first-name"/></th>
                            <th className='col-2' scope="col"><FormattedMessage id="manage-user.last-name"/></th>
                            <th className='col-2' scope="col"><FormattedMessage id="manage-user.address"/></th>
                            <th className='col-2' scope="col"><FormattedMessage id="manage-user.action"/></th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                listUser && listUser.map((item,index)=>{
                                    return(
            
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                onClick={()=>this.handleUpdateUser(item)}
                                                >
                                                    <i className="far fa-edit"></i>
                                                </button>
                                                <button className='btn-delete'
                                                onClick={()=>this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )})
                            }
                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>  
        )}
}

const mapStateToProps = state => {
    return {
        users:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersRedux:()=>{dispatch(actions.fetchAllUsersStart())},
        deleteUserRedux:(id)=>{dispatch(actions.deleteUser(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
