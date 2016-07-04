package com.publiccms.dao.banner;



import org.springframework.stereotype.Repository;

import com.publiccms.annotation.DataSource;
import com.publiccms.domain.banner.Banner;
import com.publiccms.mybatis.dao.BaseDao;
import java.util.List;

@Repository
public interface BannerDao extends BaseDao<Banner>{
  @DataSource("")
   public List <Banner> listPublishAll();
    
}

