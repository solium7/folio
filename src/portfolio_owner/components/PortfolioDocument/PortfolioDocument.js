import React, {PropTypes} from 'react';

const PortfolioDocument = ({folioDocument, deleteDocument, editDocument, moveDocument}) => {
    const docFiles = JSON.parse(folioDocument.files);
    const docUrls = JSON.parse(folioDocument.urls);
    const documentTypes = ["Диплом", "Грамота", "Справка", "Свидетельство", "Публикация", "Сертификат", "Благодарственное письмо"];

    let resHref;
    const createHrefForFile = (fileRecord) => {
        switch (fileRecord.file.split(".").pop()) {
            case "doc":
            case "docx":
            case "xls":
            case "xlsx":
            case "ppt":
            case "pptx":
            case "svg":
            case "pdf":
                resHref = "https://docs.google.com/viewer?url=" + window.location.href.split('portfolio_owner')[0] + fileRecord.file;
                break;
            case "jpg":
                resHref = "#";
                break;
            case "odt":
            case "ods":
            case "odp":
                resHref = "/viewerjs/#../" + fileRecord.file;
                break;
            default:
                resHref = fileRecord.file;
                break;
        }
        return resHref;
    };
    const createThumbnail = (fileRecord) => {
        let tbnClassName = "";
        let tbnDataOriginAttr = "";

        if (fileRecord.file.split(".").pop() == "jpg") {
            tbnClassName = "viewable-images";
            tbnDataOriginAttr = window.location.href.split('portfolio_owner')[0] + fileRecord.file;
        }

        return (
            <img className={tbnClassName} data-origin={tbnDataOriginAttr} src={fileRecord.tbn} alt=""/>
        )
    };
    return (
        <div className="single-document-wrapper">
            <div className="document-details">
                <div className="document-dates-block">
                    <div className="document-date">
                        Дата документа:&nbsp;&nbsp;
                        <span>{folioDocument.date_of_document}</span>
                    </div>
                    <div className="document-date">
                        <h5>{documentTypes[Number(folioDocument.document_type)]}</h5>
                    </div>
                    <div className="document-date">
                        Дата загрузки:&nbsp;&nbsp;
                        <span>{folioDocument.date_of_upload}</span>
                    </div>
                </div>
                <div className="well well-sm document-files">
                    {docFiles.map((item, idx) =>
                        <div key={"docListFile" + idx} className="document-file">
                            <a href={createHrefForFile(item)}
                               target={item.file.split(".").pop() == "jpg" ? "_self" : "_blank"}>
                                {createThumbnail(item)}
                            </a>
                        </div>
                    )}
                </div>
                <div className="well well-sm links">
                    {docUrls.map((item, idx) => <a key={"docListUrl" + idx} className="document-link" href={item}
                                                   target="_blank">{" | " + item + " | "}</a>)}
                </div>
            </div>
            <div className="document-operations">
                <div className="edit-btn" title="Редактировать">
                    <img src="images/del_edit_move_icons/edit.png" alt="" id={"edit-btn" + folioDocument.id}
                         onClick={editDocument}/>
                </div>
                <div className="edit-btn" title="Переместить">
                    <img src="images/del_edit_move_icons/move.png" alt="" id={"move-btn" + folioDocument.id}
                         onClick={moveDocument}/>
                </div>
                <div className="edit-btn" title="Удалить">
                    <img src="images/del_edit_move_icons/delete.png" alt="" id={"del-btn" + folioDocument.id}
                         onClick={deleteDocument}/>
                </div>
            </div>
        </div>
    )
};


PortfolioDocument.propTypes = {
    folioDocument: PropTypes.object.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    editDocument: PropTypes.func.isRequired,
    moveDocument: PropTypes.func.isRequired,
};

export default PortfolioDocument;
