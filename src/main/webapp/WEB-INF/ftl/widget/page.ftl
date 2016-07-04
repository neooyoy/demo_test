<#--
分页查询
-->
[#macro page value]
	<div class="text-center">
    	<ul class="pagination">
    		<li><a href="#">共  ${value.totalResults} 条记录</a></li>
        	<li><a href="javascript:goPage('${value.firstPage}');"">首页</a></li>
        	[#if value.currentPage!=value.firstPage]
        	<li><a href="javascript:goPage('${value.prelinkPage}');""> &lt;上一页</a></li>
        	[/#if]
        	[#list value.listPage as lp]
        		[#if lp == value.currentPage]
        			<li class="active"><a href="javascript:goPage('${lp}');"">${lp}</a></li>
        		[#else]
        			<li><a href="javascript:goPage('${lp}');"">${lp}</a></li>
        		[/#if]
        	[/#list]
        	[#if value.currentPage!=value.lastPage]
            <li><a href="javascript:goPage('${value.postlinkPage}');"">下一页 &gt;</a></li>
            [/#if]
            <li><a href="javascript:goPage('${value.lastPage}');"">末页 &gt;&gt;</a></li>
        </ul>
    </div>
    <script type="text/javascript">
	function goPage(pageNo) {
		try{
			var tableForm = document.getElementById('queryForm');
			$("input[name=currentPage]").val(pageNo);
			tableForm.onsubmit=null;
			tableForm.submit();
		} catch(e) {
			alert('goPage(pageNo)方法出错');
		}
	}
</script>
[/#macro]
