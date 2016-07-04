package com.publiccms.service.infrastructure.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.service.infrastructure.CityService;
import com.publiccms.dao.infrastructure.CityDao;
import com.publiccms.domain.infrastructure.City;
import com.publiccms.mybatis.Paging;

@Service
public class CityServiceImpl implements CityService{

    @Autowired
    private CityDao cityDao;
    
    @Override
    public City selectById(Integer id) {
    	return this.cityDao.selectById(id);
    }
    
    @Override
    public List<City> selectByListPage(City city, Paging page) {
    	return this.cityDao.selectByListPage(city, page);
    }
    
    @Override
    public List<City> listAll() {
    	return this.cityDao.listAll();
    }
    
    @Override
    public Integer insert(City city) {
    	this.cityDao.insert(city);
    	return city.getCityId();
    }
    
    @Override
    public Integer updateById(City city) {
    	return this.cityDao.updateById(city);
    }
    
    @Override
    public Integer deleteById(Integer id) {
    	return this.cityDao.deleteById(id);
    }
    
}

