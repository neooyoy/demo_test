package com.publiccms.service.infrastructure.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.dao.infrastructure.DistrictDao;
import com.publiccms.domain.infrastructure.District;
import com.publiccms.service.infrastructure.DistrictService;
import com.publiccms.mybatis.Paging;

@Service
public class DistrictServiceImpl implements DistrictService{

    @Autowired
    private DistrictDao districtDao;
    
    @Override
    public District selectById(Integer id) {
    	return this.districtDao.selectById(id);
    }
    
    @Override
    public List<District> selectByListPage(District district, Paging page) {
    	return this.districtDao.selectByListPage(district, page);
    }
    
    @Override
    public List<District> listAll() {
    	return this.districtDao.listAll();
    }
    
    @Override
    public Integer insert(District district) {
    	this.districtDao.insert(district);
    	return district.getDistrictId();
    }
    
    @Override
    public Integer updateById(District district) {
    	return this.districtDao.updateById(district);
    }
    
    @Override
    public Integer deleteById(Integer id) {
    	return this.districtDao.deleteById(id);
    }

    /**
     * 查询城市所拥有的区域
     * @param cityId
     * @return
     */
    public List<District> loadDistrictList(Integer cityId){
        return districtDao.loadDistrictList(cityId);
    }
    
}

