import { Button, Image, Input, message, Modal, Upload } from 'antd';
import Loading from '../../../Helper/Loading';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { postCompanyService, putCompanyService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function CreateAdvs({ openAdd, setOpenAdd, cid, setIsCall }) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [formSubmit, setFormSubmit] = useState({
        companyId: '',
        description: '',
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

    // ? ====================== HANDLE CHANGE FORM =============================
    const handleChange = (e) => {
        setFormSubmit({
            companyId: cid,
            description: e.target.value,
        });
    };

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

    // ? ===================== HANDLE SUBMIT ========================
    const mutation = useMutationHook((props) => postCompanyService(props));
    const mutationImage = useMutationHook((props) => putCompanyService(props));

    const { isSuccess: postSuccess, isLoading, isPending, data } = mutation;
    const { isSuccess: postImageSuccess, isPending: pendingImage } = mutationImage;

    const handleSubmit = () => {
        mutation.mutate({ url: `AdvertisementImage/create`, data: formSubmit });
    };

    useEffect(() => {
        if (postSuccess) {
            const formDataImage = new FormData();
            const arrayImage = [...fileList];

            arrayImage.map((image) => {
                formDataImage.append('formFile', image.originFileObj);
            });

            mutationImage.mutate({ url: `AdvertisementImage/update/${data?.id}`, data: formDataImage });
        }
        if (isPending) {
            setLoading(true);
        }
    }, [postSuccess, isPending]);

    useEffect(() => {
        if (postImageSuccess) {
            message.success('Create Advertisement Successfully!');
            setOpenAdd(false);
            setLoading(false);
            setIsCall(true);
        }
        if (pendingImage) {
            setLoading(true);
        }
    }, [postImageSuccess, pendingImage]);

    return (
        <Modal
            title="ADD ADVERTISEMENT"
            open={openAdd}
            okText="Create"
            onOk={handleSubmit}
            onCancel={() => setOpenAdd(false)}
        >
            <Loading isLoading={loading}>
                <div>
                    <label>Description</label>
                    <Input value={formSubmit.description} onChange={handleChange} placeholder="Enter description" />
                </div>

                <div className="my-4">
                    <label>Upload Banner</label>
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
            </Loading>
        </Modal>
    );
}
