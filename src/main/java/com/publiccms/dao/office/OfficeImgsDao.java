package com.publiccms.dao.office;

import com.publiccms.annotation.DataSource;
import com.publiccms.domain.office.OfficeImgs;
import com.publiccms.mybatis.dao.BaseDao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeImgsDao extends BaseDao<OfficeImgs> {
    public List<OfficeImgs> findListByOfficeId(Integer officeId);

    /**
     * 查询楼盘图片
     *
     * @param id
     * @return
     * @author chenjun 20160428
     */
    @DataSource("")
    public OfficeImgs selectFabuTu(Integer id);
    
    @DataSource("")
     public List<OfficeImgs >selectOfficeImg(@Param("vo") OfficeImgs  officeImgs);
}

