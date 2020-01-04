import React, {Component} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import Global from '../config/Global';
import CalculatorButton from '../components/CalculatorButton';

export default class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: Global.defaultValue,
            onPressValue: '',
            onPressType: '',
            lastOnPressType: null,
            calculating: Global.defaultValue,
            result: null,
            historyArray: []
        };
        this.onClickCalculatorBtn = this.onClickCalculatorBtn.bind(this);
        this.doButtonNeedDo = this.doButtonNeedDo.bind(this);
        this.whenNumber = this.whenNumber.bind(this);
        this.whenOperator = this.whenOperator.bind(this);
        this.whenEquals = this.whenEquals.bind(this);
        this.whenDel = this.whenDel.bind(this);
        this.whenPoint = this.whenPoint.bind(this);
    }

    onClickCalculatorBtn(onPressVal, onPressType) {
        this.setState({
            onPressValue: onPressVal,
            onPressType: onPressType
        }, () => this.doButtonNeedDo());
    }

    doButtonNeedDo() {
        switch (this.state.onPressType) {
            case Global.type.ac:
                this.setState({
                    calculating: Global.defaultValue,
                    text: Global.defaultValue,
                    result: null,
                    lastOnPressType: null,
                    historyArray: []
                });
                break;
            case Global.type.number:
                this.whenNumber();
                break;
            case Global.type.operator:
                this.whenOperator();
                break;
            case Global.type.equals:
                this.whenEquals();
                break;
            case Global.type.del:
                this.whenDel();
                break;
            case Global.type.point:
                this.whenPoint();
                break;
            case Global.type.sign:
                ToastAndroid.show('DLC未购买', ToastAndroid.SHORT);
                break;
            case Global.type.percent:
                ToastAndroid.show('DLC未购买', ToastAndroid.SHORT);
                break;
            default:
                // do nothing
                break;
        }
    } // do Button need do

    // when press number
    whenNumber() {
        let onPressValue = this.state.onPressValue;
        let calculating = this.state.calculating;
        let text = this.state.text;
        let result = this.state.result;
        if (text === Global.defaultValue) {
            text = onPressValue;
            calculating = onPressValue
        } else {
            if (this.state.lastOnPressType === Global.type.equals) {
                text = onPressValue;
                calculating = onPressValue;
                result = null;
            } else {
                if (text.length >= 10) {
                    return;
                }
                text += onPressValue;
                calculating += onPressValue;
            }
        }
        this.setState({
            calculating: calculating,
            text: text,
            lastOnPressType: this.state.onPressType,
            result: result
        })
    }

    // when press Operator
    whenOperator() {
        let calculating = this.state.calculating;
        let text = this.state.text;
        if (MainApp.judgementLetterType(MainApp.getLastLetter(text)) === Global.type.operator) {
            text = text.substring(0, text.length - 1) + this.state.onPressValue;
            calculating = calculating.substring(0, calculating.length - 1) + MainApp.getRealOperator(this.state.onPressValue);
        } else {
            text += this.state.onPressValue;
            calculating += MainApp.getRealOperator(this.state.onPressValue);
        }
        this.setState({
            calculating: calculating,
            lastOnPressType: this.state.onPressType,
            text: text
        })
    }

    whenEquals() {
        if (this.state.text === Global.defaultValue) {
            return;
        }
        let calculating = this.state.calculating;
        let res = parseFloat(eval(calculating).toFixed(10));
        let historyArray = this.state.historyArray;
        let text = this.state.text;
        let value = text + '=' + res;
        historyArray.push({
            key: Math.random().toString(36).slice(8),
            value: value
        });
        this.setState({
            lastOnPressType: this.state.onPressType,
            result: res,
            historyArray: historyArray
        }, () => console.info(calculating))
    }

    whenDel() {
        let currentText = this.state.text;
        if (currentText === Global.defaultValue) {
            return;
        }
        if (this.state.lastOnPressType === Global.type.equals) {
            return;
        }
        console.log('current text is : ' + currentText + ' text.length: ' + currentText.length);
        // when there's only a letter
        if (currentText.length === 1) {
            this.setState({
                calculating: Global.defaultValue,
                text: Global.defaultValue,
                lastOnPressType: null
            });
            return;
        }
        // when there're more than one letters
        let afterDelText = MainApp.delLastLetter(currentText);
        let calculating = this.state.calculating;
        let afterDelCalculating = MainApp.delLastLetter(calculating);
        this.setState({
            text: afterDelText,
            calculating: afterDelCalculating,
            lastOnPressType: null
        })
    } // when del

    whenPoint() {
        let text = this.state.text;
        let calculating = this.state.calculating;
        let lastLetter = MainApp.getLastLetter(text);
        let theLastValidText = MainApp.getTheLastValidText(text);
        let result = this.state.result;
        if (this.state.lastOnPressType === Global.type.point) {
            return;
        }
        if (MainApp.judgementLetterType(lastLetter) === Global.type.point) {
            return;
        }
        if (this.state.lastOnPressType === Global.type.equals) {
            text = Global.defaultValue + this.state.onPressValue;
            calculating = Global.defaultValue + this.state.onPressValue;
            result = null;
        } else {
            if (MainApp.judgementLastTextType(text) === Global.type.operator) {
                text = text + Global.defaultValue + '.';
                calculating = calculating + Global.defaultValue + '.';
            } else {
                theLastValidText += '.';
                if (isNaN(theLastValidText)) {
                    return;
                } else {
                    calculating += '.';
                    text += '.';
                }
            }
        }
        this.setState({
            calculating: calculating,
            text: text,
            lastOnPressType: this.state.onPressType,
            result: result
        })

    } // when point

    static delLastLetter(text) {
        return text.substring(0, text.length - 1);
    }

    static getLastLetter(text) {
        return text.substring(text.length - 1, text.length);
    }

    static getTheLastValidText(text) {
        let lastLetter = this.getLastLetter(text);
        if (this.judgementLetterType(lastLetter) === Global.type.operator) {
            return lastLetter;
        }
        if (!isNaN(text)) {
            return text;
        }
        let split = text.split(Global.operatorRegex);
        return split[split.length - 1];
    }

    static judgementLetterType(letter) {
        let numberExp = /[0-9]/;
        if (numberExp.test(letter)) {
            return Global.type.number;
        }
        if (Global.operator.addition === letter || Global.operator.subtraction === letter
            || Global.operator.multiplication === letter || Global.operator.division === letter) {
            return Global.type.operator;
        }
        if (letter === '.') {
            return Global.type.point;
        }
        return Global.type.other;
    } // judgementLetterType

    static judgementLastTextType(text) {
        let theLastValidText = this.getTheLastValidText(text);
        if (Global.operator.addition === theLastValidText || Global.operator.subtraction === theLastValidText
            || Global.operator.multiplication === theLastValidText || Global.operator.division === theLastValidText) {
            return Global.type.operator;
        }
        if (!isNaN(theLastValidText)) {
            return Global.type.number;
        }
        return Global.type.other;
    } //judgementLastTextType

    static getRealOperator(operator) {
        switch (operator) {
            case Global.operator.addition:
                return '+';
            case Global.operator.subtraction:
                return '-';
            case Global.operator.multiplication:
                return '*';
            case Global.operator.division:
                return '/';
            default:
                return null;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.main}>
                <View style={[styles.inputArea]}>
                    <View style={[styles.history]}>
                        <FlatList data={this.state.historyArray}
                                  keyExtractor={item => item.key}
                                  style={{flexDirection: 'column-reverse'}}
                                  renderItem={({item}) =>
                                      <View style={styles.historyView}>
                                        <Text style={styles.historyText}>{item.value}</Text>
                                      </View>
                                  }/>
                    </View>
                    {/* Result */}
                    <View style={styles.result}>
                        <Text style={styles.calculatingText}>{this.state.text}</Text>
                        <Text style={[styles.resultText, {display: this.state.result != null ? 'flex': 'none'}]}>= {this.state.result}</Text>
                    </View>
                </View>
                <View style={styles.keyboard}>
                    {/* first line AC, DEL, %, ÷ */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn} value={'AC'} type={Global.type.ac}
                                          textStyle={[styles.operationText, {fontSize: 35}]}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'DEL'} type={Global.type.del}
                                          image={<Image source={require('../res/img/delete.png')}/>} />
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          textStyle={styles.operationText} value={'%'} type={Global.type.percent}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={Global.operator.division} type={Global.type.operator}/>
                    </View>
                    {/* second line 7 8 9 ✕ */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'7'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'8'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'9'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={Global.operator.multiplication} type={Global.type.operator}/>
                    </View>
                    {/* third line 4 5 6 - */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'4'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'5'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'6'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={Global.operator.subtraction} type={Global.type.operator}/>
                    </View>
                    {/* 4th line 1 2 3 + */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'1'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'2'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'3'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={Global.operator.addition} type={Global.type.operator}/>
                    </View>
                    {/* 5th line +- 0 . = */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'+/-'} type={Global.type.sign}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'0'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'.'} type={Global.type.point}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'='} type={Global.type.equals}
                                          image={<Image source={require('../res/img/equal_circle_fill.png')}/>}/>
                    </View>

                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Global.background,
    },
    inputArea: {
        flex: 7,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    keyboard: {
        flex: 9,
        backgroundColor: Global.background,
        borderTopWidth: 1,
        borderColor: '#e5e5e5'
    },
    history: {
        flex: 5,
        paddingBottom: 60
    },
    historyView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 5
    },
    historyText: {
        fontSize: 30,
        color: '#c2c2c2'
    },
    result: {
        flex: 3,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    calculatingText: {
        fontSize: 50,
        color: Global.fontColor
    },
    resultText: {
        fontSize: 50,
        color: Global.fontColor
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 30,
        color: Global.fontColor
    },
    operationText: {
        fontSize: 40,
        color: Global.mainColor
    }

});
