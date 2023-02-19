import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    handleChangeLangage = (language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        const { processLogout,language,userInfo } = this.props;
        return (
            <div className="header-container">
                <div className='container d-flex justify-content-between'>
                    {/* thanh navigator */}
                    <div className="header-tabs-container">
                        <Navigator menus={adminMenu} />
                    </div>

                    {/* nút logout */}
                    <div className="language">
                        <span className='welcome'><FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName : 'bao'}!</span>
                        <span className={language ===LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={()=>this.handleChangeLangage(LANGUAGES.VI)}>Vi</span>
                        <span className={language ===LANGUAGES.EN ? "language-en active" : "language-en"} onClick={()=>this.handleChangeLangage(LANGUAGES.EN)}>En</span>
                        <div className="btn btn-logout" onClick={processLogout} title="Log out">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo:state.user.userInfo,
        language:state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout:()=>dispatch(actions.processLogout()),
        changeLanguageAppRedux:(language)=>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
