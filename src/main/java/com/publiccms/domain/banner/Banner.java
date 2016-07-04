package com.publiccms.domain.banner;

import com.publiccms.mybatis.domain.BaseDomain;

public class Banner extends BaseDomain {

	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	private Integer id;
	/**
	 * 名字
	 */
	private String name;
	/**
	 * 连接地址
	 */
	private String link;
	/**
	 * 0不展示,1展示
	 */
	private Integer status;
	/**
	 * 0未删除1删除
	 */
	private Integer isdelete;
	/**
	 * 跳转连接
	 */
	private String jumpLink;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(Integer isdelete) {
		this.isdelete = isdelete;
	}

	public String getJumpLink() {
		return jumpLink;
	}

	public void setJumpLink(String jumpLink) {
		this.jumpLink = jumpLink;
	}

}
