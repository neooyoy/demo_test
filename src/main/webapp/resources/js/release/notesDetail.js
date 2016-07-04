$(function(){
    $('#form').formValidation({
        err: {
            container: 'tooltip'
        },
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            urlId: {
                validators: {
                    between:{
                        max:99999999999999,
                        min:1,
                        message: '请选择版本说明分类'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: '版本名称不能为空'
                    }
                }
            },
            developer:{
                validators:{
                    notEmpty: {
                        message: '开发人员不能为空'
                    }
                }
            },
            notes:{
                validators:{
                    notEmpty: {
                        message: '版本更新内容不能为空'
                    }
                }
            }
        }
    }).on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();
        var form = $(e.target);
        console.log(form.attr("action"))
        $.ajax({
            url: base + '/release/editReleaseNotes',
            type: 'post',
            data: $('#form').serialize(),
            success: function (data) {
                if (data!=null&&data>0) {
                    $('#msgModal p').text('操作成功').css('color', 'green');
                    $('#msgModal').modal('show');
                    setTimeout(function () {
                        location.href = base + '/release/list.html';
                    }, 1000);
                }
            }
        })
    });

})

function submitform(){
    $("#form").attr("action",base+'/release/editReleaseNotes');
}
