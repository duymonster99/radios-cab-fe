// libraries
import { Button, Image, Input, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

// services
import {
    putAdminImageService,
    putAdminService,
} from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import Loading from '../../../Helper/Loading';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function EditProfileDriver({ openFormEdit, setOpenFormEdit, driver, setIsCall }) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [dataInput, setDataInput] = useState({
        driverFullName: '',
        driverMobile: '',
        driverEmail: '',
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
        if (driver) {
            setDataInput({
                driverFullName: driver.driverFullName,
                driverMobile: driver.driverMobile,
                driverEmail: driver.driverEmail,
            });
        }
    }, [driver]);

    // ? ============================================ handle data edit company ==========================================
    const handleChange = (e) => {
        setDataInput({
            ...dataInput,
            [e.target.name]: e.target.value,
        });
    };

    const mutation = useMutationHook((props) => putAdminService(props));
    const mutationImage = useMutationHook((props) => putAdminImageService(props));

    const { isSuccess: postSuccess, isPending } = mutation;
    const { isSuccess: postImageSuccess, isPending: pendingImage } = mutationImage;

    const handleSubmitEdit = () => {
        mutation.mutate({ url: `Admin/updateDriver/${driver.id}`, data: dataInput });
    };

    useEffect(() => {
        if (postSuccess) {
            const formDataImage = new FormData();
            const arrayImage = [...fileList];

            arrayImage.map((image) => {
                formDataImage.append('formFileProfile', image.originFileObj);
            });
            mutationImage.mutate({ url: `Driver/driver/${driver.id}/update`, data: formDataImage });
        }
        if (isPending) {
            setLoading(true);
        }
    }, [postSuccess, isPending]);

    useEffect(() => {
        if (postImageSuccess) {
            message.success('Update Driver successfully!');
            setOpenFormEdit(false);
            setLoading(false);
            setIsCall(true);
        }
        if (pendingImage) {
            setLoading(true);
        }
    }, [postImageSuccess, pendingImage])

    return (
        <>
            <Modal title="UPDATE PROFILE" open={openFormEdit} onCancel={() => setOpenFormEdit(false)} footer={null}>
                <Loading isLoading={loading}>
                    <div className="">
                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Driver Name
                            </label>
                            <Input
                                value={dataInput.driverFullName}
                                name="driverFullName"
                                onChange={handleChange}
                                placeholder="Driver Name"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Driver Mobile
                            </label>
                            <Input
                                value={dataInput.driverMobile}
                                name="driverMobile"
                                onChange={handleChange}
                                placeholder="Driver Mobile"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Driver Email
                            </label>
                            <Input
                                value={dataInput.driverEmail}
                                name="driverEmail"
                                onChange={handleChange}
                                placeholder="Driver Email"
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
