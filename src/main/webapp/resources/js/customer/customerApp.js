

$(function () {
  var combo_changeAccendantPersonLoadSuccess = function () {
    $('#departmentCombox_moidfyCustomerAccendantUser').combobox('setValue', -1);
}

/**
 * 组织架构change时，重新加载组织架构人员
 */
var departmentComboxChange_changeAccendantPerson = function () {
    var departmentComboxData = $('#departmentCombox_moidfyCustomerAccendantUser').combobox('getData');
    var departmentIdArray = $('#departmentCombox_moidfyCustomerAccendantUser').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0) {
        $("#departmentCombox_moidfyCustomerAccendantUser").combotree("setValues", '');
        $('#departmentCombox_moidfyCustomerAccendantUser').combotree("loadData", "");
        return;
    } else if (departmentIdArray.length > 1) {
        for (var i = 0; i < departmentIdArray.length; i++) {
            if (departmentIdArray[i] != -1) {
                departmentIds += departmentIdArray[i] + ',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length - 1)
    } else {
        if (departmentIdArray[0] == -1) {
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["deptId"] != -1) {
                        departmentIds += data[i]["deptId"] + ',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length - 1)
                
            }
        } else {
            departmentIds = departmentIdArray[0];
           
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == '') {
        return;
    }

    $('#departmentUserComboxTree_moidfyCustomerAccendantUser').combotree({
        queryParams: {
            departmentIds: departmentIds,
            loop: false,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px'
    });
}
});
