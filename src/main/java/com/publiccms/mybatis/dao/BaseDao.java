package com.publiccms.mybatis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.publiccms.annotation.DataSource;
import com.publiccms.constant.DataSourceConstant;
import com.publiccms.mybatis.Paging;
import com.publiccms.mybatis.domain.BaseDomain;
@Repository
public interface BaseDao<T extends BaseDomain> {
    /**
     * 插入
     * @param t
     * @return
     */
    @DataSource(DataSourceConstant.MASTERDATASOURCE)
	public int insert(T t);
    /**
     * 删除
     * @param id
     * @return
     */
    @DataSource(DataSourceConstant.MASTERDATASOURCE)
	public int deleteById(Integer id);
	/**
	 * 更新
	 * @param t
	 * @return
	 */
    @DataSource(DataSourceConstant.MASTERDATASOURCE)
	public int updateById(T t);
	/**
	 * 查询
	 * @param id
	 * @return
	 */
    @DataSource("")
	public T selectById(Integer id);
	/**
	 * 分页查询
	 * @param t
	 * @param page
	 * @return
	 */
    @DataSource("")
	public List<T> selectByListPage(@Param("vo")T t, @Param("page")Paging page);
	/**
	 * 查询集合
	 * @return
	 */
    @DataSource("")
	public List<T> listAll();
	/**
	 * 
	 * @param t
	 * @return
	 */
    @DataSource("")
	public int selectCountByPage(T t);
}