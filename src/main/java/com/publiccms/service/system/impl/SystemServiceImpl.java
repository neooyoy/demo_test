package com.publiccms.service.system.impl;

import com.publiccms.dao.system.UserDao;
import com.publiccms.dao.system.UserRoleDao;
import com.publiccms.domain.system.User;
import com.publiccms.domain.system.UserRole;
import com.publiccms.mybatis.Paging;
import com.publiccms.service.system.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemServiceImpl implements SystemService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserRoleDao userRoleDao;

    /**
     * 查询角色的总人数
     *
     * @param roldId
     * @return
     * @author chenjun 20160628
     */
    public Long getRolePersonCount(Integer roldId) throws Exception {
        return userDao.selectRolePersonCount(roldId);
    }

    /**
     * 查询人员列表
     *
     * @param user
     * @param page
     * @return
     * @throws Exception
     * @author chenjun 20160628
     */
    public List<User> getUserList(User user, Paging page) throws Exception {
        return userDao.selectListPage(user, page);
    }

    /**
     * 根据用户登录名查询用户数
     *
     * @param loginname
     * @return
     * @throws Exception
     * @author chenjun 20160629
     */
    public Long countUserByLoginname(String loginname) throws Exception {
        return userDao.selectCountUserByLoginname(loginname);
    }

    /**
     * 新增用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author chenjun
     */
    public Integer insertUser(User user) throws Exception {
        return userDao.insert(user);
    }

    /**
     * 修改/删除用户用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author chenjun
     */
    public void modifyUser(User user) throws Exception {
        userDao.updateById(user);
    }

    /**
     * 修改用户角色
     *
     * @param userRole
     * @throws Exception
     * @author chenjun 20160629
     */
    public void insertUserRoleByUserId(UserRole userRole) throws Exception {
        userRoleDao.insert(userRole);
    }

    /**
     * 修改用户角色
     *
     * @param userRole
     * @throws Exception
     * @author chenjun 20160629
     */
    public void updateUserRoleByUserId(UserRole userRole) throws Exception {
        userRoleDao.updateByUserId(userRole);
    }

    /**
     * 查询用户角色
     *
     * @param userId
     * @throws Exception
     * @author chenjun 20160629
     */
    public UserRole selectByUserId(Integer userId) throws Exception {
        return userRoleDao.selectByUserId(userId);
    }

    /**
     * 根据用户登录名查询用户
     *
     * @param loginname
     * @return
     * @author chenjun 20160629
     */
    public User selectByLoginname(String loginname){
        return userDao.selectByLoginname(loginname);
    }


    /**
     * 查询用户
     *
     * @param userId
     * @throws Exception
     * @author chenjun 20160629
     */
    public User selectUserById(Integer userId) throws Exception{
        return userDao.selectById(userId);
    }
}