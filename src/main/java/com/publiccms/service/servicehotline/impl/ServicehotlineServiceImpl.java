package com.publiccms.service.servicehotline.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.dao.servicehotline.ServicehotlineDao;
import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.mybatis.Paging;
import com.publiccms.service.servicehotline.ServicehotlineService;

@Service
public class ServicehotlineServiceImpl implements ServicehotlineService{

    @Autowired
    private ServicehotlineDao servicehotlineDao;
    
    @Override
    public Servicehotline selectById(Integer id) {
    	return this.servicehotlineDao.selectById(id);
    }
    
    @Override
    public List<Servicehotline> selectByListPage(Servicehotline servicehotline, Paging page) {
    	return this.servicehotlineDao.selectByListPage(servicehotline, page);
    }
    
    @Override
    public List<Servicehotline> listAll() {
    	return this.servicehotlineDao.listAll();
    }
    
    @Override
    public Integer insert(Servicehotline servicehotline) {
    	this.servicehotlineDao.insert(servicehotline);
    	return servicehotline.getId();
    }
    
    @Override
    public Integer updateById(Servicehotline servicehotline) {
    	return this.servicehotlineDao.updateById(servicehotline);
    }
    
    @Override
    public Integer deleteById(Integer id) {
    	return this.servicehotlineDao.deleteById(id);
    }
    @Override
    public List<Servicehotline> selectHotline(Integer type)
    {
    	return this.servicehotlineDao.selectHotline(type);
    }


}

