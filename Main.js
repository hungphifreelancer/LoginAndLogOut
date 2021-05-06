import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import data from './data.json';
import {changeLoading} from './store/action/authActions';

import {apiClient} from './services/client';
import ApiConfig from './config/api-config';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const Main = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState(data);
  const [loading, setLoading] = useState(false);

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
  const getListData = async () => {
    setLoading(true);
    await apiClient
      .get(ApiConfig.GET_POST_DATA)
      .then(json => {
        setList(json.data.data);
        console.log(json.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getListData();
  }, []);

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
  if (loading) {
    return (
      <View style={styles.absoluteFill}>
        <View style={styles.square}>
          <ActivityIndicator color={'#6e3b6e'} size={'large'} />
        </View>
      </View>
    );
  } else
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
          refreshing={false}
          onRefresh={() => {
            getListData();
          }}
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
  absoluteFill: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  square: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default Main;
