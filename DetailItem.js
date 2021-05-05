import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const DetailItem = ({navigation, route}) => {
  const postDeleteItem = () => {
    route?.params?.backReload(route?.params?.item);
    navigation.goBack();
  };

  const change = useSelector(state => state.change);
  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Button
        title={'Quay lại'}
        color={'red'}
        onPress={() => navigation.goBack()}
      />
      {/* backReload */}
      <Text>{change?.loading.toString()}</Text>
      <Button title={'Xoá'} onPress={postDeleteItem} />
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({});
