package com.publiccms.service.infrastructure.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.dao.infrastructure.BusinessCircleDao;
import com.publiccms.domain.infrastructure.BusinessCircle;
import com.publiccms.service.infrastructure.BusinessCircleService;
import com.publiccms.mybatis.Paging;

@Service
public class BusinessCircleServiceImpl implements BusinessCircleService{

    @Autowired
    private BusinessCircleDao businesscircleDao;
    
    @Override
    public BusinessCircle selectById(Integer id) {
    	return this.businesscircleDao.selectById(id);
    }
    
    @Override
    public List<BusinessCircle> selectByListPage(BusinessCircle businesscircle, Paging page) {
    	return this.businesscircleDao.selectByListPage(businesscircle, page);
    }
    
    @Override
    public List<BusinessCircle> listAll() {
    	return this.businesscircleDao.listAll();
    }
    
    @Override
    public Integer insert(BusinessCircle businesscircle) {
    	this.businesscircleDao.insert(businesscircle);
    	return businesscircle.getBusinessCircleId();
    }
    
    @Override
    public Integer updateById(BusinessCircle businesscircle) {
    	return this.businesscircleDao.updateById(businesscircle);
    }
    
    @Override
    public Integer deleteById(Integer id) {
    	return this.businesscircleDao.deleteById(id);
    }

    /**
     * 查询区域所拥有的商圈
     * @param districtId
     * @return
     */
    public List<BusinessCircle> loadBusinessCircleList(Integer districtId){
        return businesscircleDao.loadBusinessCircleList(districtId);
    }

}

