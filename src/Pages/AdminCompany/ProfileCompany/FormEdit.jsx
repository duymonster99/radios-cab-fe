import { Button, Image, Input, message, Modal, Upload } from 'antd';
import { putCompanyService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import { useEffect, useState } from 'react';
import Loading from '../../../Helper/Loading';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function FormEditProfile({ openFormEdit, setOpenFormEdit, company, setIsCall }) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [dataInput, setDataInput] = useState({
        companyName: '',
        companyTaxCode: '',
        contactPerson: '',
        contactPersonMobile: '',
        companyTelephone: '',
        companyEmail: ''
    });

    // ? ---------------------- handle upload file ------------------------------
    const handleUploadImage = (e) => {
        const files = e.target.files;
        setFileList(files);
    };

    const handleDeleteImage = () => {
        setFileList([]);
    };

    // ? --------------------- create button upload ------------------------------
    const uploadButton = (
        <label
            className="h-[100px] w-[100px] flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-[#cacaca] bg-[rgba(255,255,255,1)] p-[1.5rem] rounded-xl"
            for="file"
        >
            <PlusOutlined className="text-gray-500" />
            <div className="flex items-center">
                <span className='font-["Open_Sans"] text-gray-500'>Upload</span>
            </div>
            <input type="file" id="file" accept="image/*" className="hidden" onChange={handleUploadImage} />
        </label>
    );

    // ? -------------------- handle set state data company -------------------------
    useEffect(() => {
        if (company) {
            setDataInput({
                companyName: company.companyName,
                companyTaxCode: company.companyTaxCode,
                contactPerson: company.contactPerson,
                contactPersonMobile: company.contactPersonMobile,
                companyTelephone: company.companyTelephone,
                companyEmail: company.companyEmail,
                password: 'huynhtuanduy18',
            });
        }
    }, [company]);

    // console.log(dataInput);

    // ? ============================================ handle data edit company ==========================================
    const handleChange = (e) => {
        setDataInput({
            ...dataInput,
            [e.target.name]: e.target.value,
        });
    };

    const putImageCompany = async ({ url, data }) => {
        const response = await axios.put(`http://localhost:5192/api/${url}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    };

    const mutation = useMutationHook((props) => putCompanyService(props));

    // get id company
    const tokenStorage = localStorage.getItem("tokenCompany")
    const { unique_name } = jwtDecode(tokenStorage)

    const { isSuccess: postSuccess, isLoading, isPending } = mutation;

    const formData = new FormData();
    const handleSubmitEdit = () => {
        const arrayImage = [...fileList];

        arrayImage.map((image) => {
            formData.append('companyImage', image);
        });

        mutation.mutate({ url: `CompanyInfoUpdate/company/${unique_name}/update`, data: dataInput });
    };

    useEffect(() => {
        if (postSuccess) {
            message.success('Update company successfully!');
            setOpenFormEdit(false);
            setLoading(false)
            setIsCall(true)
        }
        if (isLoading || isPending) {
            setLoading(true);
        }
    }, [postSuccess, isLoading, isPending]);

    return (
        <>
            <Modal title="UPDATE PROFILE" open={openFormEdit} onCancel={() => setOpenFormEdit(false)} footer={null}>
                <Loading isLoading={loading}>
                    <div className="">
                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Company Name
                            </label>
                            <Input
                                value={dataInput.companyName}
                                name="companyName"
                                onChange={handleChange}
                                placeholder="Company Name"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Company Tax Code
                            </label>
                            <Input
                                type="number"
                                value={dataInput.companyTaxCode}
                                name="companyTaxCode"
                                onChange={handleChange}
                                placeholder="Company Tax Code"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Contact Person
                            </label>
                            <Input
                                value={dataInput.contactPerson}
                                name="contactPerson"
                                onChange={handleChange}
                                placeholder="Contact Person"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Contact Person Number
                            </label>
                            <Input
                                type="number"
                                value={dataInput.contactPersonMobile}
                                name="contactPersonMobile"
                                onChange={handleChange}
                                placeholder="Contact Person Number"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Company Telephone
                            </label>
                            <Input
                                type="number"
                                value={dataInput.companyTelephone}
                                name="companyTelephone"
                                onChange={handleChange}
                                placeholder="Company Telephone"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Company Email
                            </label>
                            <Input
                                value={dataInput.companyEmail}
                                name="companyEmail"
                                onChange={handleChange}
                                placeholder="Company Email"
                            />
                        </div>

                        <div className="my-4">
                            <label className="mb-2">
                                <span className="text-red-600">* </span>Upload Avatar
                            </label>

                            {fileList.length === 0 && uploadButton}
                            {fileList.length > 0 && (
                                <>
                                    {[...fileList].map((item, index) => (
                                        <div className="relative w-[130px] h-[130px] rounded-[10px] border-2 border-dashed group">
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(item)}
                                                className="absolute top-0 rounded-[10px]"
                                                alt=""
                                            />
                                            <button
                                                className="absolute top-[50%] -translate-y-[50%] z-[100] left-[50%] -translate-x-[50%] text-red-600 hidden group-hover:block transition-all duration-0"
                                                onClick={handleDeleteImage}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <div className="absolute top-0 left-0 w-full h-full bg-slate-50 hidden group-hover:block"></div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="mt-4">
                            <Button type="primary" onClick={handleSubmitEdit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Loading>
            </Modal>
        </>
    );
}
