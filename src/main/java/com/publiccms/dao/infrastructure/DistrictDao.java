package com.publiccms.dao.infrastructure;

import com.publiccms.annotation.DataSource;
import com.publiccms.domain.infrastructure.District;
import com.publiccms.mybatis.dao.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictDao extends BaseDao<District>{
    /**
     * 查询城市所拥有的区域
     * @param cityId
     * @return
     */
    @DataSource("")
    public List<District> loadDistrictList(Integer cityId);
}

