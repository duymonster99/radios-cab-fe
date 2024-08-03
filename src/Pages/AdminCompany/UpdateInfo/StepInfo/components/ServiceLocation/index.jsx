import { CloseOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getProvincesWithDetail } from 'vietnam-provinces';
import { useMutationHook } from '../../../../../../Hooks/useMutation';
import { postCompanyService, putCompanyService } from '../../../../../../Services/apiService';
import { useNavigate } from 'react-router-dom';

export default function ServiceLocation({ stateBtn, setLoading }) {
    const options = [];
    const [locations, setLocations] = useState([]);
    const [values, setValues] = useState([]);
    const [listLocation, setListLocation] = useState(() => {
        const storageLocations = JSON.parse(sessionStorage.getItem('location'));
        return storageLocations ?? [];
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    // ? =========================================== handle provinces =========================================

    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);
                const tempLocations = provinceArray.map((province) => ({
                    label: province.name,
                    value: province.name,
                    desc: province.name,
                }));

                // locations.push(tempLocations)
                setLocations(tempLocations);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, []);

    for (let i = 0; i < locations.length; i++) {
        const value = locations[i].value;
        options.push({
            label: value,
            value,
            desc: value
        });
    }

    const handleChange = (value) => {
        setValues(value)
        setErrorMessage('');
    };

    const handleSubmit = () => {
        if (values.length > 0) {
            setListLocation((prevListType) => {
                const newList = [...prevListType];
                values.forEach((value) => {
                    if (!prevListType.includes(value)) {
                        newList.push(value);
                    }
                });
                return newList;
            });
    
            setValues([]);
        } else {
            setErrorMessage('Please choose location');
        }
    };

    const handleDelete = (index) => {
        const newLocations = [...listLocation];
        newLocations.splice(index, 1);

        setListLocation(() => {
            const jsonLocations = JSON.stringify(newLocations);
            sessionStorage.setItem('location', jsonLocations);
            return newLocations;
        });
    };

    // ? ================================================= add database =======================================
    // get id company
    const tokenStorage = sessionStorage.getItem('companyInfo');
    const cid = JSON.parse(tokenStorage);

    // get data
    const [locationSubmit, setLocationSubmit] = useState([]);

    useEffect(() => {
        if (listLocation && listLocation.length > 0) {
            const newLocationSubmit = listLocation.map((item) => ({
                companyId: cid,
                cityService: item,
            }));
            setLocationSubmit(newLocationSubmit);
        }
    }, [listLocation]);

    const profileSubmit = {
        isActive: true
    }

    // create method
    const mutationLocation = useMutationHook((props) => postCompanyService(props));
    const mutationProfile = useMutationHook((props) => putCompanyService(props));

    // load state
    const { isSuccess: profileSuccess, isPending: profilePending, data } = mutationProfile;
    const { isSuccess: locationSuccess, isPending: locationPending } = mutationLocation;

    useEffect(() => {
        if (stateBtn === 'done') {
            if (listLocation.length === 0) {
                setErrorMessage('Please choose service location');
            } else {
                mutationLocation.mutate({
                    url: 'CompanyLocation/company/location',
                    data: locationSubmit,
                });
                mutationProfile.mutate({
                    url: `CompanyInfoUpdate/company/${cid}/update`,
                    data: profileSubmit,
                });
            }
        }
    }, [stateBtn]);

    useEffect(() => {
        if (locationSuccess && profileSuccess) {
            sessionStorage.clear();
            if (data.data.isActive === true) {
                navigate('/admin-company');
            }
        }

        if (locationPending || profilePending) {
            setLoading(true);
        }
    }, [locationSuccess, locationPending, profileSuccess, profilePending, data]);

    return (
        <div className="w-[60%] block mx-auto text-lg">
            <h3 className="text-black font-bold text-2xl mt-4">Add Service Location</h3>

            <div className="mt-4">
                <label>
                    <span className="text-red-600 font-bold">* </span>Add Service Location
                </label>
                <Select
                    mode="multiple"
                    multiple={true}
                    style={{
                        width: '100%',
                    }}
                    value={values}
                    placeholder="Select One Location"
                    onChange={handleChange}
                    options={options}
                    optionRender={(option) => <Space>{option.data.value}</Space>}
                />
                {errorMessage !== '' && <p className="text-red-500">{errorMessage}</p>}
            </div>

            {listLocation.length > 0 && (
                <div className="mt-4">
                    <p>List Service Location</p>
                    <div className="flex gap-7">
                        <ul style={{ listStyleType: 'circle', paddingLeft: '24px' }}>
                            {listLocation.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button className="pl-6" onClick={() => handleDelete(index)}>
                                        <CloseOutlined style={{ fontSize: '10px' }} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="my-4">
                <Button onClick={handleSubmit} type="primary">
                    Submit
                </Button>
            </div>
        </div>
    );
}
