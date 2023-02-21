import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions'
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {

     
    constructor(props){
        super(props)
        this.state={
            allDays:[],
            allAvalableTime:[],
        }
    }

    async componentDidMount() {
        let {language}=this.props
        let arrDate=this.getAllDays(language)
        this.setState({
            allDays:arrDate
        })
    }

    capitalizeFirstletter(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getAllDays=(language)=>{
        let arrDate=[]
        for(let i=0; i<7;i++){
            let object={}
            if(language === LANGUAGES.VI){
                if(i===0){
                    let ddMM=moment(new Date()).format('DD/MM')
                    let today=`Hôm nay - ${ddMM}`
                    object.label=today     
                }else{
                    object.label=this.capitalizeFirstletter(moment(new Date()).add(i,'days').format('dddd - DD/MM'))
                }
            }else if(language === LANGUAGES.EN){
                if(i===0){
                    let ddMM=moment(new Date()).format('DD/MM')
                    let today=`Today - ${ddMM}`  
                    object.label=today     
                }else{
                    object.label=moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM')
                }
            }
            object.value=moment(new Date()).add(i,'days').startOf('days').valueOf()
            arrDate.push(object)
        }
        return arrDate

    }

    componentDidUpdate=async(prevProps,prevState,snapshot)=>{
        if(this.props.language !==prevProps.language){
            let arrDate= this.getAllDays(this.props.language)
            this.setState({
                allDays:arrDate
            })
            console.log('arrDate',this.state.allDays);

        }
        if(this.props.currentDoctorId !== prevProps.currentDoctorId){
            let arrDate= this.getAllDays(this.props.language)
            if(arrDate && arrDate.length>0){
                let res= await getScheduleDoctorByDate(this.props.currentDoctorId,arrDate[0].value)
                this.setState({
                    allDays:arrDate,
                    allAvalableTime:res.data ? res.data : []
                })
            }
        }
    }
    handleOnChangeSelect =async(e)=>{
        let detailDoctor=this.props.detailDoctor
        
        if(detailDoctor && detailDoctor.id){
            let doctorId= detailDoctor.id
            let date = e.target.value
            let res=await getScheduleDoctorByDate(doctorId,date)
            if(res && res.errCode===0){
                let data=res.data
                this.setState({
                    allAvalableTime:data ? data : []
                })
            }
        }

    }
    render() {
        let {allDays, allAvalableTime}=this.state
        let {language}=this.props
        return (
            <>
                <div className='schedule'>
                    <div className='schedule-select-day'>
                       <select
                       onChange={(e)=>this.handleOnChangeSelect(e)}>
                        {allDays && allDays.length>0 &&
                        allDays.map((item,index)=>{
                            return(
                                <option key={index} value={item.value}>{item.label}</option>
                            )
                        })}
                       </select>
                    </div>
                    <div className='schedule-time'>
                        <div className='calendar'>
                            <i className="fas fa-calendar-alt"></i>
                            <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>
                        <div className='time'>
                            <>
                                <div className='time-item'>
                                    {allAvalableTime && allAvalableTime.length>0 ?
                                    allAvalableTime.map((item,index)=>{
                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? 'item item-vi' : 'item item-en'} type='button'>{language===LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                                        )
                                    })
                                    :
                                        <span><i><FormattedMessage id="patient.detail-doctor.no-calendar" /></i></span>
                                    }
                                </div>
                                <div className='book-free'>
                                    <FormattedMessage id="patient.detail-doctor.choose"/>
                                     <i className="far fa-hand-point-up"></i>
                                     <FormattedMessage id="patient.detail-doctor.book-free"/>
                                </div>
                            </>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        detailDoctor:state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);