import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import ImageHolder from './ImageHolder'

export default class PlayerDetailsCard extends Component {
    render() {
        return (
            <View
                style={{
                    width: 364,
                    height: 75,
                    backgroundColor: '#101B62',
                    borderRadius: 112
                }}
            >
                <View style={{ width: "100%", height: "100%", flexDirection: 'row', marginHorizontal: '3%' }}>
                    <View style={{ width: '20%', marginVertical: 8, flexDirection: 'column' }}>
                        <ImageHolder
                            source={require('../assets/fit-sixes.png')} // Replace with the actual image path
                            size={60} // Specify the desired size
                            borderColor="#13FAF8" // Optionally, specify borderColor and borderWidth
                            borderWidth={3}
                        />
                    </View>
                    <View style={{ width: '40%', marginLeft: 15, marginVertical: 8, flexDirection: 'column', justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 18, fontWeight: 'bold', width: '100%', }}>
                            Player name
                        </Text>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 18, fontWeight: 'bold', width: '100%', }}>
                            Player name
                        </Text>
                    </View>
                    <View style={{ width: '20%', marginLeft: 15, marginVertical: 8, flexDirection: 'column', }}>
                        <Image style={{ width: "100%", height: "100%" }} source={require('../assets/fit-sixes.png')} />
                    </View>


                </View>
                {/* <Text style={{color:'green', fontSize:25}}>PlayerDetailsCard</Text> */}
            </View>
        )
    }
}