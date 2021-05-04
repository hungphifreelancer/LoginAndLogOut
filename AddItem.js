import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const AddItem = ({navigation, route}) => {
  const [textId, setTextId] = useState(null);
  const [textName, setTextName] = useState(null);
  const postAddItem = () => {
    route?.params?.addItem({id: textId, name: textName});
    navigation.goBack();
  };
  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Button
        title={'Quay lại'}
        color={'red'}
        onPress={() => navigation.goBack()}
      />
      {/* backReload */}
      <TextInput
        style={{width: '100%'}}
        placeholder={'Nhập Id:'}
        value={textId}
        onChangeText={value => {
          setTextId(value);
        }}
      />
      <TextInput
        style={{width: '100%'}}
        placeholder={'Nhập Tên:'}
        value={textName}
        onChangeText={value => {
          setTextName(value);
        }}
      />
      <Button title={'Thêm'} onPress={postAddItem} />
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
