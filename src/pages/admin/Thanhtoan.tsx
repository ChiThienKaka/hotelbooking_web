import { Space,DatePicker, Select, Row, Col, Divider, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, formatCurrency, formatDateHour } from "../../constants/constants";
const { RangePicker } = DatePicker;

function Thanhtoan() {
    const {Option} = Select
    const [dataBooking, setDataBooking] = useState<any>([]);
    const getAPIBookingAll = async () => {
        try{
            const res = await axios.get(`${baseUrl}admin/booking-all-hotel`);
            setDataBooking(res.data);
            console.log(res.data)
        }catch(err){    
            console.log(err)
        }
    }
    const Column= [
        {title:'STT', dataIndex:'id', render:(text:any)=><span>{`HT0    ${text}`}</span>},
        {title:'Tên khách sạn', dataIndex:'hotel', render:(text:any)=><span>{`${text.name}`}</span>},
        {title:'Số lượng', dataIndex:'quantity', render:(text:any)=><span>{`${text}`}</span>},
        {title:'Giá', dataIndex:'price', render:(text:any)=><span>{`${formatCurrency(text).split('₫')[0]}`}<span style={{fontSize:13.5}}>VND</span></span>},
        {title:'Ngày nhận', dataIndex:'checkin_date', render:(text:any)=><span>{`${formatDateHour(text).split(' ')[0]}`}</span>},
        {title:'Ngày trả', dataIndex:'checkout_date', render:(text:any)=><span>{`${formatDateHour(text).split(' ')[0]}`}</span>},
        {title:'Trạng thái', dataIndex:'status',
            filters: [
                { text: 'CANCELLED', value: 'CANCELLED' },
                { text: 'PENDING', value: 'PENDING' },
                { text: 'CONFIRMED', value: 'CONFIRMED' },
            ],
            onFilter: (value: any, record: any) => record.status === value,
            render:(text:any)=>  {
            let color = '';
            switch (text) {
              case 'CANCELLED':
                color = 'red';
                break;
              case 'PENDING':
                color = 'gold';
                break;
              case 'CONFIRMED':
                color = 'green';
                break;
              default:
                color = 'default';
            }
            return <Tag color={color}>{text}</Tag>;
        }},
    ]
     useEffect( ()=>{
        getAPIBookingAll();
    },[])
    return ( 
        <div style={{padding:20}}>
            <Space direction="vertical">
                <h1>Thanh toán giữa Quảy lý và Admin</h1>
                <Space size={"large"}>
                    <Space direction="vertical">
                        <span>Thời gian</span>
                        <RangePicker />
                    </Space>
                    <Space direction="vertical">
                        <span>Khách sạn</span>
                        <Select
                        defaultValue="all"
                        style={{ width: 300 }}>
                            <Option value='all' lable={'Tất cả'}  >Tất cả</Option>
                            <Option value='1' lable={'Khách sạn A'}  >Khách sạn A</Option>
                            <Option value='2' lable={'Khách sạn A'}  >Khách sạn A</Option>
                            <Option value='3' lable={'Khách sạn A'}  >Khách sạn A</Option>
                            <Option value='4' lable={'Khách sạn A'}  >Khách sạn A</Option>
                        </Select>
                    </Space>
                </Space>
               
            </Space>
            <Row style={{marginTop:20, color:"#fff"}}>
                    <Col span={6}>
                        <Space direction="vertical" style={{backgroundColor:"#5a76f3",width:"80%", padding:20}}>
                            <span style={{fontSize:17}}>Tổng số booking</span>
                            <h1 style={{fontWeight:500, fontSize:23}}>120</h1>
                        </Space>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" style={{backgroundColor:"#37c8a1",width:"80%", padding:20}}>
                            <span style={{fontSize:17}} >Doanh thu tổng</span>
                            <h1 style={{fontWeight:500, fontSize:23}}>120.000.000 VND</h1>
                        </Space>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" style={{backgroundColor:"#f28c5b",width:"80%", padding:20}}>
                            <span style={{fontSize:17}} >Hoa hồng</span>
                            <h1 style={{fontWeight:500, fontSize:23}}>120.000.000 VND</h1>
                        </Space>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" style={{backgroundColor:"#7859f2",width:"80%", padding:20}}>
                            <span style={{fontSize:17}} >Đã thanh toán</span>
                            <h1 style={{fontWeight:500, fontSize:23}}>120.000.000 VND</h1>
                        </Space>
                    </Col>
                </Row>
                <Divider style={{margin:20}} />
                {
                    dataBooking && <Table columns={Column}  dataSource={dataBooking} />
                }
        </div>
     );
}
export default Thanhtoan;