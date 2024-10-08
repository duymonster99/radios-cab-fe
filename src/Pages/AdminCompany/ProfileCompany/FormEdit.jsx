// libraries
import { Button, Image, Input, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

// services
import { putCompanyImageService, putCompanyService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import Loading from '../../../Helper/Loading';

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function FormEditProfile({ openFormEdit, setOpenFormEdit, company, setIsCall }) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [dataInput, setDataInput] = useState({
        companyName: '',
        companyTaxCode: '',
        contactPerson: '',
        contactPersonMobile: '',
        companyTelephone: '',
        companyEmail: '',
        description: ''
    });

    // ? ---------------------- handle upload file ------------------------------
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChangeFile = ({ fileList: newFileList }) => setFileList(newFileList);

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
                description: company.description
            });
        }
    }, [company]);

    // ? ============================================ handle data edit company ==========================================
    const handleChange = (e) => {
        setDataInput({
            ...dataInput,
            [e.target.name]: e.target.value,
        });
    };

    const mutation = useMutationHook((props) => putCompanyService(props));
    const mutationImage = useMutationHook((props) => putCompanyImageService(props));

    // get id company
    const tokenStorage = localStorage.getItem('tokenCompany');
    const { unique_name } = jwtDecode(tokenStorage);

    const { isSuccess: postSuccess, isLoading, isPending } = mutation;
    const { isSuccess: postImageSuccess, isPending: pendingImage } = mutationImage;

    const handleSubmitEdit = () => {
        const formDataImage = new FormData();
        const arrayImage = [...fileList];

        arrayImage.map((image) => {
            formDataImage.append('formFile', image.originFileObj);
        });

        mutation.mutate({ url: `CompanyInfoUpdate/company/${unique_name}/update`, data: dataInput });

        mutationImage.mutate({ url: `CompanyInfoUpdate/company/${unique_name}/update-image`, data: formDataImage });
    };

    useEffect(() => {
        if (postSuccess && postImageSuccess) {
            message.success('Update company successfully!');
            setOpenFormEdit(false);
            setLoading(false);
            setIsCall(true);
        }
        if (isPending || pendingImage) {
            setLoading(true);
        }
    }, [postSuccess, isPending, postImageSuccess, pendingImage]);

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

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Description
                            </label>
                            <TextArea
                                value={dataInput.description}
                                name="description"
                                onChange={handleChange}
                                placeholder="Company Description"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 8,
                                }}
                            />
                        </div>

                        <div className="my-4">
                            <label className="mb-2">
                                <span className="text-red-600">* </span>Upload Avatar
                            </label>

                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChangeFile}
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
