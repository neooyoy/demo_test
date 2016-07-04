package com.publiccms.dao.servicehotline;

import java.util.List;

import org.jboss.logging.Param;
import org.springframework.stereotype.Repository;

import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.mybatis.dao.BaseDao;

@Repository
public interface ServicehotlineDao extends BaseDao<Servicehotline>{
    public List<Servicehotline> selectHotline(Integer type);
}

