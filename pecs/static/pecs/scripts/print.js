/*
POLARBURRR#9201
CS50W 2020 CAPSTONE
*/

        $(document).ready(function(){

            $('.nav-item').removeClass('nav-item active').addClass('nav-item')
            $('#print_pecs').parent().removeClass('nav-item').addClass('nav-item active')

            $('input').click(function(evt) {
                if (evt.target.checked) {
                    $('#p_pecs_'+evt.target.value).removeClass('d-print-none')
                } else {
                    $('#p_pecs_'+evt.target.value).addClass('d-print-none')
                }
            })

        });

        function select_all() {
            $("[id^='p_pecs_']").removeClass('d-print-none')
            $('input').prop('checked', true)
        }

        function select_none() {
            $("[id^='p_pecs_']").addClass('d-print-none')
            $('input').prop('checked', false)
        }

        function change_size() {
            if ($("[id^='pecs_contents']").hasClass('p_pecs_x2')) {
                $("[id^='pecs_contents']").removeClass('p_pecs_x2').addClass('p_pecs_x1')
                $("[id^='pecs_frame_']").removeClass('p_pecs_frame_x2').addClass('p_pecs_frame_x1')
                $("[id^='pecs_img_']").removeClass('p_pecs_img_x2').addClass('p_pecs_img_x1')
                $("[id^='pecs_desc_']").removeClass('p_pecs_desc_x2').addClass('p_pecs_desc_x1')
                $('#pecs_size').html('[1x1]')
            } else {
                $("[id^='pecs_contents']").removeClass('p_pecs_x1').addClass('p_pecs_x2')
                $("[id^='pecs_frame_']").removeClass('p_pecs_frame_x1').addClass('p_pecs_frame_x2')
                $("[id^='pecs_img_']").removeClass('p_pecs_img_x1').addClass('p_pecs_img_x2')
                $("[id^='pecs_desc_']").removeClass('p_pecs_desc_x1').addClass('p_pecs_desc_x2')
                $('#pecs_size').html('[2x2]')
            }
        }