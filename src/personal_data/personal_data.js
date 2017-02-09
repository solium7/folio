import $ from 'jquery';

// sliding form ========================================================================================================

$(function () {
    /*
     number of fieldsets
     */
    const fieldsetCount = $('#formElem').children().length;

    /*
     current position of fieldset / navigation link
     */
    let current = 1;

    /*
     sum and save the widths of each one of the fieldsets
     set the final sum as the total width of the steps element
     */
    let stepsWidth = 0;
    const widths = new Array();
    $('#steps .step').each(function (i) {
        const $step = $(this);
        widths[i] = stepsWidth;
        stepsWidth += $step.width();
    });
    $('#steps').width(stepsWidth);

    /*
     to avoid problems in IE, focus the first input of the form
     */
    $('#formElem').children(':first').find(':input:first').focus();

    /*
     show the navigation bar
     */
    $('#navigation').show();

    /*
     when clicking on a navigation link
     the form slides to the corresponding fieldset
     */
    $('#navigation a').bind('click', function (e) {
        const $this = $(this);
        const prev = current;
        $this.closest('ul').find('li').removeClass('selected');
        $this.parent().addClass('selected');
        /*
         we store the position of the link
         in the current variable
         */
        current = $this.parent().index() + 1;
        /*
         animate / slide to the next or to the corresponding
         fieldset. The order of the links in the navigation
         is the order of the fieldsets.
         Also, after sliding, we trigger the focus on the first
         input element of the new fieldset
         If we clicked on the last link (confirmation), then we validate
         all the fieldsets, otherwise we validate the previous one
         before the form slided
         */
        $('#steps').stop().animate({
            marginLeft: '-' + widths[current - 1] + 'px'
        }, 500, function () {
            if (current == fieldsetCount)
                validateSteps();
            else
                validateStep(prev);
            $('#formElem').children(':nth-child(' + parseInt(current) + ')').find(':input:first').focus();
        });
        e.preventDefault();
    });

    /*
     clicking on the tab (on the last input of each fieldset), makes the form
     slide to the next step
     */
    $('#formElem > fieldset').each(function () {
        const $fieldset = $(this);
        $fieldset.children(':last').find(':input').keydown(function (e) {
            if (e.which == 9) {
                $('#navigation li:nth-child(' + (parseInt(current) + 1) + ') a').click();
                /* force the blur for validation */
                $(this).blur();
                e.preventDefault();
            }
        });
    });

    /*
     validates errors on all the fieldsets
     records if the Form has errors in $('#formElem').data()
     */
    function validateSteps() {
        let FormErrors = false;
        for (let i = 1; i < fieldsetCount; ++i) {
            const error = validateStep(i);
            if (error == -1)
                FormErrors = true;
        }
        $('#formElem').data('errors', FormErrors);
    }

    /*
     validates one fieldset
     and returns -1 if errors found, or 1 if not
     */
    function validateStep(step) {
        if (step == fieldsetCount) return;

        let error = 1;
        let hasError = false;
        $('#formElem').children(':nth-child(' + parseInt(step) + ')').find(':input:not(button)').each(function () {
            const $this = $(this);
            const valueLength = $.trim($this.val()).length;

            if (valueLength == '') {
                hasError = true;
                $this.css('background-color', '#FFEDEF');
            }
            else
                $this.css('background-color', '#FFFFFF');
        });
        const $link = $('#navigation li:nth-child(' + parseInt(step) + ') a');
        $link.parent().find('.error,.checked').remove();

        let valclass = 'checked';
        if (hasError) {
            error = -1;
            valclass = 'error';
        }
        $('<span class="' + valclass + '"></span>').insertAfter($link);

        return error;
    }

    /*
     if there are errors don't allow the user to submit
     */
    $('#registerButton').bind('click', function () {
        if ($('#formElem').data('errors')) {
            alert('Please correct the errors in the Form');
            return false;
        }
    });
});

// end of sliding form =================================================================================================

$.getJSON("get_personal_data.php", {
// $.getJSON("get_personal_data.php?section=" + sectionId, {
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
}, function (personalData) {
    $(".veil").fadeOut(300);
    $("#lastname").val(personalData[0].employee_lastname);
    $("#firstname").val(personalData[0].employee_firstname);
    $("#surname").val(personalData[0].employee_surname);
    $("#email").val(personalData[0].employee_email);
    $("#address").val(personalData[0].employee_address);
    $("#phones").val(personalData[0].employee_phones);

    $("#education").val(personalData[0].employee_education);

    $("#organization1").val(personalData[0].employee_organization1);
    $("#occupation1").val(personalData[0].employee_occupation1);
    $("#occupationexperience1").val(personalData[0].employee_occupation_experience1);
    $("#organizationexperience1").val(personalData[0].employee_organization_experience1);

    $("#organization2").val(personalData[0].employee_organization2);
    $("#occupation2").val(personalData[0].employee_occupation2);
    $("#occupationexperience2").val(personalData[0].employee_occupation_experience2);
    $("#organizationexperience2").val(personalData[0].employee_organization_experience2);

    $("#category").val(personalData[0].employee_category);
    $("#categorydate").val(personalData[0].employee_category_date);
    $("#experience").val(personalData[0].employee_experience);


    $("#awards").val(personalData[0].employee_awards);

    console.log(personalData[0]);
}).error(function (jqXHR, textStatus, errorThrown) {
    console.log("getSectionDocuments error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
    console.log("========================================================================");
    window.location.reload("http://astrcmo.pro");
});
