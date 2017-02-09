import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import SectionBreadCrumbs from '../SectionBreadCrumbs/SectionBreadCrumbs';
import init_v_menu from '../../../lib/vertical_menu';
import SideFormMenu from '../SideFormMenu/SideFormMenu';
import * as allActions from  '../../actions';

class MoveDocumentBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetSectionId: -1,
            sectionsPart: 0,
        };
        this.setTargetPortfolioSection = this.setTargetPortfolioSection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.moveDocument = this.moveDocument.bind(this);
        this.changeSectionsPart = this.changeSectionsPart.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentDidUpdate() {
        if ($("#menu-v2").length) {
            init_v_menu({menuId: "menu-v2", alignWithMainMenu: true});
            // init_v_menu({menuId: "menu-v3", alignWithMainMenu: true});
        }
    }

    closeForm() {
        this.setState({targetSectionId: -1});
        this.props.dispatch(allActions.setCurrentDocument({
            id: -1,
            date_of_document: '',
            document_type: 0,
            urls: "[]",
            files: "[]"
        }));
        this.props.dispatch(allActions.showMoveDocForm(false));
    }

    setTargetPortfolioSection(event) {
        this.setState({targetSectionId: Number(event.target.id.split('ect').pop())}); // full sectionId is "a_sect123" format
    };

    handleSubmit() {
        if (this.state.targetSectionId < 0 || this.state.targetSectionId == this.props.currentSectionId) {
            //TODO Make alert
            return false;
        }
        this.moveDocument();
        this.closeForm();
    };

    moveDocument() {
        const dataObj = {
            document_id: this.props.documentId,
            occupation_id: occupation_id,
            target_section_id: this.state.targetSectionId
        };
        const {dispatch, currentSectionId} = this.props;
        $.ajax({
            url: 'move_document.php',
            type: 'POST',
            data: {'dataObj': JSON.stringify(dataObj)},
            // processData: false,
            // contentType: false,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                dispatch(allActions.fetchPoints(portfolio_id));
                dispatch(allActions.fetchDocumentsList(currentSectionId));
                console.log("Document moved: " + data);
            },
            error: function (error) {
                console.log(error);
                alert("Move document server side PHP error!!!");
            }
        });
    };

    changeSectionsPart(e) {
        if (e.target.id == "invarpart-btn") {
            this.setState({sectionsPart: 0})
        } else {
            this.setState({sectionsPart: 1})
        }
    }

    render() {
        const {currentSectionId, formSections} = this.props;
        return (
            <div className="move-document-block">
                <div className="info-sign tooltip-custom"
                     title={"Требуемые документы: " + this.props.currentSectionHint}>
                    <img className="" width="50" height="50" src="images/q.png" alt=""/>
                </div>
                <div className="closeicon tooltip-custom" title="Закрыть окно добавления документа"
                     onClick={this.closeForm}></div>
                <div className="side-menus-block">
                    <div className="menu-trigger-block">
                        <div
                            className={this.state.sectionsPart == 0 ? "trigger-btn" : "trigger-btn trigger-btn-inactive"}
                            id="invarpart-btn" onClick={this.changeSectionsPart}
                            style={{position: "relative", zIndex: 900}}>
                            Инвариантная <br/> часть
                        </div>
                        <div
                            className={this.state.sectionsPart == 1 ? "trigger-btn" : "trigger-btn trigger-btn-inactive"}
                            id="varpart-btn" onClick={this.changeSectionsPart}
                            style={{position: "relative", zIndex: 900}}>
                            Вариативная <br/> часть
                        </div>
                    </div>
                    {this.state.sectionsPart == 0 ?
                        <SideFormMenu formSections={formSections}
                                      currentSectionId={currentSectionId}
                                      sectionsPart={0}
                                      changePortfolioSection={this.setTargetPortfolioSection}
                                      menuId={2}
                        />
                        :
                        <SideFormMenu formSections={formSections}
                                      currentSectionId={currentSectionId}
                                      sectionsPart={1}
                                      changePortfolioSection={this.setTargetPortfolioSection}
                                      menuId={2}
                        />
                    }
                </div>
                <div className="target-sections-block">
                    <h2>Перемещение документа</h2>
                    <h4>Текущий раздел документа</h4>
                    {currentSectionId > -1 ?
                        <SectionBreadCrumbs currentSectionId={currentSectionId}
                                            formSections={formSections}/> : null}
                    <h4>Новый раздел документа</h4>
                    {this.state.targetSectionId > -1 ?
                        <SectionBreadCrumbs currentSectionId={this.state.targetSectionId}
                                            formSections={formSections}/>
                        : <h5>Выберите новый раздел документа</h5>}
                    <div className="button save" onClick={this.handleSubmit}>Переместить документ</div>
                    <div className="button delete" onClick={this.closeForm}>Отмена</div>
                </div>
            </div>
        )
    }
}

MoveDocumentBlock.propTypes = {
    formSections: PropTypes.array.isRequired,
    documentId: PropTypes.number.isRequired,
    currentSectionId: PropTypes.number.isRequired,
    moveDocument: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default MoveDocumentBlock;