import React, { useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Button} from 'react-native';
import { List, Divider } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { connect } from 'react-redux';
import { getAllContacts, getAllUsers, friendCVU } from '../actions'

const ContactsList = ({ contacts, getAllContacts, getAllUsers, navigation, friendCVU }) => {
  console.log(contacts)
  return (
    <View style={styles.bg}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <List.Item titleStyle={{ fontSize: 20, fontWeight: '700' }}
            left={() =>
              <Text style={{ fontSize: 20, color: 'black' }}> {contacts?.name + ' ' + contacts?.surname} </Text>}
          />
            <Text style={{backgroundColor: 'yellow',color: 'black', width: '20%', textAlign: 'center', marginVertical: 10, padding: 5, borderBottomLeftRadius: 7, borderTopLeftRadius: 7}}
             onPress={() => {navigation.navigate('InputTransfer'), friendCVU(contacts?.account?.CVU)}}>
              Send
            </Text>
        </View>
        <Divider />
      </View>
    </View>

  )
};

const styles = StyleSheet.create({

  bg: {
    marginLeft: '10%',
    width: '80%',
    backgroundColor: 'white'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    getAllContacts: (id) => dispatch(getAllContacts(id)),
    getAllUsers: () => dispatch(getAllUsers()),
    friendCVU: (cvu) => dispatch(friendCVU(cvu))
  }
}

const mapStateToProps = state => {
  return {
    onlineUser: state.onlineUser,
    /*contacts: state.contacts,*/
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);