import { Calendar, Col, ConfigProvider, Form, Row ,
  DatePicker,
  Divider,
  Radio,
  InputNumber,
  Button,
  Select,
  Space, notification,
  Checkbox
} from "antd";
import {StopOutlined} from '@ant-design/icons';
import viVN from "antd/locale/vi_VN";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";
import { baseUrl, formatCurrency } from "../../../../../constants/constants";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../../redux/selector";
const {Option} = Select;

dayjs.locale("vi");


function CalendarRoom() {
  const hotel = useSelector(selectHotelMn);
  const [api, contextHolder] = notification.useNotification();
  const token = localStorage.getItem("token");
  const [createdroom, setCreatedRoom] = useState<any[]>([]);  //mảng phòng đã tạo
  const [selectRoomid, setSelectRoomid] = useState<any>();//Lấy id chọn
  const [ngayDacbiet, setNgayDacbiet] = useState<any[]>([]); //lấy ngày đặc biệt theo loại phòng và giá
  const openNotification = () => {
    api.success({
      message: `Thông báo`,
      description: 'Quý vị đã lưu dữ liệu thành công',
      placement:'top',
    });
  };
  const openNotificationErr = () => {
    api.error({
      message: `Thông báo`,
      description: 'Quý vị chưa chọn Loại chỗ nghỉ cần chỉnh sửa',
      placement:'top',
    });
  };
  const getAPIRoomcreated = async()=>{
    try{
        if(token && hotel){
          const res = await axios.get(`${baseUrl}hotel-properties/room/get-rooms/${hotel?.id}`, {
            headers: {Authorization: `Bearer ${token}`},
          })
          setCreatedRoom(res.data)
        }
    }catch(err){
      console.log(err);
    }
  }
  const getAPINgaydacbiet = async (typeroom: any) => {
    try{
        if(token && selectRoomid){
            const res = await axios.post(`${baseUrl}hotel-properties/roomprice/get-by-typeroom`,{
              room_id: typeroom
            }, {
              headers: {Authorization: `Bearer ${token}`},
            })
            setNgayDacbiet(res.data);
        }
    }catch(err){
        console.log(err);
    }
  }
  //kiểm tra xem có thuộc ngày đặc biệt không
  const checkNgaydacbit = (data: any[], dateStr: string):any => {
      const result = data.find((item:any)=> dayjs(item?.ngays).format("YYYY-MM-DD") === dateStr); 
      return result;
  }
  const cellrender = (value: Dayjs, _: any) => {
      const dateStr = value.format("YYYY-MM-DD");
      return selectRoomid && ngayDacbiet ? <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Space direction="vertical">
                <span>{checkNgaydacbit(ngayDacbiet, dateStr)?.status === false ? <span style={{color:"red", fontWeight:600}}>Đang đóng <StopOutlined /></span> : <span>Mở bán</span> }  </span>
                <span>VND { checkNgaydacbit(ngayDacbiet, dateStr)?.price ? formatCurrency(checkNgaydacbit(ngayDacbiet, dateStr)?.price).split('₫')[0] : formatCurrency(JSON.parse(selectRoomid)?.sotien).split('₫')[0]}</span>
            </Space>
      </div> : null
  }
  const onFinish =  async (values: any)=>{
    try{
        if(selectRoomid){
          const idroom = JSON.parse(selectRoomid)?.loaichonghi
          const res = await axios.post(`${baseUrl}hotel-properties/roomprice/create`,{
            room_id: idroom,
            ...values
          }, {
            headers: {Authorization: `Bearer ${token}`},
        });
         if(res.status === 200) {
            openNotification();
         }
        }else{
            openNotificationErr();
        }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const run = async () => {
      if(selectRoomid){
        await getAPINgaydacbiet(JSON.parse(selectRoomid)?.loaichonghi);
      }
    }
    run();
  },[selectRoomid])
  useEffect(()=>{
    getAPIRoomcreated();
  },[hotel])
  return (
    <div style={{zIndex:2}}>
      {contextHolder}
      <div style={{backgroundColor:"#fff", padding:20, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <span style={{fontSize:15,fontWeight:500}}>Loại chỗ nghỉ:</span>
      <Select placeholder="Vui lòng chọn phòng" onChange={(value:any)=>{
           setSelectRoomid(value);
      }} style={{width:600,marginTop:10, marginLeft:10}}>
        {
          createdroom && createdroom.map((item:any)=>{
              return <Option key={item?.id} value={JSON.stringify(item)} >{item?.loaichonghi}</Option>
          })
        }
      </Select>
        
      </div>
      <ConfigProvider locale={viVN}>
       
        <Row>
          <Col span={19}>
            <div style={{ padding: 20 }}>
              {/* Mặc định là tháng */}
              <Calendar cellRender={cellrender} style={{zIndex: 1}}
               mode="month" />
            </div>
          </Col>
          <Col span={5} style={{padding:"20px 0px"}}>
              <Form onFinish={onFinish} layout="vertical" style={{padding:20, backgroundColor:"#fff"}} >
                  <Form.Item name={"ngaybatdau"} label={"Ngày bắt đầu"} initialValue={dayjs()}>
                       <DatePicker style={{width:259}} />
                  </Form.Item>
                  <Form.Item name={"ngayketthuc"} label={"Ngày kết thúc"} initialValue={dayjs()}>
                       <DatePicker style={{width:259}} />
                  </Form.Item>
                  <Space direction="vertical">
                      <span>Quý vị muốn áp dụng thay đổi cho ngày nào trong tuần?</span>
                      <Space>
                      <Checkbox.Group defaultValue={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}>
                        <Checkbox key="T2" value="T2">T2</Checkbox>
                        <Checkbox key="T3" value="T3">T3</Checkbox>
                        <Checkbox key="T4" value="T4">T4</Checkbox>
                        <Checkbox key="T5" value="T5">T5</Checkbox>
                        <Checkbox key="T6" value="T6">T6</Checkbox>
                        <Checkbox key="T7" value="T7">T7</Checkbox>
                        <Checkbox key="CN" value="CN">CN</Checkbox>
                      </Checkbox.Group>
                      </Space>
                  </Space>
                  <Divider />
                  <Form.Item name={"status"} initialValue={true} label = {"Mở hoặc đóng nhận đặt phòng"} >
                       <Radio.Group>
                           <Radio value={true}>Mở</Radio>
                           <Radio value={false}>Đóng</Radio>
                       </Radio.Group>
                  </Form.Item>
                  <Form.Item name={"price"} label = {"Giá"} rules={[
                    {required: true, message:"Quý vị vui lòng nhập giá phòng"}
                  ]}>
                     <InputNumber suffix={<span>VND</span>} style={{width:259}}  step={1000} min={0} />
                  </Form.Item>
                  <Form.Item label={"Thay đổi này sẽ được lưu lại"}>
                      <Button type="primary" htmlType="submit" block>Lưu</Button>
                  </Form.Item>
              </Form>
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  );
}

export default CalendarRoom;
