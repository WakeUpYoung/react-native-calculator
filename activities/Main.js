import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import Global from '../config/Global';
import CalculatorButton from '../components/CalculatorButton';

export default class MainApp extends Component {

    constructor(props){
        super(props)
    }

    fetchData() {
        return [
            {a: 111}, {a: 222}, {a: 3}
        ]
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
                    <View style={styles.result}>
                        <Text style={styles.resultText}>0</Text>
                    </View>
                </View>
                <View style={styles.keyboard}>
                    {/* first line AC, DEL, %, ÷ */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton value={'AC'} type={Global.type.other} textStyle={[styles.operationText, {fontSize: 35}]}/>
                        <CalculatorButton value={'DEL'} type={Global.type.other}
                                          image={<Image source={require('../res/img/delete.png')}/>} />
                        <CalculatorButton textStyle={styles.operationText} value={'%'} type={Global.type.other}/>
                        <CalculatorButton value={Global.operator.division} type={Global.type.operator}/>
                    </View>
                    {/* second line 7 8 9 ✕ */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton value={'7'} type={Global.type.number}/>
                        <CalculatorButton value={'8'} type={Global.type.number}/>
                        <CalculatorButton value={'9'} type={Global.type.number}/>
                        <CalculatorButton value={'⨯'} type={Global.type.operator}/>
                    </View>
                    {/* third line 4 5 6 - */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton value={'4'} type={Global.type.number}/>
                        <CalculatorButton value={'5'} type={Global.type.number}/>
                        <CalculatorButton value={'6'} type={Global.type.number}/>
                        <CalculatorButton value={Global.operator.subtraction} type={Global.type.operator}/>
                    </View>
                    {/* 4th line 1 2 3 + */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton value={'1'} type={Global.type.number}/>
                        <CalculatorButton value={'2'} type={Global.type.number}/>
                        <CalculatorButton value={'3'} type={Global.type.number}/>
                        <CalculatorButton value={Global.operator.addition} type={Global.type.operator}/>
                    </View>
                    {/* 5th line +- 0 . = */}
                    <View style={styles.buttonGroup}>
                        <CalculatorButton value={'+/-'} type={Global.type.operator}/>
                        <CalculatorButton value={'0'} type={Global.type.number}/>
                        <CalculatorButton value={'.'} type={Global.type.number}/>
                        <CalculatorButton value={'='} type={Global.type.other} image={<Image source={require('../res/img/equal_circle_fill.png')}/>}/>
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
