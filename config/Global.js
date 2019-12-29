import {Dimensions} from "react-native";

export default {
    background: '#f4f4f4',
    mainColor: '#c08e8e',
    fontColor: '#2c2c2c',
    handWritten: '沐瑶软笔手写体',
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height,
    currentVersion: '1.1.0',
    type: {
        number: 1,
        operator: 2,
        other: 3
    },
    operator: {
        addition: '+',
        subtraction: '—',
        multiplication: '✕',
        division: '÷'
    }
}
