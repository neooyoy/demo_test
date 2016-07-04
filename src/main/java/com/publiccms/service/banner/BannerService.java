package com.publiccms.service.banner;

import java.util.List;

import com.publiccms.domain.banner.Banner;
import com.publiccms.domain.servicehotline.Servicehotline;

public interface BannerService {
	
	public List<Banner> listAll();
	
	public Integer insert(Banner banner);
	public Integer updateById(Banner banner);
	public Integer canelBanner(Banner banner);
	public Integer bannerUpate(Banner banner);
	public Integer bannerDelete(Banner banner);
	public List<Banner> listPublishAll();
}
