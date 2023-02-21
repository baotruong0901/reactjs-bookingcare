import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { dateFormat, LANGUAGES} from '../../../utils';
import {getDetailInforDoctorApi,saveBulkScheduleDoctor} from '../../../services/userService'
import DatePicker from '../../../components/Input/DatePicker'   

import moment from 'moment';
import { fetchAllCodeScheduleTime } from '../../../store/actions';
import { toast } from 'react-toastify';
import _ from 'lodash';



class ManageSchdule extends Component {
    constructor(props){
        super(props)
        this.state={
            allDoctors:[],
            selectedDoctor:'',
            currentDate:'',
            rangeTime:[],
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors()
        this.props.fetchAllCodeScheduleTime()
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
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data=this.props.allScheduleTime
            if(data && data.length>0){
                // data.map(item=>{
                //     item.isSelected=false
                //     return item
                // })
                data=data.map(item=>({...item, isSelected:false}))
            }
            this.setState({
                rangeTime:data
            })
        }

    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({
            selectedDoctor 
        });
        // let res = await getDetailInforDoctorApi(selectedDoctor.value)
        // if(res && res.errCode===0 && res.data && res.data.Markdown){
        //     let markdown=res.data.Markdown
        //     this.setState({
        //         contentHTML:markdown.contentHTML,
        //         contentMarkdown:markdown.contentMarkdown,
        //         description:markdown.description,
        //         isOldData:true
        //     })
        // }else{
        //     this.setState({
        //         contentHTML:'',
        //         contentMarkdown:'',
        //         description:'',
        //         isOldData:false
        //     })
        // }
    }
    
    handleOnChangeDatePicker = (date)=>{
        this.setState({
            currentDate:date[0]
        })
    }

    handleClickBtnTime = (time)=>{
        // console.log('>>>' , time);
        let {rangeTime}=this.state
        if(rangeTime && rangeTime.length>0){
            rangeTime=rangeTime.map(item=>{
                if(item.id === time.id) item.isSelected=!item.isSelected
                return item
            })
            this.setState({
                rangeTime:rangeTime
            })
        }
    }
    
    handleSaveSchedule=async()=>{
        let {rangeTime, allDoctors,selectedDoctor,currentDate}=this.state
        let result=[]
        if(!currentDate){
            toast.error('Invalid date!')
            return
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid selected doctor!')
            return
        }

        let formatedDate=new Date(currentDate).getTime()
        console.log('formatedDate:',formatedDate);
        if(rangeTime && rangeTime.length>0){
            let selectedTime=rangeTime.filter(item=>item.isSelected===true)
            if(selectedTime && selectedTime.length> 0){
                selectedTime.map(time=>{
                    let object={}
                    object.doctorId=selectedDoctor.value
                    object.date=formatedDate
                    object.timeType=time.keyMap
                    result.push(object)
                })
            }else{
                toast.error('Invalid selected time!')
                return
            }
        }

        let res=await saveBulkScheduleDoctor({
            arrSchedule:result,
            doctorId:selectedDoctor.value,
            formatedDate:formatedDate
        })
        if(res && res.errCode === 0){
            toast.success('Save schedule time succeed!')
        }else{
            toast.error('Error save schedule time!')
        }
    }

    render() {
        let {rangeTime}=this.state
        let {language}=this.props
        return (
            <>
                <div className='manage-schedule'>
                    <div className='container'>
                        <div className='manage-schedule-title title'>
                            <FormattedMessage id="manage-schedule.title" />
                        </div>
                        <Form className='row'>
                            <Form.Group className='col-12 col-md-6'>
                                <Form.Label><FormattedMessage id="manage-schedule.choose-doctor" /></Form.Label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.allDoctors}
                                />
                            </Form.Group>
                            <Form.Group className='col-12 col-md-6'>
                                <Form.Label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </Form.Label>
                                <DatePicker
                                    className='col-12 form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    minDate={new Date().setHours(0,0,0,0) }
                                />
        
                            </Form.Group>
                            <Form.Group className='fick-hour col-12 my-4'>
                                {rangeTime && rangeTime.length>0 &&
                                    rangeTime.map((item,index)=>{
                                        return(
                                            <button type='button'
                                             className={item.isSelected===true ? 'btn schedule-time active':'btn schedule-time'}
                                              key={index}
                                              onClick={()=>this.handleClickBtnTime(item)}
                                              >
                                            {language===LANGUAGES.VI ? item.valueVi : item.valueEn}    
                                            </button>
                                        )
                                    })
                                }
                            </Form.Group>
                            <button type='button'
                             className='btn btn-primary col-2'
                             onClick={()=>this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </Form>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleTime:state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime:()=>dispatch(actions.fetchAllCodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchdule);
