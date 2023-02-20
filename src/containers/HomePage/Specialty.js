import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import specialty1 from '../../assets/images/xuongkhop.jpeg'
import specialty2 from '../../assets/images/thankinh.jpeg'
import specialty3 from '../../assets/images/tieuhoa.jpeg'
import specialty4 from '../../assets/images/timmach.jpeg'
import specialty5 from '../../assets/images/taimuihong.jpeg'
import specialty6 from '../../assets/images/cotsong.jpeg'
import specialty7 from '../../assets/images/yhoccotruyen.jpeg'
import specialty8 from '../../assets/images/chamcuu.jpeg'
import specialty9 from '../../assets/images/sanphukhoa.jpeg'
import specialty10 from '../../assets/images/sieuam.jpeg'
import specialty11 from '../../assets/images/nhikhoa.jpeg'
import specialty12 from '../../assets/images/dalieu.jpeg'
import specialty13 from '../../assets/images/viemgan.jpeg'
import specialty14 from '../../assets/images/suckhoetamthan.jpeg'
import specialty15 from '../../assets/images/diungmiendich.jpeg'
import specialty16 from '../../assets/images/phoi.jpeg'
import specialty17 from '../../assets/images/thankinh.jpeg'
import specialty18 from '../../assets/images/chuyenkhoamat.jpeg'
import specialty19 from '../../assets/images/thantietnieu.jpeg'
import specialty20 from '../../assets/images/noikhoa.jpeg'
import specialty21 from '../../assets/images/khamtongquat.jpeg'
import specialty22 from '../../assets/images/nhakhoa.jpeg'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state=[
            {
                id:"1",
                image:specialty1,
                title:<FormattedMessage id="specialty.Musculoskeletal"/>
            },
            {
                id:"2",
                image:specialty2,
                title:<FormattedMessage id="specialty.Nerve"/>
            },
            {
                id:"3",
                image:specialty3,
                title:<FormattedMessage id="specialty.Digestion"/>
            },
            {
                id:"4",
                image:specialty4,
                title:<FormattedMessage id="specialty.Heart"/>
            },
            {
                id:"5",
                image:specialty5,
                title:<FormattedMessage id="specialty.Ear-nose-study"/>
            },
            {
                id:"6",
                image:specialty6,
                title:<FormattedMessage id="specialty.Spine"/>
            },
            {
                id:"7",
                image:specialty7,
                title:<FormattedMessage id="specialty.Traditional-medicine"/>
            },
            {
                id:"8",
                image:specialty8,
                title:<FormattedMessage id="specialty.Acupuncture"/>
            },
            {
                id:"9",
                image:specialty9,
                title:<FormattedMessage id="specialty.Obstetrics-Gynecology"/>
            },
            {
                id:"10",
                image:specialty10,
                title:<FormattedMessage id="specialty.Supersonic"/>
            },
            {
                id:"11",
                image:specialty11,
                title:<FormattedMessage id="specialty.Pediatrics"/>
            },
            {
                id:"12",
                image:specialty12,
                title:<FormattedMessage id="specialty.Dermatology"/>
            },
            {
                id:"13",
                image:specialty13,
                title:<FormattedMessage id="specialty.Hepatitis"/>
            },
            {
                id:"14",
                image:specialty14,
                title:<FormattedMessage id="specialty.Mental-health"/>
            },
            {
                id:"15",
                image:specialty15,
                title:<FormattedMessage id="specialty.immune-allergy"/>
            },
            {
                id:"16",
                image:specialty16,
                title:<FormattedMessage id="specialty.Lung"/>
            },
            {
                id:"17",
                image:specialty17,
                title:<FormattedMessage id="specialty.Extranervous-system"/>
            },
            {
                id:"18",
                image:specialty18,
                title:<FormattedMessage id="specialty.Ophthalmology"/>
            },
            {
                id:"19",
                image:specialty19,
                title:<FormattedMessage id="specialty.Urinary-kidney"/>
            },
            {
                id:"20",
                image:specialty20,
                title:<FormattedMessage id="specialty.Medical"/>
            },
            {
                id:"21",
                image:specialty21,
                title:<FormattedMessage id="specialty.General-examination"/>
            },
            {
                id:"22",
                image:specialty22,
                title:<FormattedMessage id="specialty.dentistry"/>
            }
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
            };
        
        let arrSpecialty=this.state
        console.log(arrSpecialty[0]);
        return (
            <React.Fragment>
                <div className='specialty'>
                    <div className='container'>
                        <div className='specialty-content'>
                            <div className='title d-flex justify-content-between pt-5 pb-4'>
                                <h2><FormattedMessage id="specialty.Popular-specialties"/></h2>
                                <button className='btn'><FormattedMessage id="specialty.see-more"/></button>
                            </div>

                            <Slider ref={c => (this.slider = c)} {...settings}>
                                {arrSpecialty && arrSpecialty.map((item,index) =>(
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
