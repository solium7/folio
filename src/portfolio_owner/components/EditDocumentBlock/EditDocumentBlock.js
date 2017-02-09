import React, {PropTypes} from 'react';
import Viewer from 'viewerjs';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import * as allActions from  '../../actions';

class EditDocumentBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docDate: "",
            docType: 0,
            docFiles: [],
            docImages: [],
            docLinks: [],
            removedServerDocFiles: [],
            remainedServerDocFiles: []
        };

        this.viewers = [];

        this.knownFileExtensions = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "odt", "ods", "odp", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "PDF", "ODT", "ODS", "ODP"];
        this.inetPixFileExtensions = ["jpeg", "jpg", "gif", "png", "JPEG", "JPG", "GIF", "PNG"];
        this.tiffFileExtensions = ["tif", "tiff", "TIF", "TIFF"];
        this.tbnsPath = {
            doc: "images/file_types_icons/doc.png",
            docx: "images/file_types_icons/docx.png",
            xls: "images/file_types_icons/xls.png",
            xlsx: "images/file_types_icons/xlsx.png",
            ppt: "images/file_types_icons/ppt.png",
            pptx: "images/file_types_icons/pptx.png",
            pdf: "images/file_types_icons/pdf.png",
            odt: "images/file_types_icons/odt.png",
            ods: "images/file_types_icons/ods.png",
            odp: "images/file_types_icons/odp.png",
            other: "images/file_types_icons/other.png"
        };

        this.uniqId = this.uniqId.bind(this);

        this.convertInetImage = this.convertInetImage.bind(this);
        this.convertTiffImage = this.convertTiffImage.bind(this);

        this.addLink = this.addLink.bind(this);
        this.removeDocLink = this.removeDocLink.bind(this);

        this.removeDocImage = this.removeDocImage.bind(this);
        this.removeDocFile = this.removeDocFile.bind(this);
        this.removeServerFile = this.removeServerFile.bind(this);

        this.closeForm = this.closeForm.bind(this);

        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleDocDateChange = this.handleDocDateChange.bind(this);
        this.handleDocTypeChange = this.handleDocTypeChange.bind(this);

        this.updateStateOfDocImages = this.updateStateOfDocImages.bind(this);

        this.createFormData = this.createFormData.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getFileNameFromPath = this.getFileNameFromPath.bind(this);
        this.getDocImageURL = this.getDocImageURL.bind(this);
        this.createHrefForFile = this.createHrefForFile.bind(this);

        // this.dataURItoBlob = this.dataURItoBlob.bind(this);
    }

    uniqId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            docDate: nextProps.currentDocument.date_of_document,
            docType: nextProps.currentDocument.document_type,
            docFiles: [],
            docImages: [],
            docLinks: JSON.parse(nextProps.currentDocument.urls),
            removedServerDocFiles: [],
            remainedServerDocFiles: JSON.parse(nextProps.currentDocument.files)
        });
    }

    componentDidMount() {
        const addLink = this.addLink;
        const handleDocDateChange = this.handleDocDateChange;
        $("#edt-doc-date").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (d, i) {
                if (d !== i.lastVal) {
                    handleDocDateChange(i);
                }
            }
        });
        $("#edt-doc-link-input").keyup(function (e) {
            if (e.keyCode == 13) {
                addLink();
            }
        });
    }

    componentDidUpdate() {
        this.viewers = [];
        this.state.docImages.forEach((item, idx) => {
            this.viewers[idx] = new Viewer(document.getElementById('edt-uploadImg' + idx), {
                url: this.getDocImageURL,
                navbar: false,
                title: false,
                zoomRatio: 0.3,
            });
        });
        const docImages = document.getElementsByClassName("viewable-images");
        Array.prototype.forEach.call(docImages, (item, idx) => {
            this.viewers[idx] = new Viewer((item), {
                url: "data-origin",
                navbar: false,
                title: false,
                zoomRatio: 0.3,
            });
        });
    }

    getDocImageURL(e) {
        return this.state.docImages[e.id.slice(13)].docImageURL;
    }

    convertInetImage() {
        let input, file, fr, img;

        const fileName = this.getFileNameFromPath();
        let docImageURL = null;
        let tbnURL = null;
        const updateState = this.updateStateOfDocImages;

        if (typeof window.FileReader !== 'function') {
            writeImage("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('edt-docFile-input');
        if (!input) {
            console.log("Um, couldn't find the imgfile element.");
        }
        else if (!input.files) {
            console.log("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            console.log("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);
        }

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = fr.result;
        }

        function imageLoaded() {
            let iw = img.width,
                ih = img.height,
                itw = Math.round(iw / ih * 100),
                ith = 100;

            if ((ih > iw) && (ih > 2000)) {
                iw = Math.round(iw / ih * 2000);
                ih = 2000;
            }
            if ((iw > ih) && (iw > 2000)) {
                ih = Math.round(ih / iw * 2000);
                iw = 2000;

            }
            var canvas = document.getElementById("canvas");
            canvas.width = iw;
            canvas.height = ih;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, iw, ih);
            docImageURL = canvas.toDataURL("image/jpeg", 0.55);

            canvas.width = itw;
            canvas.height = ith;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, itw, ith);
            tbnURL = canvas.toDataURL("image/png");

            updateState({docImageURL, tbnURL, fileName});
        }
    }

    convertTiffImage() {
        let input, file, fr, img;

        const fileName = this.getFileNameFromPath();
        let docImageURL = null;
        let tbnURL = null;
        const updateState = this.updateStateOfDocImages;

        if (typeof window.FileReader !== 'function') {
            writeImage("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('edt-docFile-input');
        if (!input) {
            console.log("Um, couldn't find the imgfile element.");
        }
        else if (!input.files) {
            console.log("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            console.log("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createTiffImage;
            fr.readAsArrayBuffer(file);
        }

        function createTiffImage() {
            Tiff.initialize({
                TOTAL_MEMORY: 100000000
            });
            const tiff = new Tiff({buffer: fr.result});
            const tiffCanvas = tiff.toCanvas();
            console.log("Tiff created!");

            $(tiffCanvas).css({
                "max-width": "100px",
                "width": "100%",
                "height": "auto",
                "display": "block",
                "padding-top": "10px"
            });
            document.body.appendChild(tiffCanvas);

            let iw = tiffCanvas.width,
                ih = tiffCanvas.height,
                itw = Math.round(iw / ih * 100),
                ith = 100;

            console.log("Tiff width: " + iw);
            console.log("Tiff height: " + ih);

            if ((ih > iw) && (ih > 2000)) {
                iw = Math.round(iw / ih * 2000);
                ih = 2000;
            }
            if ((iw > ih) && (iw > 2000)) {
                ih = Math.round(ih / iw * 2000);
                iw = 2000;

            }
            tiffCanvas.width = iw;
            tiffCanvas.height = ih;
            console.log("Tiff new width: " + tiffCanvas.width);
            console.log("Tiff new height: " + tiffCanvas.height);
            docImageURL = tiffCanvas.toDataURL("image/jpeg", 0.55);

            tiffCanvas.width = itw;
            tiffCanvas.height = ith;
            console.log("Tiff tbn width: " + tiffCanvas.width);
            console.log("Tiff tbn height: " + tiffCanvas.height);
            tbnURL = tiffCanvas.toDataURL("image/png");

            updateState({docImageURL, tbnURL, fileName});
        }
    }

    updateStateOfDocImages(newDocImage) {
        let docImages = this.state.docImages.slice();
        docImages.push(newDocImage);
        this.setState({docImages});
    }

    createHrefForFile(fileRecord) {
        let resHref;
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

    addLink() {
        let docLinks = this.state.docLinks.slice();
        let link = document.getElementById("edt-doc-link-input").value;
        if (link == "") {
            return;
        }
        if (link.split('ttp://').length == 1) {
            link = "http://" + link;
        }
        docLinks.push(link);
        this.setState({docLinks});
        document.getElementById("edt-doc-link-input").value = "";
    }

    removeDocLink(event) {
        const idx = event.target.id.slice(11);
        let docLinks = this.state.docLinks.slice();
        docLinks.splice(idx, 1);
        this.setState({docLinks});
    }

    removeDocImage(event) {
        const idx = event.target.id.slice(12);
        let docImages = this.state.docImages.slice();
        docImages.splice(idx, 1);
        this.setState({docImages});
    }

    removeDocFile(event) {
        const idx = event.target.id.slice(11);
        let docFiles = this.state.docFiles.slice();
        docFiles.splice(idx, 1);
        this.setState({docFiles});
    }

    removeServerFile(event) {
        const idx = event.target.id.slice(12);
        let remainedServerDocFiles = this.state.remainedServerDocFiles.slice();
        let removedServerDocFiles = this.state.removedServerDocFiles.slice();
        removedServerDocFiles = removedServerDocFiles.concat(remainedServerDocFiles.splice(idx, 1));
        this.setState({remainedServerDocFiles, removedServerDocFiles});
    }

    closeForm() {
        this.props.dispatch(allActions.showEditDocForm(false));
        this.props.dispatch(allActions.setCurrentDocument({
            id: -1,
            date_of_document: '',
            document_type: 0,
            urls: "[]",
            files: "[]"
        }));
    }

    handleInputFileChange(e) {
        const fileName = this.getFileNameFromPath();
        if ((fileName == null) || (fileName == "")) {
            return;
        }
        const fileExtension = fileName.split('.').pop();
        let docFiles = this.state.docFiles.slice();

        if (this.knownFileExtensions.indexOf(fileExtension) > -1) {
            docFiles.push({fileName: fileName, file: e.target.files[0], tbn: fileExtension});
            this.setState({docFiles});
            return;
        }

        if (this.inetPixFileExtensions.indexOf(fileExtension) > -1) {
            this.convertInetImage();
            return;
        }

        if (this.tiffFileExtensions.indexOf(fileExtension) > -1) {
            this.convertTiffImage();
            return;
        }

        // Если файл не опознан то просто его добавляем
        docFiles.push({fileName: fileName, file: e.target.files[0], tbn: "other"});
        this.setState({docFiles});
    }

    handleDocDateChange(val) {
        this.setState({docDate: val.selectedDay + "/" + Number(val.selectedMonth + 1) + "/" + val.selectedYear});
    }

    handleDocTypeChange(e) {
        this.setState({docType: e.target.value});
    }

    createFormData() {
        const formData = new FormData();
        const docId = this.props.currentDocument.id;
        formData.append('document_id', docId);
        formData.append('portfolio_id', portfolio_id);
        formData.append('occupation_id', occupation_id);
        formData.append('section_id', this.props.currentSectionId);
        formData.append('urls', JSON.stringify(this.state.docLinks));
        formData.append('document_type', this.state.docType);
        formData.append('document_date', this.state.docDate);
        formData.append('remained_doc_files', JSON.stringify(this.state.remainedServerDocFiles));

        this.state.docImages.forEach(item => {
            formData.append('imageFiles[]', item.docImageURL);
            formData.append('tbnImageFiles[]', item.tbnURL);
        });

        this.state.docFiles.forEach(item => {
            formData.append('otherFiles[]', item.file, item.fileName);
        });
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }
        console.log(this.state.remainedServerDocFiles);
        return formData;
    }

    sendFormData(loaderId, formData) {
        const {changeSingleLoaderState, dispatch, currentSectionId} = this.props;
        const docId = this.props.currentDocument.id;

        function progress(e) {

            if (e.lengthComputable) {
                var max = e.total;
                var current = e.loaded;

                var Percentage = (current * 100) / max;
                console.log("Percentage: " + Percentage);

                if (Percentage >= 100) {
                    // process completed
                }

                // console.log(e.total + "   " + e.loaded);
                // console.log(loaderId + "   " + Math.round(e.loaded / e.total * 100));
                changeSingleLoaderState(loaderId, Math.round(e.loaded / e.total * 100));
            }
        }

        $.ajax({
            url: 'add_document.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            crossDomain: true,
            // cache: false,
            xhrFields: {
                withCredentials: true
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progress, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
                changeSingleLoaderState(loaderId, 101);
                dispatch(allActions.fetchPoints(portfolio_id));
                dispatch(allActions.fetchDocumentsList(currentSectionId));
            },
            error: function (error) {
                console.log(error);
                alert("Upload error!!!");
            }
        });
    }

    handleSubmit() {
        const formData = this.createFormData();
        let freeLoaderId;
        this.props.loadersValues.every(function (item, idx) {
            if (item == -1) {
                freeLoaderId = idx;
                return false;
            }

        });
        this.sendFormData(freeLoaderId, formData);
        this.closeForm();
    }

    getFileNameFromPath() {
        const fullPath = document.getElementById('edt-docFile-input').value;
        if (fullPath) {
            const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
    }

    render() {
        return (
            <div className="edit-document-block">
                <div className="info-sign tooltip-custom"
                     title={"Требуемые документы: " + this.props.currentSectionHint}>
                    <img className="" width="50" height="50" src="images/q.png" alt=""/>
                </div>
                <div className="closeicon tooltip-custom" title="Закрыть окно добавления документа"
                     onClick={this.closeForm}></div>
                <h3 className="modal-title"> {this.props.currentDocument.id < 0 ? 'Добавление документа в портфолио' : 'Редактирование документа в портфолио'}</h3>
                <div className="date-n-type">
                    <div className="a-label"> Дата документа:</div>
                    <input id="edt-doc-date" type="text" size="10" readOnly="readonly"
                           value={this.state.docDate} onChange={this.handleDocDateChange}/>

                    <div className="a-label"> Тип документа:</div>
                    <select size="1" id="edt-doc-type" title="Тип документа"
                            value={this.state.docType} onChange={this.handleDocTypeChange}>
                        <option value="0">Диплом</option>
                        <option value="1">Грамота</option>
                        <option value="2">Справка</option>
                        <option value="3">Свидетельство</option>
                        <option value="4">Публикация</option>
                        <option value="5">Сертификат</option>
                        <option value="6">Благодарственное письмо</option>
                    </select>
                    <label className="custom-file-input">
                        <input type="file" id="edt-docFile-input"
                               onChange={this.handleInputFileChange}/>
                    </label>
                </div>
                <div className="a-label"> Ссылка на файл документа:</div>
                <div className="url-n-add-btn">
                    <input id="edt-doc-link-input" type="text" size="10"/>
                    <div className="button add" onClick={this.addLink}>
                        {/*<img src="images/close_icon_small.png" alt="Зонтик" style={{verticalAlign: 'middle'}}/>*/}
                        Добавить ссылку
                    </div>
                </div>
                <div className="documents-links">
                    {this.state.docLinks.map((docLink, idx) => (
                        <div key={"link" + idx} className="doc-link">
                            <a href={docLink} target="_blanc">{docLink}</a>
                            <img id={"edt-delLink" + idx} src="images/close_icon_small.png" width="20" height="20"
                                 alt="Delete"
                                 style={{verticalAlign: 'middle'}} onClick={this.removeDocLink}/>
                        </div>))}
                </div>
                <div className="documents-files">
                    {this.state.remainedServerDocFiles.map((servFile, idx) => (
                        <div key={"servfile" + idx} className="doc-file">
                            <a href={this.createHrefForFile(servFile)}
                               target={servFile.file.split(".").pop() == "jpg" ? "_self" : "_blank"}>
                                <img src={servFile.tbn} data-origin={servFile.file}
                                     className={servFile.file.split(".").pop() == "jpg" ? "viewable-images" : ""}/>
                            </a>
                            Файл на сервере
                            <img id={"del-servFile" + idx} src="images/close_icon_small.png" alt="Delete"
                                 style={{verticalAlign: 'middle'}} onClick={this.removeServerFile}/>
                        </div>
                    ))}
                    {this.state.docImages.map((docImage, idx) => (
                        <div key={"image" + idx} className="doc-file">
                            <img id={"edt-uploadImg" + idx} src={docImage.tbnURL}/>
                            {docImage.fileName}
                            <img id={"edt-delImage" + idx} src="images/close_icon_small.png" alt="Delete"
                                 style={{verticalAlign: 'middle'}} onClick={this.removeDocImage}/>
                        </div>
                    ))}
                    {this.state.docFiles.map((docFile, idx) => (
                        <div key={"file" + idx} className="doc-file">
                            <img src={"images/file_types_icons/" + docFile.tbn + ".png"}/>
                            {docFile.fileName}
                            <img id={"edt-delFile" + idx} src="images/close_icon_small.png" alt="Delete"
                                 style={{verticalAlign: 'middle'}} onClick={this.removeDocFile}/>
                        </div>
                    ))}
                </div>
                <div className="submit-n-cancel">
                    <div id="edt-upload-btn" className="button save" onClick={this.handleSubmit}>
                        Загрузить документ в портфолио
                    </div>
                    <div className="button delete" onClick={this.closeForm}>
                        Отмена
                    </div>
                </div>
            </div>

        )
    }
}

EditDocumentBlock.propTypes = {
    currentSectionId: PropTypes.number.isRequired,
    currentSectionHint: PropTypes.string.isRequired,
    changeSingleLoaderState: PropTypes.func.isRequired,
    loadersValues: PropTypes.array.isRequired,
    currentDocument: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default EditDocumentBlock;