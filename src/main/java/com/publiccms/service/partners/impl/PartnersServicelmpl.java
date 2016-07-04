package com.publiccms.service.partners.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.dao.partners.PartnersDao;
import com.publiccms.domain.partners.Partners;
import com.publiccms.service.partners.PartnersService;
@Service
public  class PartnersServicelmpl implements PartnersService{
	@Autowired
	private PartnersDao partnersDao;
	@Override
	public Integer insert(Partners partners)
	{
		return this.partnersDao.insert(partners);
	}
	@Override
	public List<Partners> listAll()
	{
		return this.partnersDao.listAll();
	}
	@Override
	public Integer updateById(Partners partners)
	{   partners.setStatus(1);
		return this.partnersDao.updateById(partners);
	}
	@Override
	public Integer partnerscanel(Partners partners)
	{   partners.setStatus(0);
		return this.partnersDao.updateById(partners);
	}
	@Override
	public Integer partnersupdate(Partners partners)
	{  
		return this.partnersDao.updateById(partners);
	}
	@Override
	public Integer partnersdelete(Partners partners)
	{    partners.setIsdelete(1);
		return this.partnersDao.updateById(partners);
	}
	@Override
	public List<Partners> selectPublishPartners()
	{
		return this.partnersDao.selectPublishPartners();
	}
	
}

