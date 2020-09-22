import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getAccount, getTransfers, getAllUsers } from '../actions';
import { Divider } from 'react-native-paper';


const Principal = ({ navigation, getAccount, account, onlineUser, getTransfers, allTransfers, getAllUsers, users }) => {

    useEffect(() => {
        getAccount(onlineUser.id)
        getAllUsers()
    }, [onlineUser])

    useEffect(() => {
        if (account) { getTransfers(account.CVU) }
    }, [account])
    var flag = false
    if (allTransfers.emisor) flag = true
    return (
        <View style={styles.contenedorPadre}>

            {/* ------- CONTENT ------- */}
            <View style={styles.contentPadre}>
                <View style={styles.contentHijo}>
                    <View style={styles.contentInfo}>
                        <Text>N° CTA: {account?.Naccount}</Text>
                        <Text style={styles.saldo}>{onlineUser.name + " " + onlineUser.surname}</Text>
                        <Text style={styles.saldo}>$ {account?.balance}</Text>
                        <Text style={styles.parrafoSaldo}>My Balance</Text>
                    </View>
                </View>
                <View style={styles.contentBotones}>
                    <View style={styles.contentRecargar}>
                        <Button title='Load' onPress={() => navigation.navigate('Load')} style={styles.botonRecargar} />
                    </View>
                    <View style={styles.contentEnviar}>
                        <Button title='Send' onPress={() => navigation.navigate("Transfers")} style={styles.botonEnviar} />
                    </View>
                </View>
            </View>
            <Text style={styles.mov}>Movements</Text>
            <FontAwesome name={'chevron-circle-down'} style={styles.sortDown} size={20} />

            {flag ?
                <ScrollView style={styles.contentHijoDos}>
                    {allTransfers.emisor.map((t) => <View style={styles.contentMov}>
                        <Text style={styles.servicio}>{users.map((u) => { if (u.id === t.userId) return u.name })}</Text>
                        <Text style={styles.ingresos}>{t.transaction.Quantity}</Text>
                        <Divider />
                    </View>
                    )}
                </ScrollView> : <View></View>}
        </View>
    )
}

const styles = StyleSheet.create({

    contenedorPadre: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between'
    },

    homeCont: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 4
    },
    parrafoH: {
        marginBottom: 10
    },
    transferCont: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 4
    },
    parrafoT: {
        marginBottom: 10
    },
    transferCard: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 4
    },
    parrafoC: {
        marginBottom: 10
    },
    payContent: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 4
    },
    parrafoP: {
        marginBottom: 10,
        marginRight: 14
    },
    contentPadre: {
        width: '100%',
        flex: 1,
    },
    contentHijo: {
        width: '90%',
        height: '70%',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    mov: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    contentHijoDos: {
        width: '70%',
        height: '30%',
        marginTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 80
    },
    contentInfo: {
        height: '30%',
        alignItems: 'center',
        marginVertical: 25
    },
    saldo: {
        fontSize: 38
    },
    parrafoSaldo: {
        fontSize: 20
    },
    contentBotones: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contentRecargar: {
        width: '30%',
        marginRight: 10,
    },
    contentEnviar: {
        width: '30%',
        marginLeft: 10
    },
    sortDown: {
        color: 'white',
        textAlign: 'center'
    },
    contentMov: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    servicio: {
        fontSize: 18,
    },
    ingresos: {
        color: 'green'
    },
    egresos: {
        color: 'red'
    },

})

const mapStateToProps = state => {
    return {
        account: state.account,
        onlineUser: state.onlineUser,
        allTransfers: state.allTransfers,
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccount: (id) => dispatch(getAccount(id)),
        getTransfers: (cvu) => dispatch(getTransfers(cvu)),
        getAllUsers: () => dispatch(getAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
