import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';

/**
 * Animation設定
 * 0〜300フレームの間で増減する値を宣言する
 * CSSでいうところの@keyframeのようなイメージ
 */
const interpolationConfig = {
    // 入力される値(フレーム)
    inputRange: [0,100,200,300,400],
    // 出力される値
    outputRange: ['0deg','90deg','180deg','270deg','360deg'],
}

export default class Test extends React.Component {

    /**
     * constructor
     * @param props 
     */
    constructor(props){
        super(props);
        this.state = {
            // animatedValueを0で初期化
            animatedValue : new Animated.Value(0),
        }
    }
    
    /**
     * onLayout時処理
     */
    handleOnLayout = () => {
        // animatedValueを300まで1.5sかけて変化させる
        Animated.timing(this.state.animatedValue, {
            toValue: 400,
            duration: 2000,
            delay: 2000,
            useNativeDriver : false,
        }).start();
    }

    render = () => {

        const { animatedValue } = this.state;
        const translateY = animatedValue.interpolate(interpolationConfig);

        return(
          <TouchableOpacity
            onLongPress={() => {
              alert('長押しタップ成功！');
            }}
            style={styles.container}
          >
            <View>
                <Animated.View  style={{ transform : [{rotate : translateY}] }} onLayout={this.handleOnLayout} >
                  <Animated.Image style={styles.img} source={require("./assets/fruit_orange.png")}></Animated.Image>
                </Animated.View>
            </View>

          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center'
    },
    img:{
      width:100,
      height:100,
    },
});