import fetch from 'isomorphic-fetch';

export const REQUEST_FORM = 'REQUEST_FORM';
export const REQUEST_POINTS = 'REQUEST_POINTS';
export const REQUEST_SECTION_DOCUMENTS = 'REQUEST_SECTION_DOCUMENTS';
export const RECEIVE_FORM = 'RECEIVE_FORM';
export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export const RECEIVE_SECTION_DOCUMENTS = 'RECEIVE_SECTION_DOCUMENTS';
export const CHANGE_SECTION = 'CHANGE_SECTION';
export const CHANGE_DOCUMENTS_SORTING = 'CHANGE_DOCUMENTS_SORTING';
export const CHANGE_SECTIONS_PART = 'CHANGE_SECTIONS_PART';
export const UPDATE_LOADERS = 'UPDATE_LOADERS';
export const SET_CURRENT_DOCUMENT = 'SET_CURRENT_DOCUMENT';
export const MOVE_DOC_FORM_IS_SHOWN = 'MOVE_DOC_FORM_IS_SHOWN';
export const EDIT_DOC_FORM_IS_SHOWN = 'EDIT_DOC_FORM_IS_SHOWN';

function requestForm() {
    return {
        type: REQUEST_FORM
    };
}
function receiveForm(formSections) {
    return {
        type: RECEIVE_FORM,
        formSections
    }
}
function requestPoints() {
    return {
        type: REQUEST_POINTS
    };
}
function receivePoints(validPoints) {
    return {
        type: RECEIVE_POINTS,
        validPoints: {variant: validPoints.var, invariant: validPoints.invar}
    }
}
function requestSectionDocuments() {
    return {
        type: REQUEST_SECTION_DOCUMENTS
    };
}
function receiveSectionDocuments(documentsList) {
    return {
        type: RECEIVE_SECTION_DOCUMENTS,
        documentsList
    }
}
function setCurrentSection(nextSectionId, nextSectionHint) {
    return {
        type: CHANGE_SECTION,
        nextSectionId,
        nextSectionHint
    }
}
function setSectionsPart(nextSectionsPart) {
    return {
        type: CHANGE_SECTIONS_PART,
        nextSectionsPart
    }
}

export function setCurrentDocument(currentDocument) {
    return {
        type: SET_CURRENT_DOCUMENT,
        currentDocument
    }
}
export function changeDocumentsSorting(nextSorting) {
    return {
        type: CHANGE_DOCUMENTS_SORTING,
        nextSorting
    }
}
export function fetchDocumentsList(formSection, portfolioId) {
    return dispatch => {
        dispatch(requestSectionDocuments());
        return fetch(`get_section_documents.php?section=${formSection}&portfolio_id=${portfolio_id}`, {credentials: 'include'})
            .then(response => response.json())
            .then(json => dispatch(receiveSectionDocuments(json)));
    }
}
export function fetchForm(occupationId) {
    return dispatch => {
        dispatch(requestForm());
        return fetch('get_form.php', {credentials: 'include'})
            .then(response => response.json())
            .then(json => dispatch(receiveForm(json)));
    }
}
export function fetchPoints(portfolioId) {
    return dispatch => {
        dispatch(requestPoints());
        return fetch(`get_owner_points.php?portfolio_id=${portfolioId}`, {credentials: 'include'})
            .then(response => response.json())
            .then(json => dispatch(receivePoints(json)));
    }
}

export function removeDocumentFromServer(portfolioId, documentId, sectionId) {
    return dispatch => {
        return fetch(`remove_document.php?document_id=${documentId}`, {credentials: 'include'})
            .then(response => {
                dispatch(fetchDocumentsList(sectionId, portfolioId));
                dispatch(fetchPoints(portfolioId));
            });
    }
}

export function changeFormSection(nextSectionId, nextSectionHint, portfolioId) {
    return dispatch => {
        dispatch(setCurrentSection(nextSectionId, nextSectionHint));
        dispatch(fetchDocumentsList(nextSectionId, portfolioId));
    }
}
export function changeSectionsPart(nextSectionsPart) {
    return dispatch => {
        dispatch(setCurrentSection(-1, "None", 100));
        dispatch(setSectionsPart(nextSectionsPart));
    }
}
export function setLoadersValues(loadersValues) {
    return {
        type: UPDATE_LOADERS,
        loadersValues
    }
}

export function showMoveDocForm(isShown) {
    return {
        type: MOVE_DOC_FORM_IS_SHOWN,
        isShown
    }
}
export function showEditDocForm(isShown) {
    return {
        type: EDIT_DOC_FORM_IS_SHOWN,
        isShown
    }
}
