package com.publiccms.service.office;

//import com.publiccms.beans.office.OfficeSearchBean;
//import com.publiccms.beans.office.OfficeSearchResultBean;

import com.publiccms.domain.office.Office;
import com.publiccms.domain.system.User;
import com.publiccms.mybatis.Paging;

import java.text.ParseException;
import java.util.List;

public interface OfficeService {
    public Integer quxiaofabu(Office office);

    public Integer suopan(Office office);

    public Office selectById(Integer id);

    public List<Office> selectByListPage(Office office, Paging page);

    public List<Office> listAll();

    public Integer insert(Office office);

    public Integer updateById(Office office);


    public Integer deleteById(Integer id);

    public Office insert(String completeTime, Office office, User user) throws Exception;

    public Office update(String completeTime, Office office) throws ParseException;

    public Office selectByName(Office office);

    /**
     * 查询区域所拥有的商圈
     *
     * @param office
     * @param page
     * @return
     */
    public List<Office> selectBuildingsListPage(Office office, Paging page);

    public List<Office> selectNoLockBulidingListPage(Paging page);

    public Integer updateByofficeId(List<Integer> q);

    /**
     * 获取当前登录用户所有城市权限的大楼信息下拉框数据
     *
     * @param office
     * @return
     */
    public List<Office> getComboDataOfOfficeList(Office office);


    public Office getOfficeAddData(Office office) throws Exception;

}

