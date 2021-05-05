import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import data from './data.json';
import {changeLoading} from './store/action/authActions';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const Main = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState(data);

  const change = useSelector(state => state.change);

  const dispatch = useDispatch();

  const backReload = item => {
    const l = list.filter(i => {
      return i.id !== item.id;
    });
    setList(l);
  };
  const addItem = item => {
    const l = [...list];
    l.push(item);
    setList(l);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('DetailItem', {
            item: item,
            backReload: backReload,
          });
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(changeLoading(!change.loading));
          }}>
          <Text>Change Loading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddItem', {
              addItem: addItem,
            });
          }}>
          <Text>Thêm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Main;
