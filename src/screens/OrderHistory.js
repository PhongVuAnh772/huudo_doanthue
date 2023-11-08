import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './store/hooks';
import axios from 'axios';

const OrderHistory = ({navigation}) => {
  const [data, setData] = useState([]);
  const email = useAppSelector(state => state.signUp.email);
  const network = useAppSelector(state => state.network.ipv4Address);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await axios.post(`${network}/history-buying`, {
        email: email,
      });
      if (response && response.data) {
        setLoading(false)
        setData(response.data);
        console.log(response.data)
        if (response.data.dataOrders === null) {
          console.log('trống');
        }
      }
    };
    getData();
  }, []);
  return (
    <>
    <View>
      {/**header */}
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{color: 'black', fontSize: 20}}>Lịch sử mua hàng</Text>
      </View>
      {/**body */}

      <Text
        style={{color: 'black', textAlign: 'center', paddingVertical: '5%'}}>
        {data.dataOrders === null && 'Dữ liệu trống'}
      </Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({data}) => (
          <View>
      <Text>Thông tin tài khoản:</Text>
      <Text>Email: {data.account.Email}</Text>

      <Text>Thông tin sinh viên:</Text>
      <Text>Họ và tên: {data.dataStudent.stu_Fname}</Text>
      <Text>Lớp: {data.dataStudent.stu_Class}</Text>
      <Text>Địa chỉ: {data.dataStudent.stu_address}</Text>

      <Text>Lịch sử mua hàng:</Text>
      <FlatList
        data={data.dataOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Ngày đặt hàng: {item.order_date}</Text>
            <Text>Ghi chú: {item.Note}</Text>
          </View>
        )}
      />

      <Text>Chi tiết đơn hàng:</Text>
      <FlatList
        data={data.dataOrdersDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Sản phẩm: {item.menu_id}</Text>
            <Text>Số lượng: {item.Number}</Text>
            <Text>Giá: {item.Price}</Text>
            <Text>Tổng tiền: {item.Total_money}</Text>
          </View>
        )}
      />

      <Text>Menu:</Text>
      <FlatList
        data={data.dataMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Tên món ăn: {item.menu_name}</Text>
            <Text>Giá: {item.Price}</Text>
            <Text>Mô tả: {item.Menu_description}</Text>
            <Image source={{ uri: item.Menu_image }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </View>
        )}
      />
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <TouchableOpacity onPress={() => navigation.navigate('TabDetail')}>
          <Text style={{color: 'blue'}}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
    {loading && (
        <ActivityIndicator
          size="large"
          color="red"
          style={{alignSelf: 'center', position: 'absolute', top: '50%'}}
        />
      )}</>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
