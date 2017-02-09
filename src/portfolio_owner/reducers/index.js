import {combineReducers} from 'redux';
import {
    REQUEST_FORM, REQUEST_POINTS, REQUEST_SECTION_DOCUMENTS,
    RECEIVE_FORM, RECEIVE_POINTS, RECEIVE_SECTION_DOCUMENTS, CHANGE_SECTION,
    CHANGE_SECTIONS_PART, UPDATE_LOADERS, CHANGE_DOCUMENTS_SORTING,
    UPDATE_DOCUMENT, SET_CURRENT_DOCUMENT, EDIT_DOC_FORM_IS_SHOWN, MOVE_DOC_FORM_IS_SHOWN
} from '../actions';

function formSections(state = [], action) {
    switch (action.type) {
        case REQUEST_FORM:
            return [];
        case RECEIVE_FORM:
            return action.formSections;
        default:
            return state;
    }
}

function isFetchingForm(state = true, action) {
    switch (action.type) {
        case REQUEST_FORM:
            return true;
        case RECEIVE_FORM:
            return false;
        default:
            return state;
    }
}

function documentsList(state = [], action) {
    switch (action.type) {
        case REQUEST_SECTION_DOCUMENTS:
            return [];
        case RECEIVE_SECTION_DOCUMENTS:
            return action.documentsList;
        default:
            return state;
    }
}

function isFetchingDocuments(state = true, action) {
    switch (action.type) {
        case REQUEST_SECTION_DOCUMENTS:
            return true;
        case RECEIVE_SECTION_DOCUMENTS:
            return false;
        default:
            return state;
    }
}

function validPoints(state = {variant: -1, invariant: -1}, action) {
    switch (action.type) {
        case REQUEST_POINTS:
            return {
                variant: -8888,
                invariant: -8888
            };
        case RECEIVE_POINTS:
            return action.validPoints;
        default:
            return state;
    }
}

function loadersValues(state = [-1, -1, -1, -1, -1], action) {
    switch (action.type) {
        case UPDATE_LOADERS:
            return action.loadersValues;
        default:
            return state;
    }
}

function isFetchingPoints(state = true, action) {
    switch (action.type) {
        case REQUEST_POINTS:
            return true;
        case RECEIVE_POINTS:
            return false;
        default:
            return state;
    }
}

function currentSectionId(state = -1, action) {
    switch (action.type) {
        case CHANGE_SECTION:
            return action.nextSectionId;
        default:
            return state;
    }
}

function currentSectionHint(state = "None", action) {
    switch (action.type) {
        case CHANGE_SECTION:
            return action.nextSectionHint;
        default:
            return state;
    }
}

function sectionsPart(state = 1, action) {
    switch (action.type) {
        case CHANGE_SECTIONS_PART:
            return action.nextSectionsPart;
        default:
            return state;
    }
}

function documentsSorting(state = 0, action) {
    switch (action.type) {
        case CHANGE_DOCUMENTS_SORTING:
            return action.nextSorting;
        default:
            return state;
    }
}

function currentDocument(state = {id: -1, date_of_document: '', document_type: 0, urls: "[]", files: "[]"}, action) {
    switch (action.type) {
        case SET_CURRENT_DOCUMENT:
            return action.currentDocument;
        default:
            return state;
    }
}

function editDocFormIsShown(state = false, action) {
    switch (action.type) {
        case EDIT_DOC_FORM_IS_SHOWN:
            return action.isShown;
        default:
            return state;
    }
}

function moveDocFormIsShown(state = false, action) {
    switch (action.type) {
        case MOVE_DOC_FORM_IS_SHOWN:
            return action.isShown;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    formSections,
    isFetchingForm,
    documentsList,
    isFetchingDocuments,
    validPoints,
    isFetchingPoints,
    currentSectionId,
    currentSectionHint,
    sectionsPart,
    documentsSorting,
    loadersValues,
    currentDocument,
    editDocFormIsShown,
    moveDocFormIsShown
});

export default rootReducer;
