/*
POLARBURRR#9201
CS50W 2020 CAPSTONE
*/

$(document).ready( function() {
    
    // Set Active NavLink in NavBar
    $('.nav-item').removeClass('nav-item active').addClass('nav-item')
    $('#home').parent().removeClass('nav-item').addClass('nav-item active')

    $('body').css('overflow', 'hidden')

    //this function loads initially the "I WANT" Strip.
    $('#iwant_view').show();
    
    $('#load_pecs').load('/pecs', function() { 
        pecs_listeners()
        pecs_height_resize()        
    });

    // listener: clicks to the I WANT strip tab
    $("#iwant").click( function() {

        $('#iwant_play')[0].play();

        // $('#load_strip').load('/iwant');
        $('#firstthen_view').hide();
        $('#iwant_view').show();
        
        // change active color tab
        $('#iwant').removeClass('strip').addClass('active_strip');
        $('#firstthen').removeClass('active_strip').addClass('strip');

        // make sure that active pecs is the then-box
        active_box('then')
        
    });

    //listener: clicks on the FIRST..THEN strip tab
    $("#firstthen").click( function() {
        $('#firstthen_play')[0].play();
        // $('#load_strip').load('/firstthen');
        $('#iwant_view').hide();
        $('#firstthen_view').show();

        // change active color tab
        $('#firstthen').removeClass('strip').addClass('active_strip');
        $('#iwant').removeClass('active_strip').addClass('strip');

        // make sure that active pecs is the first-box
        active_box('first')
    });

    $('#iwant_div').click( function() {
        $('#iwant_play')[0].play();
    });
    
    $('#iwant_pecs').click( function() {
        $('#iwant_play_pecs')[0].play();
    });

    // listener: clicks on first-box
    $('#first_in').click( function() {
        active_box('first')
        $('#first_play')[0].play();
        $('#first_play').on('ended', () => {
            $('#first_play_pecs')[0].play();
        });
    });
    
    // listener: clicks on then-box
    $('#then_in').click( function() {
        active_box('then')
        $('#then_play')[0].play();
        $('#then_play').on('ended', () => {
            $('#then_play_pecs')[0].play();
        });
    });

    // Listener: change active PECS tabs
    $("[id^='cat_']").click( function() {
        //console.log($(this).val())
        //console.log($(this).prev().attr('id'))
        $(this).prev()[0].play();
        $('#load_pecs').load('/pecs?cat=' + $(this).val(), () => { 
            pecs_listeners()
            pecs_height_resize() 
        });
        $("[id^='cat_']").removeClass('active_cat').addClass('cat');
        $(this).removeClass('cat').addClass('active_cat');
    });
    
    // listener: for window resize, call pecs div resize function.
    $(window).resize(function(){
        pecs_height_resize();
    })

});

function pecs_listeners() {

    $("[id^='pecs_']").click( function(){
        $('.active_pecs').html($(this).html());
        id = $(this).attr("id").split('_').splice(1)
        source="upload/audio/" + id + ".mp3"
        $('.active_audio').attr('src', source);
        $('.active_audio')[0].play();
        if ($('#first_in').hasClass('active_pecs'))
        {
            active_box('then')
        }
    });

    $("[id^='fave_']").click( function(){
        fave($(this).val())
    });
    
}

// calculamte and change the PECS div height

function pecs_height_resize() {
    //console.log($(document).height())
    //console.log($(window).height())
    //console.log($('main').height())
    auto_height = $('#div_pecs').height()
    if ($(document).height() >  $(window).height()) {
        diff = $(document).height() -  $(window).height()
        $('#div_pecs').height(auto_height - diff)
    } else {
        diff = $(window).height() - $('main').height()
        $('#div_pecs').height(auto_height + diff)
    }

}

// play I WANT

function play_iwant(){
    
    $('#iwant_play_alt')[0].play();
    $('#iwant_play_alt').on('ended', function(){
        $('#iwant_play_pecs')[0].play();
    });

}

// play FIRST..THEN 

function play_firstthen(){
    $('#first_play_alt')[0].play();
    $('#first_play_alt').on('ended', function(){
        $('#first_play_pecs_alt')[0].play();
    });
    $('#first_play_pecs_alt').on('ended', function(){
        $('#then_play_alt')[0].play();
    });
    $('#then_play_alt').on('ended', function(){
        $('#then_play_pecs_alt')[0].play();
    });
}

function clear_strips() {
    $('#iwant_pecs').html('<div class="pecs_img_frame d-flex"></div><div>&nbsp;</div>')
    $('#first_in').html('<div class="pecs_img_frame d-flex"></div><div>&nbsp;</div>')
    $('#then_in').html('<div class="pecs_img_frame d-flex"></div><div>&nbsp;</div>')

    active_box('then')
    $("[id$='_play_pecs']").attr('src', "static/pecs/audio/non.mp3");
    $("[id$='_play_pecs_alt']").attr('src', "static/pecs/audio/non.mp3");
}

// function to change the active box on the strip

function active_box(id){

    if (id == 'first') {
        $('#first_in').addClass('active_pecs')
        $("#then_in").removeClass('active_pecs')
        $('#first_play_pecs').addClass('active_audio')
        $('#then_play_pecs').removeClass('active_audio')
        $('#first_play_pecs_alt').addClass('active_audio')
        $('#then_play_pecs_alt').removeClass('active_audio')
    } else if (id == 'then') {
        $('#first_in').removeClass('active_pecs')
        $("#then_in").addClass('active_pecs')
        $('#first_play_pecs').removeClass('active_audio')
        $('#then_play_pecs').addClass('active_audio')
        $('#first_play_pecs_alt').removeClass('active_audio')
        $('#then_play_pecs_alt').addClass('active_audio')
    }

}

function fave(pecs_id) {
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        "/fave",
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({
            id: pecs_id,
        })
    })
    .then(response => response.json())
    .then(result => {
        //console.log(result)
        //console.log($('.active_cat').attr('id'))
        if (result.fave_stat == 'add') {
            $('#fave_' + pecs_id).html('<img class="fave_img" src="static/pecs/images/ff.png">')
        } else {
            $('#fave_' + pecs_id).html('<img class="fave_img" src="static/pecs/images/fa.png">')
        }

    })
    .catch( error => {
        console.log('Error:', error);
    })

}