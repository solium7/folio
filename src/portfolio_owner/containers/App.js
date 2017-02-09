import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as allActions from  '../actions';
import $ from 'jquery';
import jQuery from 'jquery';

import init_v_menu from '../../lib/vertical_menu';
import {getCookie} from '../../lib/utils';
import '../../lib/tooltipster.bundle.min';

import Viewer from 'viewerjs';
import Loader from '../components/Loader/Loader';
import TopPoints from '../components/TopPoints/TopPoints';
import SideFormMenu from '../components/SideFormMenu/SideFormMenu';
import SectionBreadCrumbs from '../components/SectionBreadCrumbs/SectionBreadCrumbs';
import MoveDocumentBlock from '../components/MoveDocumentBlock/MoveDocumentBlock';
import EditDocumentBlock from '../components/EditDocumentBlock/EditDocumentBlock';
import PortfolioDocument from '../components/PortfolioDocument/PortfolioDocument';
// import 'jquery-ui/ui/widgets/tooltip';
import './styles.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.viewers = [];
        this.isReceivedMenuSections = false;
        this.changeSectionsPart = this.changeSectionsPart.bind(this);
        this.changeSingleLoaderState = this.changeSingleLoaderState.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.moveDocument = this.moveDocument.bind(this);
        this.editDocument = this.editDocument.bind(this);
        this.sortDocuments = this.sortDocuments.bind(this);
        this.getSortedDocumentsList = this.getSortedDocumentsList.bind(this);
        this.getDocumentById = this.getDocumentById.bind(this);
        this.changePortfolioSection = this.changePortfolioSection.bind(this);
        this.showEditDocForm = this.showEditDocForm.bind(this);
        this.showMoveDocForm = this.showMoveDocForm.bind(this);
        this.occupations = [
            "nobody",
            "учитель",
            "инструктор по труду",
            "преподаватель",
            "учитель2",
            "учитель3",
            "воспитатель",
            "руководитель физического воспитания",
            "преподаватель – организатор основ безопасности жизнедеятельности",
            "педагог дополнительного образования",
            "музыкальный руководитель",
            "мастер производственного обучения",
            "инструктор по физической культуре",
            "учитель-дефектолог, учитель-логопед",
            "педагог-библиотекарь",
            "тренер-преподаватель",
            "инструктор-методист",
            "методист",
            "педагог-организатор",
            "социальный педагог",
            "педагог-психолог",
            "концентмейстер"];

    }

    componentDidMount() {
        this.formSectionsById = [];
        const {dispatch} = this.props;
        dispatch(allActions.fetchForm(occupation_id));
        dispatch(allActions.fetchPoints(portfolio_id));
    }

    changeSingleLoaderState(id, value) {
        const newLoadersValues = this.props.loadersValues.slice();
        newLoadersValues[id] = value;
        // this.props.dispatch(allActions.setLoadersValues(newLoadersValues));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.sectionsPart != nextProps.sectionsPart) {
            this.isReceivedMenuSections = false;
        }
        if (this.props.formSections != nextProps.formSections) {
            nextProps.formSections.forEach(section => this.formSectionsById[section.id] = section);
        }
    }

    componentDidUpdate() {
        if (this.props.currentSectionId > -1) {
            $(".add-document-btn").show();
        } else {
            $(".add-document-btn").hide();
        }
        // $('.tooltip-custom').tooltipster({maxWidth: 400});
        // $( document ).tooltip();

        let currentFormSection = this.currentFormSection;
        const {dispatch, formSections} = this.props;

        if (!this.isReceivedMenuSections && document.getElementsByClassName("vertical-menu-block").length > 0) {
            init_v_menu({menuId: "menu-v1", alignWithMainMenu: true});
            this.isReceivedMenuSections = true;
        }

        // if (!this.isMountedLoaders) {
        //     for (let i = 0; i < 5; i++) {
        //         const loaderEl = $(".loader" + i);
        //         if (loaderEl.length) {
        //             loaderEl.circleProgress({
        //                 startAngle: -Math.PI / 4 * 3,
        //                 value: 0.0,
        //                 lineCap: 'round',
        //                 fill: {color: '#ffa500'}
        //             });
        //         }
        //     }
        //     this.isMountedLoaders = true;
        // }

        // $("#mainAppDiv").fadeIn(50);
        this.props.loadersValues.every(item => {
                if (item == 101) {
                    dispatch(allActions.fetchDocumentsList(this.props.currentSectionId, portfolio_id));
                    dispatch(allActions.fetchPoints(portfolio_id));
                    return false;
                }
            }
        );

        // For documents list images. Mounted in PortfolioDocument.js
        this.viewers = [];
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

    changeSectionsPart(e) {
        if ((e.target.id == "invarpart-btn") && (this.props.sectionsPart != "0")) {
            this.isReceivedMenuSections = false;
            this.props.dispatch(allActions.changeSectionsPart(0));
        }
        if ((e.target.id == "varpart-btn") && (this.props.sectionsPart != "1")) {
            this.isReceivedMenuSections = false;
            this.props.dispatch(allActions.changeSectionsPart(1));
        }
    }

    getSortedDocumentsList() {
        let res = this.props.documentsList.slice();
        switch (this.props.documentsSorting) {
            case 0:
                res.sort(function (a, b) {
                    return (a.date_of_document < b.date_of_document);
                });
                break;
            case 1:
                res.sort(function (a, b) {
                    return (a.date_of_document > b.date_of_document);
                });
                break;
            case 2:
                res.sort(function (a, b) {
                    return (a.date_of_upload < b.date_of_upload);
                });
                break;
            case 3:
                res.sort(function (a, b) {
                    return (a.date_of_upload > b.date_of_upload);
                });
                break;
            default:
                res.sort(function (a, b) {
                    return (a.date_of_upload < b.date_of_upload);
                });
                break;
        }
        return res;
    }

    sortDocuments(e) {
        const {dispatch} = this.props;
        const currentSorting = this.props.documentsSorting;
        const sortButon = e.target.id;
        let resSorting = 0;
        if (sortButon == "sort01") {
            if (currentSorting == 0) {
                resSorting = 1;
            } else {
                resSorting = 0;
            }
        }
        if (sortButon == "sort23") {
            if (currentSorting == 2) {
                resSorting = 3;
            } else {
                resSorting = 2;
            }
        }
        dispatch(allActions.changeDocumentsSorting(resSorting));
    }

    changePortfolioSection(event) {
        const formSectionsById = this.formSectionsById;
        const sectionId = event.target.id.split('ect').pop(); // full sectionId is "a_sect123" format
        this.props.dispatch(allActions.changeFormSection(Number(sectionId), formSectionsById[sectionId].confirmation, portfolio_id));
    }

    getDocumentById(docId) {
        let res = {id: -1, date_of_document: '', document_type: 0, urls: "[]", files: "[]"};
        this.props.documentsList.forEach(folioDocument => {
            if (folioDocument.id == docId) {
                res = folioDocument;
                return null
            }
        });
        return res;
    }

    deleteDocument(ev) {
        this.props.dispatch(allActions.removeDocumentFromServer(portfolio_id, Number(ev.target.id.slice(7)), this.props.currentSectionId));
    }

    addDocument() {
        this.props.dispatch(allActions.setCurrentDocument({
            id: -1,
            date_of_document: '',
            document_type: 0,
            urls: "[]",
            files: "[]"
        }));
        $("#edit-document-block").css("display", "block");
    }

    editDocument(ev) {
        this.props.dispatch(allActions.setCurrentDocument(this.getDocumentById(Number(ev.target.id.slice(8)))));
        this.showEditDocForm();
    }

    moveDocument(ev) {
        this.props.dispatch(allActions.setCurrentDocument(this.getDocumentById(Number(ev.target.id.slice(8)))));
        this.showMoveDocForm();
    }

    showEditDocForm() {
        this.props.dispatch(allActions.showEditDocForm(true));
    }

    showMoveDocForm() {
        this.props.dispatch(allActions.showMoveDocForm(true));
    }

    render() {
        const {sectionsPart, editDocFormIsShown, moveDocFormIsShown} = this.props;
        return (
            <div id="mainAppDiv">
                {/*top panel begin */}
                <div className="navbar navbar-default navbar-fixed-top head-panel" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"><img className="logo-cmo" id="trigger" width="40"
                                                                      height="40"
                                                                      src="images/logo_cmo.png"
                                                                      alt=""/></a>
                        </div>
                        <div className="navbar-left">
                            <TopPoints validPoints={this.props.validPoints} portfolioId={portfolio_id}/>
                        </div>

                        <div className="navbar-right">
                            <a href="http://astrcmo.pro/index.php">
                                <div className="a-btn exit-btn">ВЫХОД</div>
                            </a>
                        </div>
                        <div className="navbar-right">
                            <div className="button add" onClick={this.showEditDocForm}>Добавить документ
                            </div>
                        </div>

                        <div className="navbar-right user-name">
                            <p>
                                <strong>{getCookie("firstName") + " " + getCookie("surName") + " " + getCookie("lastName")}</strong><br/>
                                Должность: <strong>{this.occupations[Number(occupation_id)]}</strong></p>
                        </div>

                        <div className="navbar-right loaders-bar well well-sm">
                            {this.props.loadersValues.map((item, idx) =>
                                <Loader key={"loader" + idx}
                                        loaderId={idx}
                                        loaderValue={item}
                                        changeSingleLoaderState={this.changeSingleLoaderState}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {/*top panel end*/}

                {/*main content begin*/}
                <div className="row mcontent">
                    <div className="col-sm-3 col-md-3 col-lg-3 sidebar">
                        <div className="menu-trigger-block">
                            <div className={sectionsPart == 0 ? 'trigger-btn' : 'trigger-btn trigger-btn-inactive'}
                                 id="invarpart-btn" onClick={this.changeSectionsPart}
                                 style={{position: "relative", zIndex: 900}}>
                                Инвариантная <br/> часть
                            </div>
                            <div className={sectionsPart == 1 ? "trigger-btn" : "trigger-btn trigger-btn-inactive"}
                                 id="varpart-btn" onClick={this.changeSectionsPart}
                                 style={{position: "relative", zIndex: 900}}>
                                Вариативная <br/> часть
                            </div>
                        </div>
                        <div style={{position: "relative", zIndex: 1}}>
                            <SideFormMenu formSections={this.props.formSections}
                                          currentSectionId={this.props.currentSectionId}
                                          currentSectionHint={this.props.currentSectionHint}
                                          sectionsPart={this.props.sectionsPart}
                                          changePortfolioSection={this.changePortfolioSection}
                                          menuId={1}
                            />
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="row">
                            <div className="row">
                                <div className="col-sm-11 col-md-11 col-lg-11">
                                    {this.props.currentSectionId > -1 ?
                                        <SectionBreadCrumbs currentSectionId={this.props.currentSectionId}
                                                            formSections={this.props.formSections}/> : null}
                                </div>
                            </div>
                            {this.props.documentsList.length > 0 ?
                                (<div className="row">
                                    <div className="col-sm-11 col-md-11 col-lg-11">
                                        <div className="row panel-body">
                                            &nbsp;&nbsp;&nbsp;сортировать документы: &nbsp;
                                            <div id="sort01" className="btn btn-success" onClick={this.sortDocuments}>
                                                по дате документов
                                            </div>
                                            <div id="sort23" className="btn btn-success" onClick={this.sortDocuments}>
                                                по дате загрузки на сервер
                                            </div>
                                        </div>
                                    </div>
                                </div>) : <div/>}
                            <div className="row">
                                <div className="col-sm-11 col-md-11 col-lg-11">
                                    {this.props.currentSectionId > -1 ?
                                        (this.props.documentsList.length > 0 ? this.getSortedDocumentsList().map((item, idx) =>
                                                <PortfolioDocument key={"doc" + idx}
                                                                   folioDocument={item}
                                                                   editDocument={this.editDocument}
                                                                   moveDocument={this.moveDocument}
                                                                   deleteDocument={this.deleteDocument}
                                                />) :
                                            <div><h3>Нет документов в данном разделе</h3></div>) :
                                        <div><h3>Выберите раздел портфолио слева</h3></div> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*main content end*/}

                {/*modal new|edit|move blocks begin*/}
                <div className={editDocFormIsShown ? "modal-block-wrapper" : "modal-block-wrapper invisible"}>
                    <EditDocumentBlock currentSectionId={this.props.currentSectionId}
                                       currentSectionHint={this.props.currentSectionHint}
                                       changeSingleLoaderState={this.changeSingleLoaderState}
                                       loadersValues={this.props.loadersValues}
                                       dispatch={this.props.dispatch}
                                       currentDocument={this.props.currentDocument}
                    />
                </div>
                <div className={moveDocFormIsShown ? "modal-block-wrapper" : "modal-block-wrapper invisible"}>
                    <MoveDocumentBlock formSections={this.props.formSections}
                                       documentId={Number(this.props.currentDocument.id)}
                                       currentSectionId={this.props.currentSectionId}
                                       moveDocument={this.moveDocument}
                                       dispatch={this.props.dispatch}
                    />
                </div>
                {/*modal new|edit|move blocks end*/}
            </div>
        );
    }
}

App.propTypes = {
    formSections: PropTypes.array.isRequired,
    currentSectionId: PropTypes.number.isRequired,
    currentSectionHint: PropTypes.string.isRequired,
    sectionsPart: PropTypes.number.isRequired,
    documentsSorting: PropTypes.number.isRequired,
    documentsList: PropTypes.array.isRequired,
    isFetchingForm: PropTypes.bool.isRequired,
    isFetchingDocuments: PropTypes.bool.isRequired,
    isFetchingPoints: PropTypes.bool.isRequired,
    validPoints: PropTypes.object.isRequired,
    loadersValues: PropTypes.array.isRequired,
    currentDocument: PropTypes.object.isRequired,
    editDocFormIsShown: PropTypes.bool.isRequired,
    moveDocFormIsShown: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    const {
        portfolioId,
        occupationId,
        formSections,
        currentSectionId,
        currentSectionHint,
        sectionsPart,
        documentsSorting,
        documentsList,
        isFetchingForm,
        isFetchingDocuments,
        isFetchingPoints,
        loadersValues,
        validPoints,
        currentDocument,
        moveDocFormIsShown,
        editDocFormIsShown,
    } = state;

    return {
        portfolioId,
        occupationId,
        formSections,
        currentSectionId,
        currentSectionHint,
        sectionsPart,
        documentsSorting,
        documentsList,
        isFetchingForm,
        isFetchingDocuments,
        isFetchingPoints,
        loadersValues,
        validPoints,
        currentDocument,
        moveDocFormIsShown,
        editDocFormIsShown,
    };
}

export default connect(mapStateToProps)(App);

// <a data-tag={i} style={showStyle} onClick={this.removeTag.bind(null, i)}></a>