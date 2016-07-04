$(function(){
    var urlPath  = window.location.pathname.replace("/crm","");
    $('#releaseUrlCode').val(urlPath);
    $('#versionUpdateBtn').click(function(){
        var attr = $('#releaseNotesShow').attr('data-id');
        if(attr=='no'){
            var urlCode = $('#releaseUrlCode').val();
            $.ajax({
                url: base + '/release/releaseNotesList',
                type: 'post',
                async: 'false',
                data: {"urlCode":urlCode},
                success: function (map) {
                    if(map.releaseUrl){
                        $('#urlParentid').val(map.releaseUrl.parentid);
                    }
                    if(map.releaseNotesList&&map.releaseNotesList.length>0){
                        $('#releaseNotesShow').attr('data-id', '');
                        var releaseNotesList = map.releaseNotesList;
                        var mgmtUser = map.mgmtUser;
                        $('#releaseNotesShow').empty();
                        for(var i=0;i<releaseNotesList.length;i++){
                            var releaseNotes = releaseNotesList[i];
                            var display = '';
                            if(i>=1){
                                display = 'hide';
                            }
                            var notesList=new Array()
                            notesList = releaseNotes.notes.split("\n");
                            var notes = '';
                            for(var j=0;j<notesList.length;j++){
                                notes += '<dd style="text-indent: 2em;line-height: 25px;font-size: 14px;word-break: break-all;">'+notesList[j]+'</dd>';
                            }
                            var html = '<div class="versionUpdate-wrap '+display+'">'+
                                '<div class="versionUpdate-content mbm"><em class="marks"></em>'+dateMinuteToDate(releaseNotes.createAt)+'</div>';

                            if(mgmtUser.jobcategory==2){//判断为研发部门
                                html+='<b>'+releaseNotes.name+'</b>'+
                                    '<dl class="mbm"><dt class="mvs">[开发者：'+releaseNotes.developer+']</dt>'+
                                notes+'<dd>'+
                                '<b class="pull-right mbm">录入人：'+releaseNotes.createName+'</b></dd></dl>'+
                                '<div class="clearfix"></div></div>';
                            }else{
                                html +='<dl class="mbm">'+ notes+'</dl><div class="clearfix"></div></div>';
                            }
                            $('#releaseNotesShow').append(html);
                        }
                        if(releaseNotesList.length>1){
                            $('#showMoreNotes').parent().removeClass('hide');
                        }
                    }

                }
            })
        }
        $('#versionUpdate').modal('show');
    })

    $('#showMoreNotes').click(function(){
        $('#showMoreNotes').hide();
        $('.versionUpdate-wrap').removeClass('hide');
    });

})

