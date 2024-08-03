// libraries
import { Button, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getProvincesWithDetail } from 'vietnam-provinces';
import { useMutationHook } from '../../../Hooks/useMutation';
import { putAdminService } from '../../../Services/apiService';
import Loading from '../../../Helper/Loading';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function CompletePage() {
    // ? ----------------------------------------- deps
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [provinceSelectValue, setProvinceSelectValue] = useState('');
    const [districtSelectValue, setDistrictSelectValue] = useState('');
    const [wardSelectValue, setWardSelectValue] = useState('');

    const [formSubmit, setFormSubmit] = useState({
        mobile: '',
        address: '',
        ward: '',
        district: '',
        city: ''
    });

    const [errorMessage, setErrorMessage] = useState({
        mobile: '',
        address: '',
        ward: '',
        district: '',
        city: ''
    });

    // ? ================================== WHEN COMPONENT MOUNTED ============================

    // get provinces
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
    }, [provinces]);

    const handleSelectProvince = (value) => {
        const selectedProvince = provinces.find((province) => province.code === value);
        setProvinceSelectValue(selectedProvince.name);
    };

    // ? =================================== handle districts ==================================
    const apiDistricts = provinces?.find((province) => province.name === provinceSelectValue);

    useEffect(() => {
        if (apiDistricts !== undefined && apiDistricts !== null) {
            const districtsArray = Object.values(apiDistricts.districts);
            setDistricts(districtsArray);
        }
    }, [apiDistricts]);

    const handleSelectDistrict = (value) => {
        const selectedDistrict = districts.find((district) => district.code === value);
        setDistrictSelectValue(selectedDistrict.name);
    };

    // ? =================================== handle wards =========================================
    const apiWards = districts?.find((district) => district.name === districtSelectValue);

    useEffect(() => {
        if (apiWards !== undefined && apiWards !== null) {
            const wardsArray = Object.values(apiWards.wards);
            setWards(wardsArray);
        }
    }, [apiWards]);

    const handleSelectWard = (value) => {
        const selectedWard = wards.find((ward) => ward.code === value);
        setWardSelectValue(selectedWard.name);
    };

    // ? ======================================================== handle data update ======================================
    const handleChangeProfile = (e) => {
        setFormSubmit({
            ...formSubmit,
            [e.target.name]: e.target.value,
        });
        setErrorMessage({
            ...errorMessage,
            [e.target.name]: '',
        });
    };

    useEffect(() => {
        setFormSubmit((prev) => ({
            ...prev,
            city: provinceSelectValue,
            street: districtSelectValue,
            ward: wardSelectValue,
        }));
    }, [provinceSelectValue, districtSelectValue, wardSelectValue]);

    // ? ============================================ HANDLE SUBMIT ==============================================
    const tokenStorage = localStorage.getItem('tokenUser');
    const { unique_name } = jwtDecode(tokenStorage);

    const mutation = useMutationHook((props) => putAdminService(props));
    const { isSuccess, isPending } = mutation;

    const handleSubmit = () => {
        const errors = {};

        if (formSubmit.address === '') {
            errors.address = 'Please enter your address details';
        }

        if (formSubmit.city === '') {
            errors.city = 'Please choose city';
        }

        if (formSubmit.district === '') {
            errors.street = 'Please choose district';
        }

        if (formSubmit.ward === '') {
            errors.ward = 'Please choose ward';
        }

        if (formSubmit.mobile === '') {
            errors.mobile = 'Please enter your mobile';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({
                url: `Admin/updateUser/${unique_name}`,
                data: formSubmit,
            });
        }
    };

    // ? ============================================ handle after complete profile ===========================
    useEffect(() => {
        if (isSuccess) {
            setLoading(false);
            navigate('/login');
        }
        if (isPending) {
            setLoading(true);
        }
    }, [isSuccess, isPending]);

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100]">
            <Loading isLoading={loading}>
                <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                    <div className="block w-[60%] mx-auto text-lg">
                        <div className="mt-4">
                            <h4 className="text-black font-bold text-2xl">COMPLETE PROFILE</h4>
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Mobile
                            </label>
                            <Input
                                className={`${errorMessage.mobile !== '' && 'border-red-600'}`}
                                value={formSubmit.mobile}
                                onChange={handleChangeProfile}
                                name="mobile"
                                placeholder="Your Mobile"
                            />
                            {errorMessage.mobile !== '' && (
                                <p className="ml-2 text-red-500">{errorMessage.mobile}</p>
                            )}
                        </div>

                        <div className="flex gap-[10px] mt-4">
                            <div className="w-1/2">
                                <label>
                                    <span className="text-red-600">* </span>City
                                </label>
                                <Select
                                    className="w-full"
                                    placeholder="Choose City"
                                    value={provinceSelectValue}
                                    onChange={handleSelectProvince}
                                >
                                    {provinces.map((province) => {
                                        return (
                                            <Select.Option key={province.code} value={province.code}>
                                                {province.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                                {errorMessage.city !== '' && <p className="ml-2 text-red-500">{errorMessage.city}</p>}
                            </div>

                            <div className="w-1/2">
                                <label>
                                    <span className="text-red-600">* </span>District
                                </label>
                                <Select
                                    className="w-full"
                                    disabled={provinceSelectValue === '' ? true : false}
                                    value={districtSelectValue}
                                    onChange={handleSelectDistrict}
                                    placeholder="Choose District"
                                >
                                    {districts.map((district) => {
                                        return (
                                            <Select.Option key={district.code} value={district.code}>
                                                {district.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                                {errorMessage.district !== '' && (
                                    <p className="ml-2 text-red-500">{errorMessage.district}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-[10px] my-4">
                            <div className="w-1/2">
                                <label>
                                    <span className="text-red-600">* </span>Ward
                                </label>
                                <Select
                                    className="w-full"
                                    disabled={districtSelectValue === '' ? true : false}
                                    value={wardSelectValue}
                                    onChange={handleSelectWard}
                                    placeholder="Choose Ward"
                                >
                                    {wards.map((ward) => {
                                        return (
                                            <Select.Option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                                {errorMessage.ward !== '' && <p className="ml-2 text-red-500">{errorMessage.ward}</p>}
                            </div>

                            <div className="w-1/2">
                                <label>
                                    <span className="text-red-600">* </span>Address details
                                </label>
                                <Input
                                    className={`${errorMessage.address !== '' && 'border-red-600'}`}
                                    value={formSubmit.address}
                                    onChange={handleChangeProfile}
                                    name="address"
                                    placeholder="Home number, street name..."
                                />
                                {errorMessage.address !== '' && (
                                    <p className="ml-2 text-red-500">{errorMessage.address}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
}
