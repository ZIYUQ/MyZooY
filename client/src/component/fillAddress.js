import React from 'react';
import { Country, State, City } from 'country-state-city';
import '../css/App.css'
import 'antd/dist/antd.min.css';
import { Row, Col, Cascader, Typography } from 'antd';


// function to chech the region of user
export default function fillDetaillAddress(props) {

    const setAddress = (e) => {
        props.setAddress(e);
    }

    // Initial the region option
    const initial_option = () => {
        var contries = Country.getAllCountries();
        var cons = [];
        for (var i = 0; i < contries.length; i++) {
            var states = State.getStatesOfCountry(contries[i].isoCode);
            var con = { "value": undefined, "label": undefined, "children": [] };
            for (var j = 0; j < states.length; j++) {
                var state = { "value": "", "label": undefined, "children": [] };
                var cities = City.getCitiesOfState(contries[i].isoCode, states[j].isoCode);
                for (var k = 0; k < cities.length; k++) {
                    var city = { "value": "", "label": undefined };
                    city.value = cities[k].name;
                    city.label = cities[k].name;
                    state.children[k] = city;
                }
                state.value = states[j].name;
                state.label = states[j].name;
                con.children[j] = state;
            }
            con.value = contries[i].name;
            con.label = contries[i].name;
            cons[i] = con;
        }
        return cons;
    }

    const {Title} = Typography
    const options = initial_option();

    // make the region selection menu
    return (

        <Row align="bottom">
            <Col span={4} style={{textAlign: 'center'}}>
                <Title level={5}>Location:</Title>
            </Col>
            <Col span={18}>
                <Cascader size="large" options={options} onChange={e => setAddress(e)} placeholder="Please select" style={{width: '100%'}} />
            </Col>
        </Row>

    )

}