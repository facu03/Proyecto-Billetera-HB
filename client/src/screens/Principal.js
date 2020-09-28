import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View, ScrollView, YellowBox , ImageBackground} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getAccount, getTransfersAll, getAllUsers, getBalance, getAllAccounts } from '../actions';
import { Divider } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import Constants from 'expo-constants';
import FooterNew from '../components/FooterNew';
import NavBar from '../components/NavBar';



const Principal = ({ navigation, getAccount, account, onlineUser,
    transfersAll, users, getBalance, balance, getTransfersAll, getAllUsers, getAllAccounts, accounts }) => {

    const data = ["aca van ingresos y egresos"]


    useEffect(() => {
        getAllAccounts()
        getAllUsers()
        getAccount(onlineUser.id)
        getBalance(onlineUser.id)
    }, [onlineUser])


    useEffect(() => {
        if (account) { getTransfersAll(account.Naccount) }
    }, [account])

    useEffect(() => {
        if (account) { getTransfersAll(account.Naccount) }
        getBalance(onlineUser.id)
    }, [transfersAll.length])

    var flag = false;
    if (transfersAll.length > 0) flag = true;
    
    return (
        <View style={styles.contenedorPrincipal}>
        <ImageBackground
        source={require('../assets/consolidated_dot.png')}
        style={styles.background}
      >
          <NavBar navigation={navigation} />
        <View style={styles.contenedorPadre}>

             <View style={styles.contentPadre}>
                <View style={styles.contentHijo}>
                    <View style={styles.contentInfo}>
                        <Text style={styles.cta}>N° CTA: {account?.Naccount}</Text>
                        <Text style={styles.saldo}>{onlineUser.name + " " + onlineUser.surname}</Text>
                        <Text style={styles.parrafoSaldo}>My Balance $ {balance?.balance} </Text>
                    </View>
                </View>
            </View>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 20, textAlign: 'center' }}>Movements</Text>
            <FontAwesome name={'chevron-circle-down'} style={styles.sortDown} size={20} />
        <View style={styles.containerTrans}>
                {
                    <ScrollView style={styles.contentHijoDos}>
                        {flag ? transfersAll.map((t, i) => {
                            if (t.Type !== "load") {
                                return (
                                   
                                    < View style={styles.contentMov} key={i} >

                                        <UserAvatar size={30} bgColors={['#ccc', '#fafafa', '#ccaabb']} name="Matias Córdoba" />

                                        <Text style={styles.servicio}>

                                            {account?.Naccount == t.receptor ? accounts?.map((a) => { if (a.Naccount == t.emisor) { console.log(a.Naccount, t.emisor, "facu toy cagao de hambre  "); return users.map((u) => { if (a.userId == u.id) { return u.name + " " + u.surname } }) } }) :
                                                accounts?.map((a) => { if (a.Naccount == t.receptor) { return users.map((u) => { if (a.userId == u.id) { return u.name + " " + u.surname } }) } })}

                                        </Text>
                                        {
                                            account?.Naccount == t.receptor ?
                                                <Text style={styles.ingresos}> + ${t.Quantity}</Text> : <Text style={styles.egresos}> - ${t.Quantity}</Text>

                                        }


                                        <Divider />
                                    </View>
                                )
                            } else {
                                return (
                                    < View style={styles.contentMov} >

                                        <UserAvatar size={30} bgColors={['#ccc', '#fafafa', '#ccaabb']} name="Matias Córdoba" />
                                        <Text style={styles.servicio}>
                                            {"LOAD"}
                                        </Text>
                                        {
                                            account?.Naccount == t.receptor ?
                                                <Text style={styles.ingresos}> + ${t.Quantity}</Text> : <Text style={styles.egresos}> - ${t.Quantity}</Text>

                                        }


                                        <Divider />
                                    </View>
                                )
                            }
                        }) : null}

                    </ScrollView>}
            </View> 

                </View >

                          </ImageBackground>
                <FooterNew  navigation={navigation} />
                </View>

    )
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "100%",
        paddingTop: Constants.statusBarHeight,
    },
    background: {
    flex: 1,
    width: '100%',
  },
    contenedorPadre: {
        width: '100%',
        height: '100%',
        flex: 1,
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
        width: '100%',
        height: '80%',
        backgroundColor: 'lightgray',
        opacity: 0.9,
        position: 'absolute',
        top: -3,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22
    
    },
    mov: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    contentHijoDos: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'lightgray',
        opacity: 0.9,

    },
    contentInfo: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        marginVertical: 25,
    },
    saldo: {
        borderRadius: 10,
        marginTop: 20,
        fontWeight: '700',
        backgroundColor: "yellow",
        fontSize: 38,
        opacity: 0.8,
        padding: 5
    },
    parrafoSaldo: {
        borderRadius: 10,
        marginTop: 20,
        color: "yellow",
        fontWeight: '700',
        backgroundColor: "black",
        fontSize: 20,
        opacity: 0.8,
        padding: 5
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
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,0, 0.8)',
        width: '30%',
        marginHorizontal: '35%',
        borderRadius: 20
    },
    contentMov: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    servicio: {
        width: '60%',

        fontSize: 20
    },
    ingresos: {
        fontSize: 20,
        color: 'black',
        backgroundColor: 'yellow',
        borderRadius: 15,
        width: 100,
        textAlign: 'center',
        width: '30%'

    },
    egresos: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'red',
        borderRadius: 15,
        width: 100,
        textAlign: 'center',
        width: '30%'
    },
    containerTrans: {
        opacity: 0.9,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
        marginTop: 20,
        width: '100%',
        flex: 1
    },
    cta: {
        fontSize: 15,
        fontWeight: '700',
    }

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
