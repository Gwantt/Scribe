import React, {useState} from "react";
import { Modal } from "../Context/modal.js";
import NotebookForm from "./index";
import { AiFillPlusCircle } from "react-icons/ai";

const NotebookFormModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontWeight:'600', minHeight:'180px', minWidth:'200px' }} onClick={() => setShowModal(true)}>
                Create Notebook
                <AiFillPlusCircle style={{ fontSize: '40px', margin: '16px' }} />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NotebookForm closeModal={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    )
}

export default NotebookFormModal
