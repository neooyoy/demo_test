package com.publiccms.service.infrastructure;

import java.util.List;

import com.publiccms.domain.infrastructure.City;
import com.publiccms.mybatis.Paging;

public interface CityService{

	public City selectById(Integer id);
	
	public List<City> selectByListPage(City city, Paging page);
	
	public List<City> listAll();
    
    public Integer insert(City city);
    
    public Integer updateById(City city);
    
    public Integer deleteById(Integer id);

}

