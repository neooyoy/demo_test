package com.publiccms.service.banner.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.publiccms.dao.banner.BannerDao;
import com.publiccms.domain.banner.Banner;
import com.publiccms.service.banner.BannerService;
@Service
public class BannerServiceImpl implements BannerService {
	@Autowired
	private BannerDao bannerDao;
	@Override
	public List<Banner> listAll()
	{
		return bannerDao.listAll();
	}
    @Override
    public Integer insert(Banner banner)
    {
    	return bannerDao.insert(banner);
    }
    @Override
    public Integer updateById(Banner banner)
    {     banner.setStatus(1);
    	return bannerDao.updateById(banner);
    }
    @Override
    public Integer canelBanner(Banner banner)
    {     banner.setStatus(0);
    	return bannerDao.updateById(banner);
    }
    @Override
    public Integer bannerUpate(Banner banner)
    {     
    	return bannerDao.updateById(banner);
    }
    @Override
    public Integer bannerDelete(Banner banner)
    {     banner.setIsdelete(1);
    	return bannerDao.updateById(banner);
    }
    @Override
    public List<Banner> listPublishAll()
    {   
    	return bannerDao.listPublishAll();
    }
    
}
