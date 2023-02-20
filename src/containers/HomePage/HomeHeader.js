import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import banner1 from '../../assets/images/khamchuyenkhoa.png'
import banner2 from '../../assets/images/khamtuxa.png'
import banner3 from '../../assets/images/khamtongquat.png'
import banner4 from '../../assets/images/dichvuxetnghiem.png'
import banner5 from '../../assets/images/suckhoetinhthan.png'
import banner6 from '../../assets/images/khamnhakhoa.png'
import banner7 from '../../assets/images/phau-thuat.jpeg'
import banner8 from '../../assets/images/khamtainha.png'
import banner9 from '../../assets/images/suckhoedoanhnghiep.jpeg'
import { LANGUAGES } from '../../utils';
// import {changeLanguageApp} from '../../store/actions' 
import * as actions from "../../store/actions";
class HomeHeader extends Component {
    constructor(props){
        super(props)
        this.state={
            banner:[
            {
                icon:banner1,
                text:<FormattedMessage id="banner.specialist-examination"/>
            },
            {
                icon:banner2,
                text:<FormattedMessage id="banner.remote-examination"/>
            },
            {
                icon:banner3,
                text:<FormattedMessage id="banner.general-examination"/>
            },
            {
                icon:banner4,
                text:<FormattedMessage id="banner.medical-test"/>            
            },
            {
                icon:banner5,
                text:<FormattedMessage id="banner.mental-health"/>
            },
            {
                icon:banner6,
                text:<FormattedMessage id="banner.dental-examination"/>
            },
            {
                icon:banner7,
                text:<FormattedMessage id="banner.surgery-package"/>
            },
            {
                icon:banner8,
                text:<FormattedMessage id="banner.medical-products"/>
            },
            {
                icon:banner9,
                text:<FormattedMessage id="banner.business-health"/>
            },
            ],
            isStiky:true
        }
    }
    changeLanguage = (language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    returnHome=()=>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        let banner=this.state.banner
        let language=this.props.language
        return (
            <React.Fragment>
                <div className='home-header fixed'>
                    <div className='container'>
                        <div className='home-header-content d-flex row'>
                            <div className='left-content col-3 d-flex align-items-center justify-content-start'>
                                <button>
                                    <i className="fas fa-bars"></i>
                                </button>
                                <div className='header-logo' onClick={()=>this.returnHome()}></div>
                            </div>
                            <div className='center-content col-6 d-flex align-items-center justify-content-between'>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                    <div>
                                        <p><FormattedMessage id="homeheader.searchdoctor"/></p>
                                    </div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                                    <div>
                                        <p><FormattedMessage id="homeheader.select-room"/></p>
                                    </div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                    <div>
                                        <p><FormattedMessage id="homeheader.select-doctor"/></p>
                                    </div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="homeheader.Examination-package"/></b></div>
                                    <div>
                                        <p><FormattedMessage id="homeheader.chek-health"/></p>
                                    </div>
                                </div>
                            </div>
                            <div className='right-content col-3 d-flex align-items-center justify-content-end'>
                                <div className='support'>
                                    <i className="fas fa-question-circle"></i>
                                    <FormattedMessage id="homeheader.support"/>
                                </div>
                                <div className='flag d-flex'>
                                    <span className={language===LANGUAGES.VI ? 'action': ''} onClick={()=>this.changeLanguage(LANGUAGES.VI)}>Vi</span>
                                    <span className={language===LANGUAGES.EN ? 'action': ''} onClick={()=>this.changeLanguage(LANGUAGES.EN)}>En</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && 
                <div className='home-header-banner'>
                    <div className='background-header'>
                            <div className='box-content '>
                                <div className='box-content-top'>
                                    <div className='title-top'>
                                        <p><FormattedMessage id="banner.medical-background"/></p>
                                    </div>
                                    <div className='title-bottom'>
                                        <h2><FormattedMessage id="banner.health-care"/></h2>
                                    </div>
                                    <div className='search-box'>
                                        <form>
                                            <input type="text" placeholder="..." name="search2"/>
                                            <button type="submit"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className='box-content-bottom'>
                                    <ul className='options  row d-flex justify-content-around align-item-start'>
                                        {banner && banner.map((item,index)=>(
                                            <li key={index} className='option-child col-4 col-md-2 col-lg-1'>
                                                <div className='icon' style={{ backgroundImage: `url(${item.icon})`}}>
                                                </div>
                                                <div className='text'>{item.text}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                </div>
                }
                
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout:()=>dispatch(actions.processLogout()),
        changeLanguageAppRedux:(language)=>dispatch(actions.changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
