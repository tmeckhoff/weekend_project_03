$(document).ready(function () {
    /*
     gets data from people.json
     */
    $.ajax({
        url: "/data",
        success: function (data) {
            //take response from people.json and append each object and its properties to DOM in its own inactive div in #cohort div
            $.each(data, function () {
                $('#cohort').append("<div class='well well-sm inactive'></div>");
                var el = $('#cohort').children().last();//take the last div in #cohort and save it in var el
                //in that last div, append the properties of each object
                el.append($("<h1/>", {text: this.name}));
                el.append($("<h4/>", {text: "Description "}));
                el.append($("<p/>", {text: this.desc}));
                el.append($("<h4/>", {text: "Shout Out! "}));
                el.append($("<p/>", {text: this.thanks}));
            });

            //once all objects are on the DOM, remove the class inactive and replace it with active for the first div in #cohort only, the rest will remain inactive/hidden
            $('#cohort').children().first().removeClass('inactive');
            $('#cohort').children().first().addClass('active');
        }

    });

    //go to next person and next dot
    $('body').on('click', '.next', function() {
        var currentPerson = $('.active');//the active div is currentPerson
        var nextPerson = currentPerson.next();//nextPerson is the next div after currentPerson in #cohort

        var currentDot = $('.active-dot');//active dot is currentDot
        var nextDot = currentDot.next();//nextDot is the next dot after currentDot

        if(nextPerson.length === 0) {//if there isn't a nextPerson, go back to the first div in #cohort and first dot li
            nextPerson = $('#cohort').children().first();
            nextDot = $('.dot').first();
        }

        currentPerson.slideUp(200).removeClass('active');//currentPerson slides up and is no longer active
        nextPerson.slideDown(200).addClass('active');//nextPerson slides down and is now the only active div in #cohort

        currentDot.removeClass('active-dot');//make the next dot the only active dot
        nextDot.addClass('active-dot');
    });

//go to previous person and previous dot
    $('body').on('click', '.prev', function() {
        var currentPerson = $('.active');//currentPerson is only active div in #cohort
        var prevPerson = currentPerson.prev();//prevPerson is set to previous div in #cohort

        var currentDot = $('.active-dot');//active dot is currentDot
        var prevDot = currentDot.prev();//prevDot is the dot li before the currentDot

        if(prevPerson.length === 0) {//if there isn't a previous person, set previous person to the last div in #cohort
            prevPerson = $('#cohort').children().last();
            prevDot = $('.dot').last();//make previous dot the last li dot
        }

        currentPerson.slideUp(200).removeClass('active');//make current person no longer active
        prevPerson.slideDown(200).addClass('active');//make previous person div in #cohort active

        currentDot.removeClass('active-dot');//make the previous dot the only active dot
        prevDot.addClass('active-dot');
    });


});//end document ready