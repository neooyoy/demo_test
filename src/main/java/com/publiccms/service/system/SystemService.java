package com.publiccms.service.system;

import com.publiccms.domain.system.User;
import com.publiccms.domain.system.UserRole;
import com.publiccms.mybatis.Paging;

import java.util.List;

public interface SystemService {
    /**
     * 查询角色的总人数
     *
     * @param roldId
     * @return
     * @author chenjun 20160628
     */
    public Long getRolePersonCount(Integer roldId) throws Exception;

    /**
     * 查询人员列表
     *
     * @param user
     * @param page
     * @return
     * @throws Exception
     * @author chenjun 20160628
     */
    public List<User> getUserList(User user, Paging page) throws Exception;

    /**
     * 根据用户登录名查询用户数
     *
     * @param loginname
     * @return
     * @throws Exception
     * @author chenjun 20160629
     */
    public Long countUserByLoginname(String loginname) throws Exception;

    /**
     * 新增用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author chenjun
     */
    public Integer insertUser(User user) throws Exception;

    /**
     * 修改/删除用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author chenjun
     */
    public void modifyUser(User user) throws Exception;

    /**
     * 修改用户角色
     *
     * @param userRole
     * @throws Exception
     * @author chenjun 20160629
     */
    public void insertUserRoleByUserId(UserRole userRole) throws Exception;

    /**
     * 修改用户角色
     *
     * @param userRole
     * @throws Exception
     * @author chenjun 20160629
     */
    public void updateUserRoleByUserId(UserRole userRole) throws Exception;

    /**
     * 查询用户角色
     *
     * @param userId
     * @throws Exception
     * @author chenjun 20160629
     */
    public UserRole selectByUserId(Integer userId) throws Exception;

    /**
     * 根据用户登录名查询用户
     *
     * @param loginname
     * @return
     * @author chenjun 20160629
     */
    public User selectByLoginname(String loginname);

    /**
     * 查询用户
     *
     * @param userId
     * @throws Exception
     * @author chenjun 20160629
     */
    public User selectUserById(Integer userId) throws Exception;

}
