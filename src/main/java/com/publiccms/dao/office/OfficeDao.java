package com.publiccms.dao.office;

import com.publiccms.annotation.DataSource;
import com.publiccms.constant.DataSourceConstant;
import com.publiccms.domain.office.Office;
import com.publiccms.mybatis.Paging;
import com.publiccms.mybatis.dao.BaseDao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeDao extends BaseDao<Office> {

    /**
     * 查询楼盘列表
     *
     * @param office
     * @param page
     * @return
     */
    @DataSource("")
    public List<Office> selectBuildingsListPage(@Param("vo") Office office, @Param("page") Paging page);

    /**
     * 根据大楼名称查询大楼.
     *
     * @param name
     * @return
     */
    @DataSource("")
    public Office selectByName(Office office);

    /**
     * 根据大楼ID获取大楼所在城市
     *
     * @return
     */
    @DataSource("")
    public Integer selectCityIdById(int id);

    /**
     *
     */
    @DataSource(DataSourceConstant.MASTERDATASOURCE)
    public Integer deleteBuildingRoundById(Integer officeId);

    @DataSource("")
    public List<Office> selectNoLockBulidingListPage(@Param("page") Paging page);

    @DataSource(DataSourceConstant.MASTERDATASOURCE)
    public Integer updateByofficeId(Office office);

    /**
     * 获取当前登录用户所有城市权限的大楼信息下拉框数据
     *
     * @param office
     * @return
     */
    @DataSource("")
    public List<Office> selectOfficeList(Office office);

    @DataSource(DataSourceConstant.MASTERDATASOURCE)
    public void increaseHouseCount(Office office);

    @DataSource(DataSourceConstant.MASTERDATASOURCE)
    public void decreaseHouseCount(Office office);

    @DataSource("")
    public Office getOfficeAddData(Office office);
}

