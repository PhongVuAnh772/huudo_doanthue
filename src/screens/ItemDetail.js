import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import { useAppDispatch,useAppSelector } from './store/hooks';
global.mycart = [];
import { addItem,updateItemQuantity } from '../slice/listSlice';

const ItemDetail = ({route, navigation}) => {
  const listOrder = useAppSelector(state => state.list.orderList)
  const dispatch = useAppDispatch()
  {
    /**display detail */
  }
  const {menu} = route.params;

  {
    /**display so luong */
  }
  const [number, setNumber] = useState(1);
  const increaseNumber = () => {
    setNumber(number + 1);
  };
  const decreaseNumber = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };
  //handle add to order
  // const [list, setList] = useState([]);

  const handleAddOrder = () => {
    // setList(global.mycart);
    // const newList = [{menu},...global.mycart];
    // setList(newList);
    // global.mycart = newList;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    // const existingProductIndex = listOrder.findIndex(
    //   item => item.menu.menu_name === menu.menu_name,
    // );

    // if (existingProductIndex !== -1) {
    //   // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng của nó
    //   listOrder[existingProductIndex].quantity += number;
    // } else {
    //   // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm nó vào giỏ hàng
    //   dispatch(addItem({menu: menu,quantity: number}))
    // }

    // Cập nhật giỏ hàng toàn cục
    global.mycart = listOrder;
    console.log(listOrder)
     dispatch(addItem({ menu: menu, quantity: number }));
    Alert.alert(
      'Thông báo',
      'Bạn đã thêm vào đơn : \n ' + menu.menu_name + '\n số lượng : ' + number,
      [
        {
          text: 'Ok',
          onPress: () => [],
        },
      ],
    );
  };
  const [comment, setComment] = useState('')
  useEffect(() => {
    const getDataComment =  async () => {
    const res = await axios.post(`${network}/getDataComment`, {
      idProduct: listOrder.menu.id
    })
    if (res.data.success) {
      setComment(res.data.data)
      
    }
    else {
      Alert.alert('Lỗi','Không lấy được dữ liệu comment')
    }
  }
      getDataComment()

  }, []);

  return (
    <View>
      <View
        style={{
          color: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 20}}>Thông tin sản phẩm</Text>
      </View>
      <View>
        <View
          style={{
            color: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <Image
            source={{uri: menu.Menu_image}}
            style={{height: 70, width: 70}}
          />
          <Text style={{color: 'black', fontSize: 20}}>{menu.menu_name} </Text>
        </View>
        <Text style={{color: 'black', marginLeft: 10}}>
          Mô tả : {menu.Menu_description}
        </Text>
      </View>
      <View style={{color: 'black', marginTop: 10, marginLeft: 10}}>
        <Text>Số lượng :</Text>
        {/**display so luong */}
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={decreaseNumber}>
            <Text style={{color: 'black'}}>-</Text>
          </TouchableOpacity>
          <Text style={styles.number}>{number}</Text>
          <TouchableOpacity style={styles.button} onPress={increaseNumber}>
            <Text style={{color: 'black'}}>+</Text>
          </TouchableOpacity>
        </View>
        {/**het dispaly so luong */}
      </View>
      <View style={{color: 'black', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={handleAddOrder}
          style={{
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            height: 30,
            width: 120,
            borderRadius: 30,
            backgroundColor: '#0F5CA8',
          }}>
          <Text style={{color: 'black', color: 'white'}}>Thêm vào đơn</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          color: 'black',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{color: 'black', marginLeft: 10}}>
          <Text style={{color: 'black', color: 'blue'}}>Quay lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TabOrder')}
          style={{
            color: 'black',
            marginRight: 10,
            borderWidth: 1,
            borderRadius: 3,
          }}>
          <Text style={{color: 'black'}}>Vào trang đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
  },
  number: {
    fontSize: 20,
    marginHorizontal: 10,
    color: 'black',
  },
});
