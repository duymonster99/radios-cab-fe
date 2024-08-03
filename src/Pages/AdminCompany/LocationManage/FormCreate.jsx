import { CloseOutlined } from '@ant-design/icons';
import { Button, message, Modal, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useMutationHook } from '../../../Hooks/useMutation';
import { postCompanyService } from '../../../Services/apiService';
import Loading from '../../../Helper/Loading';

export default function AddLocation({ openAdd, setOpenAdd, provinces, cid, setIsCall }) {
    const options = [];
    const [values, setValues] = useState([]);
    const [listLocation, setListLocation] = useState([]);
    const [locationSubmit, setLocationSubmit] = useState([]);
    const [loading, setLoading] = useState(false);

    // ? -------------------------- WHEN MOUNTED ---------------------------
    for (let i = 0; i < provinces.length; i++) {
        const value = provinces[i].name;
        options.push({
            label: value,
            value,
            desc: value,
        });
    }

    // ? -------------------------- HANDLE CHANGE --------------------------
    const handleChange = (value) => {
        setValues(value);
    };

    // ? -------------------------- HANDLE SUBMIT ---------------------------
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
        }
    };

    // ? ------------------------- HANDLE DELETE LIST LOCATION ----------------------
    const handleDelete = (index) => {
        const newLocations = [...listLocation];
        newLocations.splice(index, 1);

        setListLocation(newLocations);
    };

    // ? ------------------------ ADD DB --------------------------------------------
    useEffect(() => {
        if (listLocation && listLocation.length > 0) {
            const newLocationSubmit = listLocation.map((item) => ({
                companyId: cid,
                cityService: item,
            }));
            setLocationSubmit(newLocationSubmit);
        }
    }, [listLocation]);

    const mutationLocation = useMutationHook((props) => postCompanyService(props));
    const { isSuccess, isPending } = mutationLocation;

    const handleCreate = () => {
        mutationLocation.mutate({ url: 'CompanyLocation/company/location', data: locationSubmit });
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Added Location Successfully!');
            setIsCall(true);
            setLoading(false)
            setOpenAdd(false);
        }

        if (isPending) {
            setLoading(true);
        }
    }, [isSuccess, isPending]);

    return (
        <Modal
            title="ADD LOCATION"
            open={openAdd}
            okText="Create"
            onOk={handleCreate}
            onCancel={() => setOpenAdd(false)}
        >
            <Loading isLoading={loading}>
                <div>
                    <label>Select Location</label>
                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Select One Location"
                        value={values}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => <Space>{option.data.value}</Space>}
                    />
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
            </Loading>
        </Modal>
    );
}
