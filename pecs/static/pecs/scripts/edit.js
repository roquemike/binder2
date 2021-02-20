/*
POLARBURRR#9201
CS50W 2020 CAPSTONE
*/

$(document).ready(function(){

    // Set Active NavLink in NavBar
    $('.nav-item').removeClass('nav-item active').addClass('nav-item')
    $('#edit').parent().removeClass('nav-item').addClass('nav-item active')
    
    //listener: clicks to input pecs_desc fields
    $("[id^='pecs_desc_']").click(function(){
        $(this).find('input').prop('disabled', false);
        $(this).find('input').focus()
    });

    //listener: focusout to input pecs_desc fields
    $("[id^='pecs_desc_']").focusout(function(){
        $(this).find('input').prop('disabled', true);
    });

    //listener: pecs_desc onchange call edit function
    $("[id^='pecs_desc_']").change(function(){
        pecs_id = $(this).attr("id").split('_').splice(2)
        pecs_desc = $(this).find('input').val().toUpperCase()
        pecs_edit('desc', pecs_desc, pecs_id)
    });

    //listener: tag onchange call edit function
    $("[id^='pecs_tag_']").change(function(){
        pecs_id = $(this).attr("id").split('_').splice(2)
        pecs_edit('tag', $(this).find('select').val(), pecs_id)
    });

    //listener: click delete show confirm alert and delete if confirmed.
    $("[id^='del_']").click(function(){
        pecs_id = $(this).attr("id").split('_').splice(1)
        if (confirm ('This will delete the PECS, are you sure?')){
            $(`#pecs_${pecs_id}`).hide()
            pecs_edit('del', '', pecs_id)
        }
    });

});

function pecs_edit(action, update, pecs_id){
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        "/edit",
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({
            id: pecs_id[0],
            action: action,
            update: update,
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status == 401) {
            window.location = "/"
        } else if (result.count == 0) {
            window.location = "/edit"
        } else if (action == 'desc') {
            $('#pecs_desc_' + pecs_id[0]).find('input').val(update.toUpperCase())
        }
    })
    .catch( error => {
        console.log('Error:', error);
    })
}