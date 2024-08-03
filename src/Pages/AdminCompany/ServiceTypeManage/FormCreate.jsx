// libraries
import { CloseOutlined } from '@ant-design/icons';
import { Button, message, Modal, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

// services
import { useMutationHook } from '../../../Hooks/useMutation';
import { postCompanyService } from '../../../Services/apiService';
import Loading from '../../../Helper/Loading';

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

export default function AddType({ openAdd, setOpenAdd, cid, setIsCall }) {
    const [values, setValues] = useState([]);
    const [listType, setListType] = useState([]);
    const [typeSubmit, setTypeSubmit] = useState([]);
    const [loading, setLoading] = useState(false);

    // ? -------------------------- HANDLE CHANGE --------------------------
    const handleChange = (value) => {
        setValues(value);
    };

    // ? -------------------------- HANDLE SUBMIT ---------------------------
    const handleSubmit = () => {
        if (values.length > 0) {
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
        }
    };

    // ? ------------------------- HANDLE DELETE LIST LOCATION ----------------------
    const handleDelete = (index) => {
        const newTypes = [...listType];
        newTypes.splice(index, 1);

        setListType(newTypes);
    };

    // ? ------------------------ ADD DB --------------------------------------------
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

    const handleCreate = () => {
        mutationType.mutate({ url: 'CompanyService/company/service/create', data: typeSubmit });
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Added Service Type Successfully!');
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
            title="ADD SERVICE TYPE"
            open={openAdd}
            okText="Create"
            onOk={handleCreate}
            onCancel={() => setOpenAdd(false)}
        >
            <Loading isLoading={loading}>
                <div>
                    <label>Select Service Type</label>
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
            </Loading>
        </Modal>
    );
}
