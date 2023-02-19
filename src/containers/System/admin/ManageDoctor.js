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
import { LANGUAGES } from '../../../utils';



const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props){
        super(props)
        this.state={
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:'',
            allDoctors:''
        }
    }

    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
        console.log('handleEditorChange', html, text);
    }

    async componentDidMount() {
        this.props.fetchAllDoctors()
    }

    buildDataInputSelect = (inputData)=>{
        let result=[]
        let {language}=this.props
        if(inputData && inputData.length>0){
            inputData.map((item, index)=>{
                let object={}
                let labelVi=`${item.lastName} ${item.firstName}`
                let labelEn=`${item.firstName} ${item.lastName}`
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
        // this.props.saveDoctor({
        //     contentHTML:this.state.contentHTML,
        //     contentMarkdown:this.state.contentMarkdown,
        //     description:this.state.description,
        //     doctorId:this.state.selectedDoctor.value
        // })
    }

    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor 
        });
    }

    hanldeOnChangeDecs=(e)=>{
        this.setState({
            description:e.target.value
        })
    }
    render() {
        let {selectedDoctor,allDoctors}=this.state
        console.log(allDoctors);
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
                                onChange={this.handleChange}
                                options={this.state.allDoctors}
                            />
                        </Form>
                    
                        <Form className='col-7 mb-4 info'>
                            <Form.Label>Thông tin giới thiệu:</Form.Label>
                            <MDBInput className='more-info' type="textarea" rows="1" icon="pencil-alt" 
                                onChange={(e)=>this.hanldeOnChangeDecs(e)}
                            />
                            <div className='line col-7'></div>
                        </Form>
                    
                        <div className='manage-doctor-editor mb-3'>
                            <MdEditor style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} />
                        </div>
                        <Form>
                            <Button  
                                className='btn btn-primary col-2' type='button'
                                onClick={()=>this.handleSaveContentMarkdown()}
                            >
                                Lưu thông tin
                            </Button>
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
        // saveDoctor:(data)=>dispatch(actions.saveDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
