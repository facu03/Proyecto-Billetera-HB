import React, { useState } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';
import FooterNew from '../components/FooterNew';
import Input from '../components/TextInput';


const ScreenLoad = ({ navigation }) => {


    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <NavBar navigation={navigation} />

            <ImageBackground
                source={require('../assets/consolidated_dot.png')}
                style={styles.background}
            >
                <View style={styles.contenedorLoad}>
                    <View style={{ width: '70%', height: '25%', backgroundColor: '#00296B', alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 16, marginTop: 14, fontWeight: '700' }}>
                            Amount to load
                        </Text>
                        <View style={{ width: '100%', marginTop: 20 }}>
                            <Input
                                style={styles.inputAmount}
                                label='Enter the amount'
                                placeholder='Amount'
                            />
                        </View>

                    </View>
                    <TouchableOpacity style={{ width: '70%', backgroundColor: '#00296B', alignItems: 'center', borderRadius: 6, marginTop: 20 }}>
                        <Text style={{ color: 'white', padding: 20, fontSize: 20 }} onPress={() => navigation.navigate("Confirm")}>
                            Next
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>

            {/* FOOTER VA EN TODOS LOS SCREEN  */}
            <FooterNew navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    contenedorLoad: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputAmount: {
        width: '80%',
        borderRadius: 6,
        marginHorizontal: 40
    }
})

export default ScreenLoad;