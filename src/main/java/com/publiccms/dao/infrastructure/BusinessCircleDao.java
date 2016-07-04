package com.publiccms.dao.infrastructure;

import com.publiccms.annotation.DataSource;
import com.publiccms.domain.infrastructure.BusinessCircle;
import com.publiccms.mybatis.dao.BaseDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessCircleDao extends BaseDao<BusinessCircle>{
    /**
     * 查询区域所拥有的商圈
     * @param districtId
     * @return
     */
    @DataSource("")
    public List<BusinessCircle> loadBusinessCircleList(Integer districtId);

}

