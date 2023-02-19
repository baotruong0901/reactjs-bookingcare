import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'
import HomeHeader from './HomeHeader';
import Specialty from './Specialty';
import MedicalFacility from './MedicalFacility';
import Doctor from './Doctor'
class HomePage extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render() {
        return (
            <div>
                <HomeHeader/>
                <Specialty />
                <MedicalFacility />
                <Doctor />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
