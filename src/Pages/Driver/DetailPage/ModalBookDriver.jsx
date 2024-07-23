import { Input, Modal, Form, Select, Button } from "antd";
import * as message from '../../../Helper/MessageToast'
import { useEffect, useState } from "react";
import { getProvincesWithDetail } from 'vietnam-provinces';

export default function FormBookingDriver({ isOpen, setIsOpen }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceSelectValue, setProvinceSelectValue] = useState({
        code: '',
        name: '',
    });
    const [districtSelectValue, setDistrictSelectValue] = useState({
        code: '',
        name: '',
    });
    const [wardSelectValue, setWardSelectValue] = useState({
        code: '',
        name: '',
    });

    // ? =========================================== handle provinces =========================================
    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);
                setProvinces(provinceArray);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, []);

    const handleSelectProvince = (value) => {
        const selectedProvince = provinces.find((province) => province.code === value);
        setProvinceSelectValue({
            code: selectedProvince.code,
            name: selectedProvince.name,
        });
    };

    // ? =================================== handle districts ==================================
    const apiDistricts = provinces?.find((province) => province.code === provinceSelectValue.code);

    useEffect(() => {
        if (apiDistricts !== undefined && apiDistricts !== null) {
            const districtsArray = Object.values(apiDistricts.districts);
            setDistricts(districtsArray);
        }
    }, [apiDistricts]);

    const handleSelectDistrict = (value) => {
        const selectedDistrict = districts.find((district) => district.code === value);
        setDistrictSelectValue({
            code: selectedDistrict.code,
            name: selectedDistrict.name,
        });
    };

    // ? =================================== handle wards =========================================
    const apiWards = districts?.find((district) => district.code === districtSelectValue.code);

    useEffect(() => {
        if (apiWards !== undefined && apiWards !== null) {
            const wardsArray = Object.values(apiWards.wards);
            setWards(wardsArray);
        }
    }, [apiWards]);

    const handleSelectWard = (value) => {
        const selectedWard = wards.find((ward) => ward.code === value);
        setWardSelectValue({
            code: selectedWard.code,
            name: selectedWard.name,
        });
    };

    // ? ========================================== handle submit ====================================
    const handleSubmit = () => {
        setIsOpen(false)
    }

    // ? =========================================== handle close modal ================================
    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <Modal title="SEND YOUR INFORMATION TO THE DRIVER TO BOOKING" open={isOpen} onCancel={handleCancel} footer={null}>
            <div className="border-t-[1px]">
                <label className="pt-2 pb-1">Full Name</label>
                <Input placeholder="Enter your name" variant="filled" />
            </div>

            <div className="mt-2">
                <label className="pt-2 pb-1">Phone</label>
                <Input placeholder="Enter your phone number" variant="filled" />
            </div>

            <div className="flex gap-[10px] mt-3">
                <Form.Item
                    layout="vertical"
                    label="Tỉnh/Thành phố"
                    name="name"
                    className="w-[50%]"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Select value={provinceSelectValue.name} onChange={handleSelectProvince} placeholder="Chọn">
                        {provinces.map((province) => {
                            return (
                                <Select.Option key={province.code} value={province.code}>
                                    {province.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    layout="vertical"
                    label="Quận/Huyện"
                    name="Quận/Huyện"
                    className="w-[50%]"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Select
                        disabled={provinceSelectValue.name === '' ? true : false}
                        value={districtSelectValue.name}
                        onChange={handleSelectDistrict}
                        placeholder="Chọn"
                    >
                        {districts.map((district) => {
                            return (
                                <Select.Option key={district.code} value={district.code}>
                                    {district.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </div>

            <div className="flex gap-[10px]">
                <Form.Item
                    layout="vertical"
                    label="Phường/Xã"
                    name="Phường/Xã"
                    className="w-[50%]"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Select
                        disabled={districtSelectValue.name === '' ? true : false}
                        value={wardSelectValue.name}
                        onChange={handleSelectWard}
                        placeholder="Chọn"
                    >
                        {wards.map((ward) => {
                            return (
                                <Select.Option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    layout="vertical"
                    label="Địa chỉ cụ thể"
                    name="Địa chỉ"
                    className="w-[50%]"
                    rules={[
                        {
                            required: true,
                            message: 'Không bỏ trống trường này!',
                        },
                    ]}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Input placeholder="Số nhà, ngõ, tên đường..." />
                </Form.Item>
            </div>

            <div className="flex justify-end gap-[10px]">
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="primary" onClick={handleSubmit}>
                    Send
                </Button>
            </div>
        </Modal>
    );
}
