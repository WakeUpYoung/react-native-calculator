import {Dimensions} from "react-native";

export default {
    background: '#f4f4f4',
    mainColor: '#c08e8e',
    fontColor: '#2c2c2c',
    handWritten: '沐瑶软笔手写体',
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height,
    defaultValue: '0',
    emptyArray: [],
    type: {
        number: 1,
        operator: 2,
        equals: 3,
        ac: 4,
        del: 5,
        percent: 6,
        sign: 7,
        other: 999
    },
    operator: {
        addition: '+',
        subtraction: '—',
        multiplication: '⨯',
        division: '÷'
    }
}
