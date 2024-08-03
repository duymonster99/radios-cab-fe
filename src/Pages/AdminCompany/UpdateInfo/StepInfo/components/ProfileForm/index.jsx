// libraries
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getProvincesWithDetail } from 'vietnam-provinces';

// services
import { useMutationHook } from '../../../../../../Hooks/useMutation';
import { putCompanyService } from '../../../../../../Services/apiService';

export default function FormEditProfile({ stateBtn, setStateBtn, current, setCurrent, setLoading }) {
    // ? ----------------------------------------- deps
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [shouldFetched, setShouldFetched] = useState(false);
    const dataStorage = sessionStorage.getItem('profileInfo');
    const profileInfo = JSON.parse(dataStorage);

    // ? ----------------------------------------- check session storage profile info -----------------------------
    if (profileInfo !== null && profileInfo !== undefined && profileInfo !== '') {
        setCurrent(current + 1)
    }

    const [provinceSelectValue, setProvinceSelectValue] = useState({
        code: '',
        name: profileInfo?.companyCity ?? '',
    });
    const [districtSelectValue, setDistrictSelectValue] = useState({
        code: '',
        name: profileInfo?.companyDistrict ?? '',
    });
    const [wardSelectValue, setWardSelectValue] = useState({
        code: '',
        name: profileInfo?.companyWard ?? '',
    });

    const [formSubmit, setFormSubmit] = useState({
        contactPersonName: profileInfo?.contactPersonName ?? '',
        designation: profileInfo?.designation ?? '',
        contactPersonMobile: profileInfo?.contactPersonMobile ?? '',
        companyTelephone: profileInfo?.companyTelephone ?? '',
        companyAddress: profileInfo?.companyAddress ?? '',
        companyWard: profileInfo?.companyWard ?? '',
        companyDistrict: profileInfo?.companyDistrict ?? '',
        companyCity: profileInfo?.companyCity ?? '',
    });

    const [errorMessage, setErrorMessage] = useState({
        contactPersonName: '',
        designation: '',
        contactPersonMobile: '',
        companyTelephone: '',
        companyAddress: '',
        companyWard: '',
        companyDistrict: '',
        companyCity: '',
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

    // ? ======================================================== handle data login ======================================
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
            companyCity: provinceSelectValue?.name || '',
            companyDistrict: districtSelectValue?.name || '',
            companyWard: wardSelectValue?.name || '',
        }));
    }, [provinceSelectValue, districtSelectValue, wardSelectValue]);

    // ? ======================================================== handle next =============================================
    useEffect(() => {
        if (stateBtn === 'next') {
            const errors = {};

            if (formSubmit.companyAddress === '') {
                errors.companyAddress = 'Please enter your address details';
            }

            if (formSubmit.companyCity === '') {
                errors.companyCity = 'Please choose city';
            }

            if (formSubmit.companyDistrict === '') {
                errors.companyDistrict = 'Please choose district';
            }

            if (formSubmit.companyTelephone === '') {
                errors.companyTelephone = 'Please enter company phone number';
            }

            if (formSubmit.companyWard === '') {
                errors.companyWard = 'Please choose ward';
            }

            if (formSubmit.contactPersonMobile === '') {
                errors.contactPersonMobile = 'Please enter contact person mobile';
            }

            if (formSubmit.contactPersonName === '') {
                errors.contactPersonName = 'Please enter contact person name';
            }

            if (formSubmit.designation === '') {
                errors.designation = 'Please enter designation';
            }

            if (Object.keys(errors).length > 0) {
                setErrorMessage({
                    ...errorMessage,
                    ...errors,
                });
            } else {
                setShouldFetched(true);
            }
            setStateBtn('');
        }
    }, [stateBtn]);

    // get id company
    const tokenStorage = sessionStorage.getItem('companyInfo');
    const cid = JSON.parse(tokenStorage)

    const mutationProfile = useMutationHook((props) => putCompanyService(props));
    const { isSuccess, isPending } = mutationProfile;

    useEffect(() => {
        if (shouldFetched) {
            mutationProfile.mutate({
                url: `CompanyInfoUpdate/company/${cid}/update`,
                data: formSubmit,
            });

            setShouldFetched(false);
        }
    }, [shouldFetched]);

    // ? ============================================ handle after complete profile ===========================
    useEffect(() => {
        if (isSuccess) {           
            const profileJson = JSON.stringify(formSubmit)
            sessionStorage.setItem("profileInfo", profileJson)
            setCurrent(current + 1);
            setLoading(false);
        }
        if (isPending) {
            setLoading(true);
        }
    }, [isSuccess, isPending]);

    return (
        <div className="block w-[60%] mx-auto text-lg">
            <div className="mt-4">
                <h4 className="text-black font-bold text-2xl">COMPLETE PROFILE</h4>
            </div>

            <div className="block mt-4">
                <label>
                    <span className="text-red-600">* </span>Contact Person
                </label>
                <Input
                    className={`${errorMessage.contactPersonName !== '' && 'border-red-600'}`}
                    value={formSubmit.contactPersonName}
                    onChange={handleChangeProfile}
                    name="contactPersonName"
                    placeholder="Contact Person"
                />
                {errorMessage.contactPersonName !== '' && (
                    <p className="ml-2 text-red-500">{errorMessage.contactPersonName}</p>
                )}
            </div>

            <div className="block mt-4">
                <label>
                    <span className="text-red-600">* </span>Designation
                </label>
                <Input
                    className={`${errorMessage.designation !== '' && 'border-red-600'}`}
                    value={formSubmit.designation}
                    onChange={handleChangeProfile}
                    name="designation"
                    placeholder="Designation"
                />
                {errorMessage.designation !== '' && <p className="ml-2 text-red-500">{errorMessage.designation}</p>}
            </div>

            <div className="block mt-4">
                <label>
                    <span className="text-red-600">* </span>Contact Person Mobile
                </label>
                <Input
                    type="number"
                    className={`${errorMessage.contactPersonMobile !== '' && 'border-red-600'}`}
                    value={formSubmit.contactPersonMobile}
                    onChange={handleChangeProfile}
                    name="contactPersonMobile"
                    placeholder="Contact Person Mobile"
                />
                {errorMessage.contactPersonMobile !== '' && (
                    <p className="ml-2 text-red-500">{errorMessage.contactPersonMobile}</p>
                )}
            </div>

            <div className="block mt-4">
                <label>
                    <span className="text-red-600">* </span>Company Telephone
                </label>
                <Input
                    type="number"
                    className={`${errorMessage.companyTelephone !== '' && 'border-red-600'}`}
                    value={formSubmit.companyTelephone}
                    onChange={handleChangeProfile}
                    name="companyTelephone"
                    placeholder="Company Telephone"
                />
                {errorMessage.companyTelephone !== '' && (
                    <p className="ml-2 text-red-500">{errorMessage.companyTelephone}</p>
                )}
            </div>

            <div className="flex gap-[10px] mt-4">
                <div className="w-1/2">
                    <label>
                        <span className="text-red-600">* </span>City
                    </label>
                    <Select
                        className="w-full"
                        value={provinceSelectValue.name}
                        onChange={handleSelectProvince}
                        placeholder="Chọn"
                    >
                        {provinces.map((province) => {
                            return (
                                <Select.Option key={province.code} value={province.code}>
                                    {province.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
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
                        placeholder="Choose"
                    >
                        {districts.map((district) => {
                            return (
                                <Select.Option key={district.code} value={district.code}>
                                    {district.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    {errorMessage.companyDistrict !== '' && (
                        <p className="ml-2 text-red-500">{errorMessage.companyDistrict}</p>
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
                    {errorMessage.companyWard !== '' && <p className="ml-2 text-red-500">{errorMessage.companyWard}</p>}
                </div>

                <div className="w-1/2">
                    <label>
                        <span className="text-red-600">* </span>Address details
                    </label>
                    <Input
                        className={`${errorMessage.companyAddress !== '' && 'border-red-600'}`}
                        value={formSubmit.companyAddress}
                        onChange={handleChangeProfile}
                        name="companyAddress"
                        placeholder="Home number, street name..."
                    />
                    {errorMessage.companyAddress !== '' && (
                        <p className="ml-2 text-red-500">{errorMessage.companyAddress}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
