﻿Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

var searchSource = $("#search-template").html();
var searchTemplate = Handlebars.compile(searchSource);
var movieTimer = 0;
var tvimer = 0;

movieLoad();
tvLoad();

$('#approveAll').click(function () {
    $.ajax({
        type: 'post',
        url: '/approval/approveall',
        dataType: "json",
        success: function (response) {
            if (checkJsonResponse(response)) {
                generateNotify("Success!", "success");
            }
        },
        error: function (e) {
            console.log(e);
            generateNotify("Something went wrong!", "danger");
        }
    });
});


// Report Issue
$(document).on("click", ".dropdownIssue", function (e) {
    var issue = $(this).attr("issue-select");
    var id = e.target.id;
    // Other issue so the modal is opening
    if (issue == 4) {
        return;
    }
    e.preventDefault();

    var $form = $('#form' + id);
    var data = $form.serialize();
    data = data + "&issue=" + issue;
    
    $.ajax({
        type: $form.prop('method'),
        url: $form.prop('action'),
        data: data,
        dataType: "json",
        success: function (response) {
            if (checkJsonResponse(response)) {
                generateNotify("Success!", "success");
            }
        },
        error: function (e) {
            console.log(e);
            generateNotify("Something went wrong!", "danger");
        }
    });
});

// Modal click
$(".theSaveButton").click(function () {
    var comment = $("#commentArea").val();
    e.preventDefault();

    var $form = $("#form" + id);
    var data = $form.serialize();
    data = data + "&issue=" + 4 + "&comment="+comment;

    $.ajax({
        type: $form.prop("method"),
        url: $form.prop("action"),
        data: data,
        dataType: "json",
        success: function (response) {
            if (checkJsonResponse(response)) {
                generateNotify("Success!", "success");
                $("#myModal").modal("hide");
            }
        },
        error: function (e) {
            console.log(e);
            generateNotify("Something went wrong!", "danger");
        }
    });
});

// Update the modal
$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('identifier'); // Extract info from data-* attributes

    var modal = $(this);
    modal.find('.theSaveButton').val(id); // Add ID to the button
    modal.find('#requestId').val(id); // Add ID to the hidden field
});

$(document).on("click", ".delete", function (e) {
    e.preventDefault();
    var buttonId = e.target.id;
    var $form = $('#form' + buttonId);

    $.ajax({
        type: $form.prop('method'),
        url: $form.prop('action'),
        data: $form.serialize(),
        dataType: "json",
        success: function (response) {

            if (checkJsonResponse(response)) {
                generateNotify("Success!", "success");

                $("#" + buttonId + "Template").slideUp();
            }
        },
        error: function (e) {
            console.log(e);
            generateNotify("Something went wrong!", "danger");
        }
    });

});


function movieLoad() {
    $("#movieList").html("");

    $.ajax("/requests/movies/").success(function (results) {
        results.forEach(function (result) {
            var context = buildRequestContext(result, "movie");

            var html = searchTemplate(context);
            $("#movieList").append(html);
        });
    });
};

function tvLoad() {
    $("#tvList").html("");

    $.ajax("/requests/tvshows/").success(function (results) {
        results.forEach(function (result) {
            var context = buildRequestContext(result, "tv");
            var html = searchTemplate(context);
            $("#tvList").append(html);
        });
    });
};

function buildRequestContext(result, type) {

    var context = {
        posterPath: result.posterPath,
        id: result.providerId,
        title: result.title,
        overview: result.overview,
        year: result.releaseYear,
        type: type,
        status: result.status,
        releaseDate: result.releaseDate,
        approved: result.approved,
        requestedBy: result.requestedBy,
        requestedDate: result.requestedDate,
        available: result.available,
        admin: result.admin,
        issues: result.issues,
        otherMessage: result.otherMessage
    };

    return context;
}