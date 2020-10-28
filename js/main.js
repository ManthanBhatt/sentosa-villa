document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 500);
    }
};

$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('transparent');
        $('.navbar').addClass('navbar-light');
        $('.navbar').removeClass('navbar-dark');
    } else {
        $('nav').removeClass('transparent');
        $('.navbar').addClass('navbar-dark');
        $('.navbar').removeClass('navbar-light');
    }
});

if ($(document).scrollTop() > 50) {
    $('nav').addClass('transparent');
    $('.navbar').addClass('navbar-light');
    $('.navbar').removeClass('navbar-dark');
} else {
    $('nav').removeClass('transparent');
    $('.navbar').addClass('navbar-dark');
    $('.navbar').removeClass('navbar-light');
}


let version = localStorage.getItem('version');
if (version == "" || version == undefined || version == null) {
    localStorage.setItem('version', '1');
    window.location.reload();
} else if (version != 1) {
    localStorage.setItem('version', '1');
    window.location.reload();
}

let bookNow = () => {
    window.location.href = "https://live.ipms247.com/booking/book-rooms-thesentosavilla";
}

let goToRoom = () => {
    window.location.href = "room.html";
}

let goToGallery = () => {
    window.location.href = "gallery.html";
}

let openImage = (src) => {
    $.magnificPopup.open({
        items: {
            src: src
        },
        type: 'image'
    });
};

$(function () {
    $('[data-toggle="popover"]').popover()
})

let saveEnquiry = () => {
    let name = $('#name').val();
    let email = $('#email').val();
    let mobileNumber = $('#mobileNumber').val();
    let guest = $('#guest').val();
    let accommodation = $('#accommodation').val();
    let message = $('#message').val();
    console.log(mobileNumber);

    if (!name) {
        $('#name').popover({
            trigger: 'focus',
            content: 'Please enter your name',
        });
        $("#name").focus();
        return;
    } else if (!mobileNumber) {
        $('#mobileNumber').popover({
            trigger: 'focus',
            content: 'Please enter your mobile number',
        });
        $("#mobileNumber").focus();
        return;
    } else if (mobileNumber.length != 10) {
        $('#mobileNumber').popover('dispose');
        $('#mobileNumber').popover({
            trigger: 'focus',
            content: 'Please enter valid mobile number',
        });
        $("#mobileNumber").focus();
        return;
    } else if (!guest) {
        $('#guest').popover({
            trigger: 'focus',
            content: 'Please select the number of guests',
        });
        $("#guest").focus();
        return;
    } else if (!accommodation) {
        $('#accommodation').popover({
            trigger: 'focus',
            content: 'Please select the accommodation type',
        });
        $("#accommodation").focus();
        return;
    } else if (!message) {
        $('#message').popover({
            trigger: 'focus',
            content: 'Please enter your message',
        });
        $("#message").focus();
        return;
    }

    $('#booking-btn-text').hide();
    $('#booking-btn').prop('disabled', true);
    $('#spinner-grow').show();
    $.ajax({
        type: "POST",
        url: "http://www.thesentosavilla.com/service/mail-service.php",
        data: JSON.stringify({
            name,
            email,
            mobileNumber,
            guest,
            accommodation,
            message,
            type: 'booking'
        }),
        success: (resp) => {
            console.log('second success');
            console.log(resp);
            $('.booking-form').hide();
            $('#booking-success').show(300);
            $('#booking-btn-text').show();
            $('#booking-btn').prop('disabled', false);
            $('#spinner-grow').hide();
        },
        error: (err) => {
            console.log('error');
            console.log(err);
            $('#booking-btn-text').show();
            $('#booking-btn').prop('disabled', false);
            $('#spinner-grow').hide();
        }
    });
}

let saveContactForm = () => {
    let name = $('#name').val();
    let email = $('#email').val();
    let mobileNumber = $('#mobileNumber').val();
    let subject = $('#subject').val();
    let message = $('#message').val();

    if (!name) {
        $('#name').popover({
            trigger: 'focus',
            content: 'Please enter your name',
        });
        $("#name").focus();
        return;
    } else if (!mobileNumber) {
        $('#mobileNumber').popover({
            trigger: 'focus',
            content: 'Please enter your mobile number',
        });
        $("#mobileNumber").focus();
        return;
    } else if (mobileNumber.length != 10) {
        $('#mobileNumber').popover('dispose');
        $('#mobileNumber').popover({
            trigger: 'focus',
            content: 'Please enter valid mobile number',
        });
        $("#mobileNumber").focus();
        return;
    } else if (!subject) {
        $('#subject').popover({
            trigger: 'focus',
            content: 'Please enter the subject',
        });
        $("#subject").focus();
        return;
    } else if (!message) {
        $('#message').popover({
            trigger: 'focus',
            content: 'Please enter your message',
        });
        $("#message").focus();
        return;
    }

    $('#contact-btn-text').hide();
    $('#contact-btn').prop('disabled', true);
    $('#spinner-grow').show();
    $.ajax({
        type: "POST",
        url: "http://www.thesentosavilla.com/service/mail-service.php",
        data: JSON.stringify({
            name,
            email,
            mobileNumber,
            subject,
            message,
            type: 'contact'
        }),
        success: (resp) => {
            console.log('second success');
            console.log(resp);
            $('.contact-form').hide();
            $('#contact-success').show(300);
            $('#contact-btn-text').show();
            $('#contact-btn').prop('disabled', false);
            $('#spinner-grow').hide();
        },
        error: (err) => {
            console.log('error');
            console.log(err);
            $('#contact-btn-text').show();
            $('#contact-btn').prop('disabled', false);
            $('#spinner-grow').hide();
        }
    });
}

$('#booking-success').hide();
$('#contact-success').hide();
$('#spinner-grow').hide();

var btn = $('#button');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});


$(window).scroll(function () {
    $.each($('img'), function () {
        if ($(this).attr('data-src') && $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100)) {
            var source = $(this).data('src');
            $(this).attr('src', source);
            $(this).removeAttr('data-src');
        }
    })
});
