package com.publiccms.service.office.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.publiccms.dao.office.OfficeDao;
import com.publiccms.domain.office.*;
import com.publiccms.service.office.*;
import com.publiccms.domain.system.User;
import com.publiccms.mybatis.Paging;
import com.publiccms.utils.OfficeCheckUtils;
import com.publiccms.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OfficeServiceImpl implements OfficeService {

    @Autowired
    private OfficeDao officeDao;

    @Override
    public Office selectById(Integer id) {
        Office office = officeDao.selectById(id);
        return office;
    }

    @Override
    public List<Office> selectByListPage(Office office, Paging page) {
        return this.officeDao.selectByListPage(office, page);
    }

    @Override
    public List<Office> listAll() {
        return this.officeDao.listAll();
    }

    @Override
    public Integer insert(Office office) {
        this.officeDao.insert(office);
        return office.getId();
    }


    @Override
    public Integer updateById(Office office) {
        return this.officeDao.updateById(office);
    }


    @Override
    public Integer quxiaofabu(Office office) {
        return this.officeDao.updateById(office);
    }


    public Integer suopan(Office office) {
        return this.officeDao.updateById(office);
    }


    @Override
    public Integer deleteById(Integer id) {
        return this.officeDao.deleteById(id);
    }


    /**
     * 插入大楼信息
     */
    public Office insert(String completeTime, Office office, User user) throws Exception {
        //竣工时间
        if (StringUtils.isBlank(completeTime)) {
            office.setTimeOfOf(0);
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(completeTime);
            office.setTimeOfOf((int) (date.getTime() / 1000L));
        }
        //所属人
        office.setAccendantId(user.getId());
        office.setAccendantName(user.getFullname());
        if (StringUtils.isEmpty(office.getStatus())) {
            office.setStatus(0);
        }
        if (StringUtils.isEmpty(office.getLockflag())) {
            office.setLockflag(0);
        }
        OfficeCheckUtils.officeCheck(office);
        officeDao.insert(office);
        return office;
    }

    /**
     * 修改大楼信息
     */

    public Office update(String completeTime, Office office) throws ParseException {
        //竣工时间
        if (StringUtils.isBlank(completeTime)) {
            office.setTimeOfOf(0);
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(completeTime);
            office.setTimeOfOf((int) (date.getTime() / 1000L));
        }
        OfficeCheckUtils.officeCheck(office);
        this.officeDao.updateById(office);
        return office;
    }

    @Override
    public Office selectByName(Office office) {
        return this.officeDao.selectByName(office);
    }

    /**
     * 查询区域所拥有的商圈
     *
     * @param office
     * @param page
     * @return
     */
    public List<Office> selectBuildingsListPage(Office office, Paging page) {
        return officeDao.selectBuildingsListPage(office, page);
    }

    public List<Office> selectNoLockBulidingListPage(Paging page) {
        return officeDao.selectNoLockBulidingListPage(page);
    }


    public Integer updateByofficeId(List<Integer> q) {
        int num = 0;
        for (Integer buildingId : q) {
            Office office = new Office();
            office.setId(buildingId);
            office.setLockflag(1);
            office.setLockflagAt(System.currentTimeMillis());
            num += officeDao.updateByofficeId(office);
        }
        return num;
    }

    /**
     * 获取当前登录用户所有城市权限的大楼信息下拉框数据
     *
     * @param office
     * @return
     */
    public List<Office> getComboDataOfOfficeList(Office office) {
        return officeDao.selectOfficeList(office);
    }

    public Office getOfficeAddData(Office office) throws Exception {
        return officeDao.getOfficeAddData(office);
    }

}

