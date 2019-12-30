import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView, Image, Button, ToastAndroid, TouchableNativeFeedback} from 'react-native';
import Global from '../config/Global';
import PropTypes from 'prop-types';

export default class CalculatorButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        fun: PropTypes.func.isRequired,
        textStyle: PropTypes.any,
        image: PropTypes.element,
    };

    getTextStyle() {
        if (this.props.textStyle) {
            return this.props.textStyle
        }
        if (this.props.type === Global.type.number) {
            return styles.numberText
        }
        if (this.props.type === Global.type.operator) {
            return styles.operationText
        }
        return styles.numberText
    }

    getContent() {
        if (this.props.image) {
            return <View style={[styles.button]}>{this.props.image}</View>;
        } else {
            return <View style={[styles.button]}><Text style={this.getTextStyle()}>{this.props.value}</Text></View>;
        }
    }

    render() {
        return(
            <TouchableNativeFeedback
                onPress={() => this.props.fun(this.props.value, this.props.type)}>
                {this.getContent()}
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        fontSize: 30,
        color: Global.fontColor
    },
    operationText: {
        fontSize: 40,
        color: Global.mainColor
    }
});
