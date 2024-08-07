// libraries
import { Button, Image, Input, message, Select, Space, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { getProvincesWithDetail } from 'vietnam-provinces';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';

// services
import { useMutationHook } from '../../../Hooks/useMutation';
import { getCompanyService, putAdminImageService, putAdminService } from '../../../Services/apiService';
import Loading from '../../../Helper/Loading';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function CompletePage() {
    // ? ----------------------------------------- deps
    const [provinces, setProvinces] = useState([]);
    const [provincesFilter, setProvincesFilter] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [values, setValues] = useState([]);
    const [listServiceType, setListServiceType] = useState([]);
    const options = [];
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

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

    const [formSubmit, setFormSubmit] = useState({
        driverEmail: '',
        driverLicense: '',
        registrationCar: '',
        address: '',
        ward: '',
        street: '',
        city: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        driverEmail: '',
        driverLicense: '',
        address: '',
        ward: '',
        street: '',
        city: '',
    });

    // ? =========================================== WHEN COMPONENT MOUNTED ====================================
    const idStorage = sessionStorage.getItem('company');
    const idC = JSON.parse(idStorage);

    const getCompanyById = () => getCompanyService(`AdminReferenceAction/company/${idC}`);

    const { data, isSuccess: getCompany } = useQuery({
        queryKey: ['getCompanyById'],
        queryFn: getCompanyById,
        retry: false,
    });

    // handle if get success
    useEffect(() => {
        if (getCompany) {
            setListServiceType(data.companyServices);
            setProvinces(data.companyLocationServices);
        }
    }, [data, getCompany]);

    for (let i = 0; i < listServiceType.length; i++) {
        const value = listServiceType[i].serviceType;
        options.push({
            label: value,
            value,
            desc: value,
        });
    }

    // ? ---------------------- handle upload file ------------------------------
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChangeAvatar = ({ fileList: newFileList }) => setFileList(newFileList);

    // ? --------------------- create button upload ------------------------------
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // ? =========================================== handle provinces =========================================
    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);
                const filteredArray = provinceArray.filter((province) =>
                    provinces.some((p) => p.cityService === province.name),
                );
                setProvincesFilter(filteredArray);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, [provinces]);

    const handleSelectProvince = (value) => {
        const selectedProvince = provincesFilter.find((province) => province.code === value);
        setProvinceSelectValue({
            code: selectedProvince.code,
            name: selectedProvince.name,
        });
    };

    // ? =================================== handle districts ==================================
    const apiDistricts = provincesFilter?.find((province) => province.code === provinceSelectValue.code);

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

    // handle change service type
    const handleChange = (value) => {
        setValues(value);
    };

    useEffect(() => {
        if (values && values === 'Two Wheeler Service') {
            setFormSubmit({
                ...formSubmit,
                registrationCar: values,
                driverLicense: 'A1',
            });
        }
        if (values && values !== 'Two Wheeler Service') {
            setFormSubmit({
                ...formSubmit,
                registrationCar: values,
                driverLicense: 'B2',
            });
        }
    }, [values]);

    useEffect(() => {
        setFormSubmit((prev) => ({
            ...prev,
            city: provinceSelectValue?.name || '',
            street: districtSelectValue?.name || '',
            ward: wardSelectValue?.name || '',
        }));
    }, [provinceSelectValue, districtSelectValue, wardSelectValue]);

    // ? ============================================ HANDLE SUBMIT ==============================================
    const driverId = sessionStorage.getItem('driverId');

    const mutation = useMutationHook((props) => putAdminService(props));
    const mutationLicense = useMutationHook((props) => putAdminImageService(props));

    const { isSuccess, isPending } = mutation;
    const { isSuccess: licenseSuccess, isPending: licensePending } = mutationLicense;

    const handleSubmit = () => {
        const errors = {};

        if (formSubmit.address === '') {
            errors.address = 'Please enter your address details';
        }

        if (formSubmit.city === '') {
            errors.city = 'Please choose city';
        }

        if (formSubmit.street === '') {
            errors.street = 'Please choose district';
        }

        if (formSubmit.ward === '') {
            errors.ward = 'Please choose ward';
        }

        if (formSubmit.driverEmail === '') {
            errors.driverEmail = 'Please enter email';
        }

        if (formSubmit.driverLicense === '') {
            errors.driverLicense = 'Please choose your license';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({
                url: `Admin/updateDriver/${driverId}`,
                data: formSubmit,
            });
        }
    };


    // ? ============================================ handle after complete profile ===========================
    useEffect(() => {
        if (isSuccess) {
            const formDataLicense = new FormData();

            const arrayLicense = [...fileList];

            arrayLicense.map((image) => {
                formDataLicense.append('formFileLicense', image.originFileObj);
            });

            mutationLicense.mutate({
                url: `Driver/driver/${driverId}/update`,
                data: formDataLicense,
            });
        }

        if (isPending) {
            setLoading(true)
        }
    }, [isSuccess]);

    useEffect(() => {
        if (licenseSuccess) {
            message.success("Congratulations you have completed the account registration process. Please wait for your account to be verified.")
            setLoading(false);
            navigate('/login/driver');
        }

        if (licensePending) {
            setLoading(true)
        }
    }, [licenseSuccess, licensePending])


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
                                <span className="text-red-600">* </span>Driver Email
                            </label>
                            <Input
                                className={`${errorMessage.driverEmail !== '' && 'border-red-600'}`}
                                value={formSubmit.driverEmail}
                                onChange={handleChangeProfile}
                                name="driverEmail"
                                placeholder="Driver Email"
                            />
                            {errorMessage.driverEmail !== '' && (
                                <p className="ml-2 text-red-500">{errorMessage.driverEmail}</p>
                            )}
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Registration Service Type
                            </label>
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                value={values}
                                placeholder="Select Service Type"
                                onChange={handleChange}
                                options={options}
                                optionRender={(option) => <Space>{option.data.desc}</Space>}
                            />
                            {errorMessage.registrationCar !== '' && (
                                <p className="ml-2 text-red-500">{errorMessage.registrationCar}</p>
                            )}
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>License Class
                            </label>
                            <Input
                                style={{
                                    width: '100%',
                                }}
                                value={formSubmit.driverLicense}
                                placeholder=""
                                onChange={handleChangeProfile}
                                disabled={true}
                            />
                        </div>

                        <div className="flex gap-[10px] mt-4">
                            <div className="w-1/2">
                                <label>
                                    <span className="text-red-600">* </span>City
                                </label>
                                <Select
                                    className="w-full"
                                    placeholder="Choose City"
                                    value={provinceSelectValue.name}
                                    onChange={handleSelectProvince}
                                >
                                    {provincesFilter.map((province) => {
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
                                    disabled={provinceSelectValue.name === '' ? true : false}
                                    value={districtSelectValue.name}
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
                                {errorMessage.street !== '' && (
                                    <p className="ml-2 text-red-500">{errorMessage.street}</p>
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
                                    disabled={districtSelectValue.name === '' ? true : false}
                                    value={wardSelectValue.name}
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
                                    value={formSubmit.companyAddress}
                                    onChange={handleChangeProfile}
                                    name="address"
                                    placeholder="Home number, street name..."
                                />
                                {errorMessage.address !== '' && (
                                    <p className="ml-2 text-red-500">{errorMessage.address}</p>
                                )}
                            </div>
                        </div>

                        <div className="my-4">
                            <label className="mb-2">
                                <span className="text-red-600">* </span>Upload License Image
                            </label>

                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChangeAvatar}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
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
