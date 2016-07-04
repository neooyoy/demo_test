package com.publiccms.service.office.impl;

import com.publiccms.dao.office.OfficeImgsDao;
import com.publiccms.domain.office.OfficeImgs;
import com.publiccms.service.office.OfficeImgsService;
import com.publiccms.mybatis.Paging;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeImgsServiceImpl implements OfficeImgsService {

    @Autowired
    private OfficeImgsDao officeimgsDao;

    @Override
    public OfficeImgs selectById(Integer id) {
        return this.officeimgsDao.selectById(id);
    }

    @Override
    public List<OfficeImgs> selectByListPage(OfficeImgs officeimgs, Paging page) {
        return this.officeimgsDao.selectByListPage(officeimgs, page);
    }

    @Override
    public List<OfficeImgs> listAll() {
        return this.officeimgsDao.listAll();
    }


    @Override
    public Integer insert(OfficeImgs officeimgs) {
        this.officeimgsDao.insert(officeimgs);
        return officeimgs.getId();
    }


    @Override
    public Integer updateById(OfficeImgs officeimgs) {
        return this.officeimgsDao.updateById(officeimgs);
    }


    @Override
    public Integer adddes(OfficeImgs officeimgs) {
        return this.officeimgsDao.updateById(officeimgs);
    }

    @Override
    public Integer deleteById(Integer id) {
        return this.officeimgsDao.deleteById(id);
    }

    @Override
    public List<OfficeImgs> findimgByofficeId(Integer officeId) {
        return this.officeimgsDao.findListByOfficeId(officeId);
    }

    /**
     * 查询楼盘图片
     *
     * @param id
     * @return
     * @author chenjun 20160428
     */
    public OfficeImgs selectFabuTu(Integer id) throws Exception {
        return officeimgsDao.selectFabuTu(id);
    }
    @Override
    public List<OfficeImgs> selectOfficeImg(OfficeImgs officeImgs)
    {
    	return this.officeimgsDao.selectOfficeImg(officeImgs);
    }
}

