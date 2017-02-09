export default {
    formSections: [],
    currentSectionId: -1,
    currentSectionAgeThresHold: -1,
    currentSectionHint: "",
    sectionsPart: 0,
    documentsSorting: 0,
    documentsList: [],
    isFetchingForm: true,
    isFetchingPoints: true,
    isFetchingDocuments: false,
    validPoints: {
        variant: -1,
        invariant: -1
    },
    loadersValues: [-1, -1, -1, -1, -1],
    currentDocument: {
        id: -1, date_of_document: '', document_type: 0, urls: "[]", files: "[]",
    },
    editDocFormIsShown: false,
    moveDocFormIsShown: false,
}