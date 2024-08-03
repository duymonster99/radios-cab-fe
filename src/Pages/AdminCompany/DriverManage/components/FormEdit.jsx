import { Modal } from "antd";

export default function FormEdit({ openFormEdit, setOpenFormEdit, driver }) {
    console.log('driver', driver);

    return(
        <>
            <Modal title="EDIT DRIVER" open={openFormEdit}>

            </Modal>
        </>
    )
}