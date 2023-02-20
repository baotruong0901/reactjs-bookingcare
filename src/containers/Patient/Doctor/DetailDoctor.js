import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions'
import './DetailDoctor.scss'
import { LANGUAGES } from '../../../utils';
class DetailDoctor extends Component {

     
    constructor(props){
        super(props)
        this.state=[

        ]
    }

    componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id= this.props.match.params.id
            this.props.fetchDetailInfoDoctor(id)
        }
    }

    componentDidUpdate=()=>{

    }

    render() {
        console.log(this.props.detailDoctor);
        let {detailDoctor, language}=this.props
        let nameVi=''
        let nameEn=''
        if(detailDoctor && detailDoctor.positionData){
            nameVi=`${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn=`${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail'>
                    <div className='intro-doctor'>
                        <div className='container d-flex'>
                                <div 
                                    className='content-left'
                                    style={{backgroundImage:`url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                                >
                                </div>
                                <div className='content-right'>
                                    <div className='title-name'>
                                        <strong>	
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </strong>
                                    </div>
                                    <div className='text'>
                                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                            <p>
                                                {detailDoctor.Markdown.description}
                                            </p>
                                        }
                                    
                                    </div>
                                </div>
                        </div>
                    </div>

                            <div className='schedule-doctor'>
                                <div className='container'>

                                </div>
                            </div>

                            <div className='detail-info-doctor'>
                                <div className='container'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                                    && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }} />
                                }
                                </div>
                            </div>

                            <div className='comment-doctor'>

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
        fetchDetailInfoDoctor:(id)=>dispatch(actions.fetchDetailInfoDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);