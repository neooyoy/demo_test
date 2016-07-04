package com.publiccms.dao.partners;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.publiccms.domain.partners.Partners;
import com.publiccms.mybatis.dao.BaseDao;

@Repository
public interface PartnersDao extends BaseDao<Partners>{
    public List<Partners>selectPublishPartners();
}

