window.addEventListener('load',init);

var deadline,description,annonce;

function init() {
    if (!document.getElementById('coords')){
        return;
      }

      /* Chrono */
    deadline = new Date(Date.parse(new Date()) + 22 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);
    initializeClock('clockdiv2', deadline);

    /* Size annonce */
    description = document.getElementById('description');
    annonce = document.getElementById('annonce');
    addsize(description, annonce);
    window.onresize = function () {
        addsize(description, annonce);
    }
}



/* SLICK option*/
$(document).on('ready', function () {
    $(".slick_gallery").slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});


/*  Horloge */
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor(t / (1000 * 60 * 60));
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);


        hoursSpan.innerHTML = t.hours;
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

/*Size*/

function elementSize(element) {
    return element.offsetHeight;
}

function addheight(element, size) {
    element.style.height = size + "px";

}

function addsize(element_size, element_add) {
    addheight(element_add, elementSize(element_size) + 45);
}

/* Display*/

function displayNone(element) {
    if (element !== null) {
        element.style.display = 'none';
    }
}

function displayBlock(element) {
    element.style.display = 'block';
}
/* URL */

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace( //On se place dans l'URL
        /[?&]+([^=&]+)=?([^&]*)?/gi, // Verification de validité
        function (m, key, value) { // Si pas de valeur on met rien
            vars[key] = value !== undefined ? value : '';
        }
    );
    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

/* Step */

function formStep(step, step_max) {
    var id_step;
    var element;
    for (var i = 0; i < step_max; i++) {
        id_step = "step_" + i;
        element = document.getElementById(id_step);
        if (i == step && element !== null) {
            displayBlock(element);
        } else {
            displayNone(element);
        }
    }
}

function formStepNbr(step, step_max) {
    var element = document.getElementById('nbr_step');
    element.innerHTML = "Etape: " + (step + 1) + "/" + (step_max);
}

function allfunctionstep(step, step_max) {
    formStep(step, step_max);
    formStepNbr(step, step_max);

    var element = document.getElementById('button_step-sup');
    if (step > 0) {
        displayNone(element);
    } else {
        displayBlock(element);
    }
}

/* INSCRIPTION SECTION */

function sectionInscription(value) {
    if (value == 'return') {
        var element = document.getElementById('section_default');
        displayBlock(element);
        var element = document.getElementById('section_pro');
        displayNone(element);
        element = document.getElementById('section_client');
        displayNone(element);
    } else {
        if ($_GET('type') == 'client' || value == 'client') {
            var element = document.getElementById('section_client');
            displayBlock(element);
            var element = document.getElementById('section_default');
            displayNone(element);
            element = document.getElementById('section_pro');
            displayNone(element);
        }
        else if ($_GET('type') == 'pro' || value == 'pro') {
            var element = document.getElementById('section_pro');
            displayBlock(element);
            var element = document.getElementById('section_default');
            displayNone(element);
            element = document.getElementById('section_client');
            displayNone(element);
        }
        else {
            var element = document.getElementById('section_default');
            displayBlock(element);
            var element = document.getElementById('section_pro');
            displayNone(element);
            element = document.getElementById('section_client');
            displayNone(element);
        }
    }
}

