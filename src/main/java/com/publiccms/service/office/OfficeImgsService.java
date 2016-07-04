package com.publiccms.service.office;

import com.publiccms.domain.office.OfficeImgs;
import com.publiccms.mybatis.Paging;

import java.util.List;

public interface OfficeImgsService {
    public Integer adddes(OfficeImgs officeimgs);

    public OfficeImgs selectById(Integer id);

    public List<OfficeImgs> selectByListPage(OfficeImgs officeimgs, Paging page);

    public List<OfficeImgs> listAll();

    public Integer insert(OfficeImgs officeimgs);

    public Integer updateById(OfficeImgs officeimgs);

    public Integer deleteById(Integer id);

    public List<OfficeImgs> findimgByofficeId(Integer id);

    /**
     * 查询楼盘图片
     *
     * @param id
     * @return
     * @author chenjun 20160428
     */
    public OfficeImgs selectFabuTu(Integer id) throws Exception;
    
    public List<OfficeImgs> selectOfficeImg(OfficeImgs officeImgs);
}

