import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { MDBInput } from "mdbreact";
import './ManageDoctor.scss'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctorApi} from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props){
        super(props)
        this.state={
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:'',
            allDoctors:'',
            isOldData:false,
        }
    }

    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
        console.log('handleEditorChange', html, text);
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData)=>{
        let result=[]
        let {language}=this.props
        if(inputData && inputData.length>0){
            inputData.map((item, index)=>{
                let object={}
                let labelEn=`${item.lastName} ${item.firstName}`
                let labelVi=`${item.firstName} ${item.lastName}`
                object.label= language === LANGUAGES.VI ? labelVi : labelEn
                object.value=item.id
                result.push(object)
            })
            
        }

        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                allDoctors:dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                allDoctors:dataSelect
            })
        }
    }
    handleSaveContentMarkdown=()=>{
        let {isOldData}=this.state
        this.props.saveDoctor({
            contentHTML:this.state.contentHTML,
            contentMarkdown:this.state.contentMarkdown,
            description:this.state.description,
            doctorId:this.state.selectedDoctor.value,
            action:isOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE
        })
            this.setState({
                contentMarkdown:'',
                contentHTML:'',
                selectedDoctor:'',
                description:'',
                isOldData:false,
            })
        console.log(this.state);
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({
            selectedDoctor 
        });
        let res = await getDetailInforDoctorApi(selectedDoctor.value)
        if(res && res.errCode===0 && res.data && res.data.Markdown){
            let markdown=res.data.Markdown
            this.setState({
                contentHTML:markdown.contentHTML,
                contentMarkdown:markdown.contentMarkdown,
                description:markdown.description,
                isOldData:true
            })
        }else{
            this.setState({
                contentHTML:'',
                contentMarkdown:'',
                description:'',
                isOldData:false
            })
        }
    }

    hanldeOnChangeDecs=(e)=>{
        this.setState({
            description:e.target.value
        })
    }
    render() {
        let {selectedDoctor,allDoctors,isOldData}=this.state
        return (
            <div className='manage-doctor'>
                <div className='container'>
                    <Form className='row'>
                        <div className='manage-doctor-title my-3 title'>
                            Tạo thêm thông tin bác sĩ
                        </div>
                        <Form className='col-5'>
                            <Form.Label>Chọn bác sĩ:</Form.Label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.allDoctors}
                            />
                        </Form>
                    
                        <Form className='col-7 mb-4 info'>
                            <Form.Label>Thông tin giới thiệu:</Form.Label>
                            <MDBInput className='more-info' type="textarea" rows="1" icon="pencil-alt" 
                                onChange={(e)=>this.hanldeOnChangeDecs(e)}
                                value={this.state.description}
                            />
                            <div className='line col-7'></div>
                        </Form>
                    
                        <div className='manage-doctor-editor mb-3'>
                            <MdEditor style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.contentMarkdown}/>
                        </div>
                        <Form>
                            <button  
                                className={isOldData === true ? ' btn btn-warning col-2' : 'btn btn-primary col-2' } type='button'
                                onClick={()=>this.handleSaveContentMarkdown()}
                            >
                                {isOldData === true ?  <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                                
                            </button>
                        </Form>
                        
                    </Form>
                </div>
            </div>  
        )}
}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        allDoctors:state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:(id)=>dispatch(actions.fetchAllDoctors()),
        saveDoctor:(data)=>dispatch(actions.saveDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
