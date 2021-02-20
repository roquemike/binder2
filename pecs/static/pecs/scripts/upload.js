

    $(document).ready(function(){
        $('.nav-item').removeClass('nav-item active').addClass('nav-item')
        $('#upload').parent().removeClass('nav-item').addClass('nav-item active')
    
        $("#upload_pecs").click( function(){
            $('#upload_play')[0].play();
        });          
    
    });