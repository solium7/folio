import $ from 'jquery';
import 'jquery-circle-progress';

import React, {PropTypes} from 'react';

const SectionBreadCrumbs = ({formSections, currentSectionId}) => {
    let formSectionsById = [],
        breadCrumbs = [],
        parentIdx,
        sectionTitle;

    formSections.forEach(section => formSectionsById[section.id] = section);
    parentIdx = formSectionsById[currentSectionId].parent_id;

    sectionTitle = formSectionsById[currentSectionId].title;
    while (parentIdx != 0) {
        breadCrumbs.push(formSectionsById[parentIdx].title);
        parentIdx = formSectionsById[parentIdx].parent_id;
    }
    breadCrumbs.reverse();

    return (
        <div className="bread-crumbs">
            {breadCrumbs.map((title,idx) => {
                return (
                    <div key={"bread-title-"+idx} className="bread-crumb">
                        <div className="crumb-title">{title}</div>
                        <div className="down-arrow">
                            <img width="30" height="15" className="arrow" src = "images/down_arrow.png"/>
                        </div>
                    </div>
                )
            })}
            <div className="crumb-current-section-title"><h6>{sectionTitle}</h6></div>
        </div>
    )
};

SectionBreadCrumbs.propTypes = {
    formSections: PropTypes.array.isRequired,
    currentSectionId: PropTypes.number.isRequired,
};

export default SectionBreadCrumbs;