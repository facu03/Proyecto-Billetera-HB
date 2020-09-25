import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getAccount, getTransfersAll, getAllUsers, getBalance, getAllAccounts } from '../actions';
import { Divider } from 'react-native-paper';


const Principal = ({ navigation, getAccount, account, onlineUser,
    transfersAll, users, getBalance, balance, getTransfersAll, getAllUsers, getAllAccounts, accounts }) => {




    useEffect(() => {
        getAllAccounts()
        getAllUsers()
        getAccount(onlineUser.id)
        getBalance(onlineUser.id)
    }, [onlineUser])

    useEffect(() => {
        if (account) { getTransfersAll(account.Naccount) }
    }, [account])

    console.log(transfersAll);

    var flag = false;
    if (transfersAll.length > 1) flag = true;

    return (
        <View style={styles.contenedorPadre}>

            {/* ------- CONTENT ------- */}
            <View style={styles.contentPadre}>
                <View style={styles.contentHijo}>
                    <View style={styles.contentInfo}>
                        <Text>N° CTA: {account?.Naccount}</Text>
                        <Text style={styles.saldo}>{onlineUser.name + " " + onlineUser.surname}</Text>
                        <Text style={styles.parrafoSaldo}>My Balance $ {balance?.balance} </Text>
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

            {
                <ScrollView style={styles.contentHijoDos}>
                    {flag ? transfersAll.map((t) => <View style={styles.contentMov}>
                        <Text style={styles.servicio}>

                        {account?.Naccount == t.receptor?accounts?.map((a) => { if (a.Naccount == t.emisor) {return users.map((u) => { if (a.userId == u.id){return u.name + " " + u.surname} }) } }):
                            accounts?.map((a) => { if (a.Naccount == t.receptor) {return users.map((u) => { if (a.userId == u.id){return u.name + " " + u.surname} }) } })}

                        </Text>
                        {account?.Naccount == t.receptor ?
                            <Text style={styles.ingresos}> + $ {t.Quantity}</Text> : <Text style={styles.egresos}> - $ {t.Quantity}</Text>

                        }


                        <Divider />
                    </View>
                    ) : null}
                </ScrollView>}
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
        fontSize: 18,
        color: 'green'
    },
    egresos: {
        fontSize: 18,
        color: 'red'
    },

})

const mapStateToProps = state => {
    return {
        account: state.account,
        onlineUser: state.onlineUser,
        transfersAll: state.transfersAll,
        users: state.users,
        balance: state.balance,
        accounts: state.accounts

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccount: (id) => dispatch(getAccount(id)),
        getTransfersAll: (Naccount) => dispatch(getTransfersAll(Naccount)),
        getAllUsers: () => dispatch(getAllUsers()),
        getBalance: (id) => dispatch(getBalance(id)),
        getAllAccounts: () => dispatch(getAllAccounts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
