import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

// services
import { useMutationHook } from '../../../../../../Hooks/useMutation';
import { postCompanyService } from '../../../../../../Services/apiService';

// data
const options = [
    {
        label: 'Two Wheeler Service',
        value: 'Two Wheeler Service',
        desc: 'Two Wheeler Service',
    },
    {
        label: 'Four Seater Car Service',
        value: 'Four Seater Car Service',
        desc: 'Four Seater Car Service',
    },
    {
        label: 'Seven Seater Car Service',
        value: 'Seven Seater Car Service',
        desc: 'Seven Seater Car Service',
    },
];

export default function ServiceType({ stateBtn, setStateBtn, current, setCurrent, setLoading }) {
    const [values, setValues] = useState([]);
    const [shouldFetched, setShouldFetched] = useState(false);
    const [listType, setListType] = useState(() => {
        const storageTypes = JSON.parse(sessionStorage.getItem('types'));
        return storageTypes ?? [];
    });
    const storageTypes = JSON.parse(sessionStorage.getItem('types'));
    if (storageTypes !== null && storageTypes !== undefined) {
        setCurrent(current + 1);
    }
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        setListType((prevListType) => {
            const newList = [...prevListType];
            values.forEach((value) => {
                if (!prevListType.includes(value)) {
                    newList.push(value);
                }
            });
            return newList;
        });

        setValues([]);
        setErrorMessage('');
    };

    const handleChange = (value) => {
        setValues(value);
        setErrorMessage('');
    };

    const handleDelete = (index) => {
        const newTypes = [...listType];
        newTypes.splice(index, 1);

        setListType(newTypes);
    };

    useEffect(() => {
        if (stateBtn === 'next') {
            if (listType.length === 0) {
                setErrorMessage('Please enter service type');
            } else {
                setShouldFetched(true);
            }
            setStateBtn('');
        }
    }, [stateBtn]);

    // ? ============================================ fetch api ==========================================
    // get id company
    const tokenStorage = sessionStorage.getItem('pricingInfo');
    const {cid} = JSON.parse(tokenStorage);

    const [typeSubmit, setTypeSubmit] = useState([]);

    useEffect(() => {
        if (listType && listType.length > 0) {
            const newTypeSubmit = listType.map((item) => ({
                companyId: cid,
                serviceType: item,
            }));
            setTypeSubmit(newTypeSubmit);
        }
    }, [listType]);

    const mutationType = useMutationHook((props) => postCompanyService(props));
    const { isSuccess, isPending } = mutationType;

    useEffect(() => {
        if (shouldFetched) {
            mutationType.mutate({
                url: 'CompanyService/company/service/create',
                data: typeSubmit,
            });

            setShouldFetched(false);
        }
    }, [shouldFetched]);

    useEffect(() => {
        if (isSuccess) {
            const jsonTypes = JSON.stringify(typeSubmit);
            sessionStorage.setItem('types', jsonTypes);
            setCurrent(current + 1);
            setLoading(false);
        }
        if (isPending) {
            setLoading(true);
        }
    }, [isSuccess, isPending]);

    console.log(mutationType);
    

    return (
        <div className="w-[60%] mx-auto block text-lg">
            <h3 className="text-black font-bold text-2xl mt-4">Add Service Type</h3>

            <div className="my-4">
                <label>
                    <span className="text-red-600 font-bold text-xl">* </span> Add service
                </label>
                <Select
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    value={values}
                    placeholder="Select One Service"
                    onChange={handleChange}
                    options={options}
                    optionRender={(option) => <Space>{option.data.desc}</Space>}
                />
                {errorMessage !== '' && <p className="text-red-500">{errorMessage}</p>}
            </div>

            {listType.length > 0 && (
                <div className="mt-4">
                    <p>List Service Type</p>
                    <div className="flex gap-7">
                        <ul style={{ listStyleType: 'circle', paddingLeft: '24px' }}>
                            {listType.map((item, index) => (
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
