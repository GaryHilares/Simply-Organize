import styles from "../../styles/NoteEditorModal.module.css";

function NoteEditorModal(props) {
    return (
        <div className={styles.modal}>
            <div className="m-5 border-black bg-body border border-dark" role="dialog">
                <div className="modal-dialog m-3" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">Edit note</h1>
                        </div>
                        <div className="modal-body">
                            <textarea
                                className={styles.modal__textarea}
                                placeholder="Type your notes here..."
                                onInput={props.handleInput}
                                value={props.value}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger m-1" onClick={props.handleCancel}>
                                Cancel
                            </button>
                            <button className="btn btn-success m-1" onClick={props.handleSubmit}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { NoteEditorModal };
