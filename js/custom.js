$(function(){
    var multi_line = [];
    $('.page-inner__search .search__input').trigger('input');

    $('a[href="#popup_edit"], a[href="#popup_del"]').on('click', function(){
        let obj = $(this).closest('.section-table__item');
        multi_line = [];
        let param = [];
        param = get_line_param(obj);
        multi_line.push(param);
        let type_action = 'edit';
        if($(this).attr('href')=='#popup_del')type_action = 'del';
        partners_personal_popup(multi_line, type_action);
    });

    $('#action_all').on('click', function(){
        multi_line = [];
        let type_action = $('#select_action_all').val();
        //if(type_action == "edit"){
            $('.section-table__check_item').find('input:checked').each(function(i, obj_input){
                let obj = $(obj_input).closest('.section-table__item');
                param = get_line_param(obj);
                multi_line.push(param);
            });

        //}
        partners_personal_popup(multi_line, type_action);
    });

    $('#popup_del').on('click', '.btn-action', function(){
        $.ajax({
            type: "POST",
            url: "/local/ajax/partners_personal_doc.php?action=del",
            data: {data: multi_line}
        }).done(function( msg ) {
            location.href="";
            //$('#popup_del').removeClass('active');
        });
    });

    $('#popup_edit').on('click', '.btn-action', function(){
        multi_line = [];
        $('#popup_edit').find('textarea').each(function(i, obj){
            let param = {};
            let this_name = $(obj).attr('name');
            let comment = $(obj).val();
            param.id = this_name.replace('comment_', '');
            param.comment = comment;
            multi_line.push(param);
        });

        $.ajax({
            type: "POST",
            url: "/local/ajax/partners_personal_doc.php?action=edit",
            data: {data: multi_line}
        }).done(function( msg ) {
            location.href="";
            //$('#popup_edit').removeClass('active');
        });
    });

    $('#partners_upload_form').on('submit', function () {
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/local/ajax/partners_personal_doc.php?action=add",
            data: { data: data }
        }).done(function( msg ) {
            location.href=msg;
        });
        return false;
    });

    $('#form_partner').on('submit', function(){
        //mfi_files[]
        /*let file = $("input[name='mfi_files[]']").val();
        console.log(file);
        return false;*/
    });

    $('body').on('click', 'a[href="/partners/form/"], a[href="/production/form/"]', function(){
        let this_href = $(this).attr('href');
       let back_url = location.pathname ;
        $.ajax({
            type: "POST",
            url: "/local/ajax/back_url.php",
            data: { back_url: back_url }
        }).done(function(  ) {
            location.href=this_href;
        });
       return false;
    });
});

function get_line_param(obj){
    let param = {};
    param.id = $(obj).attr('data-id');
    param.name = $(obj).attr('data-name');
    param.size = $(obj).attr('data-size');
    param.version = $(obj).attr('data-version');
    param.comment = $(obj).attr('data-comment');
    param.type = $(obj).attr('data-type');
    param.icon = $(obj).attr('data-icon');
    return param;
}
function partners_personal_popup(multi_line, type_action){
    console.log(multi_line);
    if(type_action == "edit"){
        $('#popup_edit').find('.file').html("");
        for (let ind in multi_line){
            $('#popup_edit').find('.file').append('<div class="file__item">\n' +
                '                    <div class="file__icon"><i class="fa '+multi_line[ind]["icon"]+' fa-2x" aria-hidden="true"></i></div>\n' +
                '                    <div class="file__name">'+multi_line[ind]["name"]+'</div>\n' +
                '                    <div class="file__size">'+multi_line[ind]["size"]+'</div>\n' +
                '                    <div class="file__commit">\n' +
                '                        <div class="file__label">Комментарий</div>\n' +
                '                        <textarea name="comment_'+multi_line[ind]["id"]+'" id="" maxlength="350" class="file__textarea" placeholder="Введите комметарий">'+multi_line[ind]["comment"]+'</textarea>\n' +
                '                    </div>\n' +
                '                </div>');
        }
        $('#popup_edit').addClass('active');
    }
    if(type_action == "del"){
        $('#popup_del').find('.file').html("");
        for (let ind in multi_line){
            $('#popup_del').find('.file').append('<div class="file__item">\n' +
                '                    <div class="file__icon"><i class="fa '+multi_line[ind]["icon"]+' fa-2x" aria-hidden="true"></i></div>\n' +
                '                    <div class="file__name">'+multi_line[ind]["name"]+'</div>\n' +
                '                    <div class="file__size">'+multi_line[ind]["size"]+'</div>\n' +
                '                    <div class="file__version">'+multi_line[ind]["version"]+'</div>\n' +
                '                </div>');
        }
        $('#popup_del').addClass('active');
    }
}

