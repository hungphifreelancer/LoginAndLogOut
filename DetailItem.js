import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const DetailItem = ({navigation, route}) => {
  const postDeleteItem = () => {
    route?.params?.backReload(route?.params?.item);
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
      <Text>{route?.params?.item?.name}</Text>
      <Button title={'Xoá'} onPress={postDeleteItem} />
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({});
