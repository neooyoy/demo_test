package com.publiccms.service.infrastructure;

import java.util.List;

import com.publiccms.domain.infrastructure.BusinessCircle;
import com.publiccms.mybatis.Paging;

public interface BusinessCircleService{

	public BusinessCircle selectById(Integer id);
	
	public List<BusinessCircle> selectByListPage(BusinessCircle businesscircle, Paging page);
	
	public List<BusinessCircle> listAll();
    
    public Integer insert(BusinessCircle businesscircle);
    
    public Integer updateById(BusinessCircle businesscircle);
    
    public Integer deleteById(Integer id);

    /**
     * 查询区域所拥有的商圈
     * @param districtId
     * @return
     */
    public List<BusinessCircle> loadBusinessCircleList(Integer districtId);
}

