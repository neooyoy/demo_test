package com.publiccms.service.infrastructure;

import java.util.List;

import com.publiccms.domain.infrastructure.District;
import com.publiccms.mybatis.Paging;

public interface DistrictService{

	public District selectById(Integer id);
	
	public List<District> selectByListPage(District district, Paging page);
	
	public List<District> listAll();
    
    public Integer insert(District district);
    
    public Integer updateById(District district);
    
    public Integer deleteById(Integer id);

    /**
     * 查询城市所拥有的区域
     * @param cityId
     * @return
     */
    public List<District> loadDistrictList(Integer cityId);
}

