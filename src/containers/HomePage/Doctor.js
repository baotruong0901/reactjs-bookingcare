import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Doctor.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions'
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state=[
            {
                arrDoctor:[],
                index:0
            }
        ]
      }

      componentDidMount=()=>{
        this.props.loadTopDoctors()
      }
      componentDidUpdate=(prevProps,prevState,snapshot)=>{
        if(prevProps.topDoctorsRedux !==this.props.topDoctorsRedux){
            this.setState({
                arrDoctor:this.props.topDoctorsRedux
            })
        }
      }
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }
      beforeChange = (prev, next) => {
        this.setState({ index: next });
      }

      handleViewDetailDoctor = (doctor)=>{
        if(this.props.history){
            this.props.history.push(`/detail_doctor/${doctor.id}`)
        }
      }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows:true,
            beforeChange: this.beforeChange,
            responsive: [
                {
                  breakpoint: 740,
                  settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,
                    infinite: false,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: false
                  }
                },
                {
                  breakpoint: 475,
                  settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                  }
                }
              ]
        };
        let {language}=this.props
        let {arrDoctor,index}=this.state
        console.log('doctor: ', this.props.topDoctorsRedux);
        return (
            <React.Fragment>
                <div className='doctor'>
                    <div className='container'>
                        <div className='doctor-content mb-5'>
                            <div className='title d-flex justify-content-between pt-5 pb-4'>
                                <h2><FormattedMessage id="doctor.doctor-popular"/></h2>
                                <button className='btn'><FormattedMessage id="doctor.see-more"/></button>
                            </div>

                            <Slider ref={c => (this.slider = c)} {...settings}>
                                {arrDoctor && arrDoctor.length>0 && arrDoctor.map((item,index) =>{
                                    let imageBase64=''
                                    if(item.image){
                                        const imageBuffer= new Buffer(item.image,'base64')
                                        imageBase64=imageBuffer.toString('binary')
                                    }
                                    let nameVi=`${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                    let nameEn=`${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`
                                    return(
                                        <div key={index} className='customize pb-5'
                                            onClick={()=>this.handleViewDetailDoctor(item)}
                                        >
                                            <div className='box-image'>
                                                <div className='image' style={{ backgroundImage: `url(${imageBase64})`}}></div>
                                            </div>
                                            <div>
                                                <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                                                <p>Cơ xương khớp</p>
                                            </div>
                                        </div>
                                    )  
                                })}
                            </Slider>
                            <div>
                                <span className="prev" hidden={index===0} onClick={this.previous}>
                                    <i className="fas fa-chevron-left"></i>
                                </span>

                                <span className=" next" hidden={index===4} onClick={this.next}>
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language,
        topDoctorsRedux:state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: ()=>dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
