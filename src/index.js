import $ from 'jquery';
import {setCookie} from './lib/utils';

$.each($(".portfolio-link"), function (i, val) {
    $(val).click(function () {
        setCookie("portfolio_id", $(val).attr("data-portfolio"));
        setCookie("occupation_id", $(val).attr("data-occupation"));
        window.location.href = "portfolio_owner.php";
    })
});