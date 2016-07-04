<#--
导出列表
-->
[#macro export formId="" menuCode=""]
	<button id="systemExportReport" onclick="systemExportReportF('${formId}', '${menuCode}');" type="button" value="导出" class="btn btn-default">
		<i class="glyphicon glyphicon-export"></i>
		导出
	</button>
	<script type="text/javascript">
		function systemExportReportF(formId, menuCode){
	    	var oldAction = $('form').attr('action');
	    	var exportForm = document.getElementById(formId);
	    	$('#' + formId).attr("action", base + "/exportReportController/systemExportReport/" + menuCode);
	    	exportForm.onsubmit=null;
	    	exportForm.submit();
	    	$('#' + formId).attr("action", oldAction);
	    }
	</script>
[/#macro]