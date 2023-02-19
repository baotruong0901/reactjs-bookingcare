import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';

import VietDuc from '../../assets/images/vietduc.jpeg'
import ChoRay from '../../assets/images/choray.jpeg'
import YDuoc from '../../assets/images/yduoc.jpeg'
import BenhVien108 from '../../assets/images/benhvien108.jpeg'
import HungViet from '../../assets/images/hungviet.png'
import Medlatec from '../../assets/images/med.png'
import Diag from '../../assets/images/diag.png'
import ThuCuc from '../../assets/images/thucuc.png'

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state=[
            {
                id:"1",
                image:VietDuc,
                title:<FormattedMessage id="medical.Vietduc"/>
            },
            {
                id:"2",
                image:ChoRay,
                title:<FormattedMessage id="medical.Choray"/>
            },
            {
                id:"3",
                image:YDuoc,
                title:<FormattedMessage id="medical.Yduoc"/>
            },
            {
                id:"4",
                image:BenhVien108,
                title:<FormattedMessage id="medical.Benhvien108"/>
            },
            {
                id:"5",
                image:HungViet,
                title:<FormattedMessage id="medical.Hungviet"/>
            },
            {
                id:"6",
                image:Medlatec,
                title:<FormattedMessage id="medical.Medlatec"/>
            },
            {
                id:"7",
                image:Diag,
                title:<FormattedMessage id="medical.Diag"/>
            },
            {
                id:"8",
                image:ThuCuc,
                title:<FormattedMessage id="medical.Thucuc"/>
            },
        ]
    }

    next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 4,
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
        }
        let arrMedical=this.state
        return (
            <div>
                <React.Fragment>
                <div className='medical-facility'>
                    <div className='container'>
                        <div className='medical-facility-content'>
                            <div className='title d-flex justify-content-between pt-5 pb-4'>
                                <h2><FormattedMessage id="medical.medical-facility"/></h2>
                                <button className='btn'><FormattedMessage id="medical.search"/></button>
                            </div>

                            <Slider ref={c => (this.slider = c)} {...settings}>
                                {arrMedical && arrMedical.map((item,index)=>(
                                    <div key={index} className='img-customize pb-5'>
                                    <div className='image' style={{ backgroundImage: `url(${item.image})`}}></div>
                                    <h3>{item.title}</h3>
                                </div>
                                ))}
                            </Slider>
                            <div>
                                <span className=" prev" onClick={this.previous}>
                                    <i className="fas fa-chevron-left"></i>
                                </span>
                                <span className=" next" onClick={this.next}>
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
