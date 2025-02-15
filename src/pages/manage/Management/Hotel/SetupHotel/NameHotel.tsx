import { Button, Col, Divider, Form, Input, Radio, Rate, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {LeftOutlined } from '@ant-design/icons';
import { COLORS } from "../../../../../constants/constants";

function NameHotel() {
    const navigate = useNavigate();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const onFinish = () => {
        navigate(`/manage/register-hotel/setup-hotel/amenities-hotel?token=${token}`);
    }
    return ( 
        <Space direction="vertical" style={{padding:"60px 200px 60px 200px"}}>
            {/* Thanh tiến trình  */}
                  <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                            </Col>
                            <Col span={3}>
                                <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                            </Col>
                        </Row>
            <h1 style={{fontSize:35}}>Cho chúng tôi biết thêm về hotel của Quý vị</h1>
            <Space direction="vertical" style={{backgroundColor:"#fff", padding:20}}>
                <h3>Khách sạn của Quý vị tên gì?</h3>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label={<span style={{fontWeight:500}}>Tên chỗ nghỉ</span>} name={"namehotel"} rules={[
                        {required:true, message: "Tên chỗ nghỉ của Quý vị là gì?"}
                    ]}>
                        <Input placeholder="Tên chỗ nghỉ"/>
                    </Form.Item>
                    <span style={{color:"gray"}}>Tên này sẽ được hiển thị tới khách khi họ tìm kiếm chỗ nghỉ.</span>
                    <Divider />
                     {/* Xếp hạng khách sạn */}
                    <Form.Item name={"ratehotel"} label={<span style={{fontWeight:500}}>Khách sạn của Quý vị được xếp hạng mấy sao?</span>}>
                        <Radio.Group defaultValue="none">
                            <Space direction="vertical">
                                <Radio value="none">Không áp dụng</Radio>
                                <Radio value="1">1 sao <Rate value={1} count={1} disabled /></Radio>
                                <Radio value="2">2 sao <Rate value={2} count={2} disabled /></Radio>
                                <Radio value="3">3 sao <Rate value={3} count={3} disabled /></Radio>
                                <Radio value="4">4 sao <Rate value={4} count={4} disabled /></Radio>
                                <Radio value="5">5 sao <Rate value={5} count={5} disabled /></Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Divider />
                    {/* Công ty quản lý khách sạn */}
                    <Form.Item name={"managehotel"} label={<span style={{fontWeight:500}}>Quý vị có phải là công ty quản lý chỗ nghỉ hay thuộc tập đoàn hoặc chuỗi khách sạn không?</span>}>
                        <Radio.Group defaultValue="no">
                            <Radio value="yes">Có</Radio>
                            <Radio value="no">Không</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Row>
                            <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
                            <Col span={21}><Button 
                            type="primary" htmlType="submit" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
                        </Row>
                    </Form.Item>
                </Form>
                
            </Space>
        </Space>
     );
}

export default NameHotel;