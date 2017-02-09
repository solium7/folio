import React, {PropTypes} from 'react';

const SideFormMenu = ({formSections, sectionsPart, changePortfolioSection, menuId}) => {
    const formSectionsById = [];

    formSections.forEach(section => formSectionsById[section.id] = section);

    if (!formSections || formSections.length == 0) {
        return (<h2>...Loading...</h2>);
    }

    let menuPartClass;
    sectionsPart == 0 ? menuPartClass = "blueBgn" : menuPartClass = "greenBgn";

    const uniqId = function () {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    const finalElement = (finalLevelItem, menuItemClass) => {
        return (
            <li key={finalLevelItem.id} id={"sect" + finalLevelItem.id} onClick={changePortfolioSection}>
                <a href="#" id={"a_sect" + finalLevelItem.id} className={menuItemClass}>{finalLevelItem.title}</a>
            </li>)
    };

    const createSideMenu = (sections, menuItemClass) => {
        let topLevelItems = sections.filter(function (sectionsItem) {
            return sectionsItem.parent_id == 0;
        });
        return (
            <ul id={"menu-v" + menuId} className="menu-v">
                {topLevelItems.map((topLevelItem) => {
                    return createMenuRootItem(topLevelItem, menuItemClass)
                })
                }
            </ul>
        );
    };

    const createMenuRootItem = (levelItem, menuItemClass) => {
        if (levelItem.is_final == 1) {
            return finalElement(levelItem, menuItemClass);
        } else {
            return (
                <li key={levelItem.id}><a href="#" className={menuItemClass}>{levelItem.title}</a>
                    {createMenuSubItems(levelItem, menuItemClass)}
                </li>)
        }
    };

    const createMenuSubItems = (topLevelItem, itemClass) => {
        const nextLevel = formSectionsById.filter(function (sectionItem) {
            return sectionItem.parent_id == topLevelItem.id;
        });
        return (
            <ul key={"u" + topLevelItem.id} className="sub">
                {nextLevel.map(nextLevelItem =>
                    nextLevelItem.is_final == 1 ? finalElement(nextLevelItem, itemClass) : createMenuSubUl(nextLevelItem, itemClass)
                )}
            </ul>);
    };

    const createMenuSubUl = (topLevelItem, itemClass) => {
        return (
            <li key={topLevelItem.id}><a href="#" className={itemClass}>{topLevelItem.title}</a>
                {createMenuSubItems(topLevelItem, itemClass)}
            </li>
        )
    };

    return (
        <div className="vertical-menu-block">
            {createSideMenu(formSectionsById.filter((item) => item.part == sectionsPart), menuPartClass)}
        </div>
    )
};

SideFormMenu.propTypes = {
    formSections: PropTypes.array.isRequired,
    currentSectionId: PropTypes.number.isRequired,
    sectionsPart: PropTypes.number.isRequired,
    changePortfolioSection: PropTypes.func.isRequired,
    menuId: PropTypes.number.isRequired
};

export default SideFormMenu;