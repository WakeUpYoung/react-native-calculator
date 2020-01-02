import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView, Image, ToastAndroid} from 'react-native';
import Global from '../config/Global';
import CalculatorButton from '../components/CalculatorButton';

export default class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: Global.defaultValue,
            result: null,
            onPressValue: '',
            onPressType: '',
            lastOnPressType: null,
            calculating: Global.defaultValue,
            historyArray: []
        };
        this.onClickCalculatorBtn = this.onClickCalculatorBtn.bind(this);
        this.doButtonNeedDo = this.doButtonNeedDo.bind(this);
        this.whenNumber = this.whenNumber.bind(this);
        this.whenOperator = this.whenOperator.bind(this);
        this.calculateResult = this.calculateResult.bind(this);
    }

    fetchData() {
        return [
            {a: '111'}, {a: '222'}, {a: '3'}
        ]
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
                });
                break;
            case Global.type.number:
                this.whenNumber();
                break;
            case Global.type.operator:
                this.whenOperator();
                break;
            case Global.type.equals:
                this.calculateResult();
            default:
                // do nothing
                break;
        }
    }

    // when press number
    whenNumber() {
        let onPressValue = this.state.onPressValue;
        let calculating = this.state.calculating;
        let text = this.state.text;
        if (text === Global.defaultValue) {
            text = onPressValue;
            calculating = onPressValue
        } else {
            text += onPressValue;
            calculating += onPressValue;
        }
        this.setState({
            calculating: calculating,
            text: text,
            lastOnPressType: this.state.onPressType
        })
    }

    // when press Operator
    whenOperator() {
        let calculating = this.state.calculating;
        let text = this.state.text;
        if (this.state.lastOnPressType === Global.type.operator) {
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

    calculateResult() {
        let res = eval(this.state.calculating);
        this.setState({
            lastOnPressType: this.state.onPressType,
            text: res
        })
    }

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
                        <FlatList data={this.fetchData()}
                                  keyExtractor={item => item.a}
                                  style={{flexDirection: 'column-reverse'}}
                                  renderItem={({item}) =>
                                      <View style={styles.historyView}>
                                        <Text style={styles.historyText}>{[item.a]}</Text>
                                      </View>
                                  }/>
                    </View>
                    {/* Result */}
                    <View style={styles.result}>
                        <Text style={styles.resultText}>{this.state.text}</Text>
                    </View>
                </View>
                <View style={styles.keyboard}>
                    {/* first line AC, DEL, %, ÷ */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton fun={this.onClickCalculatorBtn} value={'AC'} type={Global.type.ac}
                                          textStyle={[styles.operationText, {fontSize: 35}]}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'DEL'} type={Global.type.other}
                                          image={<Image source={require('../res/img/delete.png')}/>} />
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          textStyle={styles.operationText} value={'%'} type={Global.type.other}/>
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
                                          value={'+/-'} type={Global.type.operator}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'0'} type={Global.type.number}/>
                        <CalculatorButton fun={this.onClickCalculatorBtn}
                                          value={'.'} type={Global.type.number}/>
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
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
