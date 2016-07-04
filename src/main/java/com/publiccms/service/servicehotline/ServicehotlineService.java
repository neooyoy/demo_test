package com.publiccms.service.servicehotline;

import java.util.List;

import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.mybatis.Paging;

public interface ServicehotlineService{

	public Servicehotline selectById(Integer id);
	
	public List<Servicehotline> selectByListPage(Servicehotline servicehotline, Paging page);
	
	public List<Servicehotline> listAll();
    
    public Integer insert(Servicehotline servicehotline);
    
    public Integer updateById(Servicehotline servicehotline);
    
    public Integer deleteById(Integer id);
    
    public List<Servicehotline> selectHotline (Integer type);

}

