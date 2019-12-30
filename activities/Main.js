import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView, Image, ToastAndroid} from 'react-native';
import Global from '../config/Global';
import CalculatorButton from '../components/CalculatorButton';

export default class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '1+1=2',
            onPressValue: '',
            onPressType: '',
            calculating: '',
            numberStack: [],
            operationStack: [],
            historyArray: []
        };
        this.onClickCalculatorBtn = this.onClickCalculatorBtn.bind(this);
        this.doButtonNeedDo = this.doButtonNeedDo.bind(this);
    }

    fetchData() {
        return [
            {a: '111'}, {a: '222'}, {a: '3'}
        ]
    }

    onClickCalculatorBtn(onPressVal, onPressType) {
        let numberStack = this.state.numberStack;
        numberStack.push(onPressVal);
        let calculatingText = numberStack.join('');
        this.setState({
            onPressValue: onPressVal,
            onPressType: onPressType,
            calculating: calculatingText,
            numberStack: numberStack
        }, () => this.doButtonNeedDo());
    }

    doButtonNeedDo() {
        switch (this.state.onPressType) {
            case Global.type.ac:
                this.setState({
                    calculating: '',
                    numberStack: [],
                    operationStack: []
                });
                break;
            default:
                // do nothing
                break;
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
                        <Text style={styles.resultText}>{this.state.calculating}</Text>
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
                                          value={'⨯'} type={Global.type.operator}/>
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
                                          value={'='} type={Global.type.other}
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
