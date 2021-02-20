$(document).ready(function(){

    $("[id^='pecs_']").click(function(){
        $('.active_pecs').html($(this).html());
        id = $(this).attr("id").split('_').splice(1)
        source="upload/audio/" + id + ".mp3"
        $('.active_audio').attr('src', source);
        $('.active_audio')[0].play();

        if ($('#first_in').hasClass('active_pecs'))
        {
            $('#first_in').removeClass('active_pecs')
            $("#then_in").addClass('active_pecs')
            $('#play1_1').removeClass('active_audio')
            $('#play2_2').addClass('active_audio')
            $('#playFirstPECS').removeClass('active_audio')
            $('#playThenPECS').addClass('active_audio')
        }
    });

});