package com.publiccms.domain.office;

import com.publiccms.mybatis.domain.BaseDomain;

public class Office extends BaseDomain {

	private static final long serialVersionUID = 1L;
	/**
	 * 房产标识
	 */
	private Integer id;
	/**
	 * 锁盘时间
	 */
	private Long lockflagAt;
	/**
	 * 楼盘名称
	 */
	private String name;
	/**
	 * 楼盘英文名称
	 */
	private String nameEn;
	/**
	 * spell name 大楼名称拼音（全拼）
	 */
	private String nameSp;
	/**
	 * first letter name 大楼首字母名称
	 */
	private String nameFl;
	/**
	 * 0未发布，1已发布，2全部
	 */
	private Integer status;
	/**
	 * 大楼发布时间
	 */
	private Integer publishDate;
	/**
	 * 锁盘标识0未锁,1锁
	 */
	private Integer lockflag;
	/**
	 * 是否是大客户部的。 默认 0 不是，允许录入 1 不允许
	 */
	private Integer allowToCreateHouse;
	/**
	 * 图片数量(触发器更改)
	 */
	private Integer imgCount;
	/**
	 * 0不优先 1优先。暂时没用
	 */
	private Integer priority;
	/**
	 * 热度.暂时没用
	 */
	private Integer hot;
	/**
	 * 城市id
	 */
	private Integer cityId;
	/**
	 * 城市名
	 */
	private String cityName;
	/**
	 * 商圈id
	 */
	private Integer circleId;
	/**
	 * 商圈
	 */
	private String circleName;
	/**
	 * 区域id
	 */
	private Integer districtId;
	/**
	 * 区域名称
	 */
	private String districtName;
	/**
	 * 详细地址
	 */
	private String address;
	/**
	 * 东经
	 */
	private Double mapX;
	/**
	 * 北纬
	 */
	private Double mapY;
	/**
	 * 所属人
	 */
	private Integer accendantId;
	/**
	 * 所属人
	 */
	private String accendantName;
	/**
	 * 物业类型
	 */
	private String managementType;
	/**
	 * 物业等级
	 */
	private String managementLevel;
	/**
	 * 物业管理公司
	 */
	private String managementCompany;
	/**
	 * 物业管理费,每平米
	 */
	private String managementMoney;
	/**
	 * 0，1大业主， 2小业主， 3大业主+小业主
	 */
	private Integer investorType;
	/**
	 * 业主名称，可以是公司名
	 */
	private String investor;
	/**
	 * 业主代表，是指定人
	 */
	private String investorContact;
	/**
	 * 业主代表电话
	 */
	private String investorContactphone;
	/**
	 * 业主代表职位
	 */
	private String investorJob;
	/**
	 * 开发商
	 */
	private String developerCompany;
	/**
	 * 代理商
	 */
	private String agentCompany;
	/**
	 * 租售热线
	 */
	private String tel;
	/**
	 * 设计单位
	 */
	private String designCompany;
	/**
	 * 施工单位
	 */
	private String constructionCompany;
	/**
	 * 竣工时间,unixtime
	 */
	private Integer timeOfOf;
	/**
	 * 标准层高
	 */
	private String standardHeight;
	/**
	 * 占地面积,平方米
	 */
	private String landAreasize;
	/**
	 * 总面积，平方米
	 */
	private String totalAreasize;
	/**
	 * 大楼高度,米
	 */
	private String buildingHeight;
	/**
	 * 标准层面积，平方米
	 */
	private String floorAreasize;
	/**
	 * 得房率,百分比
	 */
	private Double constructionRatio;
	/**
	 * 地上楼层数
	 */
	private Integer groundfloor;
	/**
	 * 地下楼层数
	 */
	private Integer undergroundfloor;
	/**
	 * 容积率,百分比
	 */
	private String plotRatio;
	/**
	 * 净层高，米
	 */
	private String floorHeight;
	/**
	 * 均价
	 */
	private String price;
	/**
	 * 可租售面积
	 */
	private String remainderArea;
	/**
	 * 特色描述
	 */
	private String description;
	/**
	 * 艺术描述
	 */
	private String artremark;
	/**
	 * 入住行业1
	 */
	private Integer customcatagory1;
	/**
	 * 入住行业2
	 */
	private Integer customcatagory2;
	/**
	 * 入住行业3
	 */
	private Integer customcatagory3;
	/**
	 * 绿化率，百分比
	 */
	private String greeningRatio;
	/**
	 * 停车位，个
	 */
	private Integer parkingCount;
	/**
	 * 停车费用，元
	 */
	private String parkingFees;
	/**
	 * 电梯品牌
	 */
	private String liftBrand;
	/**
	 * 电梯分区
	 */
	private String liftPartition;
	/**
	 * 电梯数量
	 */
	private String liftCount;
	/**
	 * 货梯数
	 */
	private String goodsliftcount;
	/**
	 * 空调品牌
	 */
	private String airconditionerBrand;
	/**
	 * 空调数量
	 */
	private String airconditionerCount;
	/**
	 * 空调开放时间
	 */
	private String airconditionerOpen;
	/**
	 * 空调系统
	 */
	private String airconditionerSystem;
	/**
	 * 加时空调费用
	 */
	private String airconditionerOvertimebill;
	/**
	 * 大堂挑高
	 */
	private String lobbyheight;
	/**
	 * 电话费用
	 */
	private String phonebill;
	/**
	 * 卫生间
	 */
	private String bathroom;
	/**
	 * 外墙
	 */
	private String outerWall;
	/**
	 * 公共走道
	 */
	private String porch;
	/**
	 * 网络通讯系统
	 */
	private String netsystem;
	/**
	 * 新风系统
	 */
	private String aerationSystem;
	/**
	 * 卫星电视
	 */
	private String satellite;
	/**
	 * 换气窗
	 */
	private String vent;
	/**
	 * 智能设备
	 */
	private String smartdevices;

	/**
	 * 是否满租，1在租，2满租，0未知
	 */
	private Integer isfull;

	/**
	 *是否已核实锁盘信息，1核实通过，2核实未通过，0是未核实
	 */
	private Integer lockChecked;

	/**
	 * 房源数量
     */
	private Integer houseCount;

	/**
	 * 是否有责任人 1是，2否
	 */
	private Integer hasAudit;

	/**
	 * 责任人姓名
	 */
	private String auditpersonName;

	private  Integer deliverDate;

	public  Integer getDeliverDate(){
		return  deliverDate;
	}

	public  void  setDeliverDate(Integer deliverDate)
	{
		this.deliverDate=deliverDate;
	}

	/**
	 * 锁盘核实人id
	 */
	private Integer lockCheckedId;

	/**
	 * 锁盘核实时间
	 */
	private Integer lockCheckedAt;

	/**
	 * 是否满租核实人id
	 */
	private Integer isfullCheckedId;

	/**
	 * 是否满租核实时间
	 */
	private Integer isfullCheckedAt;

	/**
	 * 控盘数
	 */
	private Integer kongpanNumber;

	/**
	 * 锁盘数
	 */
	private Integer lockNumber;

	/**
	 * 锁盘核实人姓名
	 */
	private String lockCheckedName;

	/**
	 * 是否满租核实人姓名
	 */
	private String isfullCheckedName;

	/**
	 * 首层层高，米
	 */
	private Double firstFloorHeight;

	/**
	 * 开发商介绍
	 */
	private String developerIntroduction;

	public Integer getHouseCount() {
		return houseCount;
	}

	public void setHouseCount(Integer houseCount) {
		this.houseCount = houseCount;
	}

	public Integer getIsfull() {
		return isfull;
	}

	public void setIsfull(Integer isfull) {
		this.isfull = isfull;
	}

	public Integer getLockChecked() {
		return lockChecked;
	}

	public void setLockChecked(Integer lockChecked) {
		this.lockChecked = lockChecked;
	}

	//私有属性
	private String officeId;
	private String cityIds;
	private String imgpath;

	private String officeIds;

	private Integer hasImgpath;

	public Integer getHasImgpath() {
		return hasImgpath;
	}

	public void setHasImgpath(Integer hasImgpath) {
		this.hasImgpath = hasImgpath;
	}

	public String getImgpath() {
		return imgpath;
	}

	public void setImgpath(String imgpath) {
		this.imgpath = imgpath;
	}

	public String getCityIds() {
		return cityIds;
	}

	public void setCityIds(String cityIds) {
		this.cityIds = cityIds;
	}

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public String getOfficeIds() {
		return officeIds;
	}

	public void setOfficeIds(String officeIds) {
		this.officeIds = officeIds;
	}

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

	public String getNameEn() {
		return nameEn;
	}

	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}

	public String getNameSp() {
		return nameSp;
	}

	public void setNameSp(String nameSp) {
		this.nameSp = nameSp;
	}

	public String getNameFl() {
		return nameFl;
	}

	public void setNameFl(String nameFl) {
		this.nameFl = nameFl;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Integer publishDate) {
		this.publishDate = publishDate;
	}

	public Integer getLockflag() {
		return lockflag;
	}

	public void setLockflag(Integer lockflag) {
		this.lockflag = lockflag;
	}

	public Integer getAllowToCreateHouse() {
		return allowToCreateHouse;
	}

	public void setAllowToCreateHouse(Integer allowToCreateHouse) {
		this.allowToCreateHouse = allowToCreateHouse;
	}

	public Integer getImgCount() {
		return imgCount;
	}

	public void setImgCount(Integer imgCount) {
		this.imgCount = imgCount;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Integer getHot() {
		return hot;
	}

	public void setHot(Integer hot) {
		this.hot = hot;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public Integer getCircleId() {
		return circleId;
	}

	public void setCircleId(Integer circleId) {
		this.circleId = circleId;
	}

	public String getCircleName() {
		return circleName;
	}

	public void setCircleName(String circleName) {
		this.circleName = circleName;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getMapX() {
		return mapX;
	}

	public void setMapX(Double mapX) {
		this.mapX = mapX;
	}

	public Double getMapY() {
		return mapY;
	}

	public void setMapY(Double mapY) {
		this.mapY = mapY;
	}

	public Integer getAccendantId() {
		return accendantId;
	}

	public void setAccendantId(Integer accendantId) {
		this.accendantId = accendantId;
	}

	public String getAccendantName() {
		return accendantName;
	}

	public void setAccendantName(String accendantName) {
		this.accendantName = accendantName;
	}

	public String getManagementType() {
		return managementType;
	}

	public void setManagementType(String managementType) {
		this.managementType = managementType;
	}

	public String getManagementLevel() {
		return managementLevel;
	}

	public void setManagementLevel(String managementLevel) {
		this.managementLevel = managementLevel;
	}

	public String getManagementCompany() {
		return managementCompany;
	}

	public void setManagementCompany(String managementCompany) {
		this.managementCompany = managementCompany;
	}

	public String getManagementMoney() {
		return managementMoney;
	}

	public void setManagementMoney(String managementMoney) {
		this.managementMoney = managementMoney;
	}

	public Integer getInvestorType() {
		return investorType;
	}

	public void setInvestorType(Integer investorType) {
		this.investorType = investorType;
	}

	public String getInvestor() {
		return investor;
	}

	public void setInvestor(String investor) {
		this.investor = investor;
	}

	public String getInvestorContact() {
		return investorContact;
	}

	public void setInvestorContact(String investorContact) {
		this.investorContact = investorContact;
	}

	public String getInvestorContactphone() {
		return investorContactphone;
	}

	public void setInvestorContactphone(String investorContactphone) {
		this.investorContactphone = investorContactphone;
	}

	public String getInvestorJob() {
		return investorJob;
	}

	public void setInvestorJob(String investorJob) {
		this.investorJob = investorJob;
	}

	public String getDeveloperCompany() {
		return developerCompany;
	}

	public void setDeveloperCompany(String developerCompany) {
		this.developerCompany = developerCompany;
	}

	public String getAgentCompany() {
		return agentCompany;
	}

	public void setAgentCompany(String agentCompany) {
		this.agentCompany = agentCompany;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getDesignCompany() {
		return designCompany;
	}

	public void setDesignCompany(String designCompany) {
		this.designCompany = designCompany;
	}

	public String getConstructionCompany() {
		return constructionCompany;
	}

	public void setConstructionCompany(String constructionCompany) {
		this.constructionCompany = constructionCompany;
	}

	public Integer getTimeOfOf() {
		return timeOfOf;
	}

	public void setTimeOfOf(Integer timeOfOf) {
		this.timeOfOf = timeOfOf;
	}

	public String getStandardHeight() {
		return standardHeight;
	}

	public void setStandardHeight(String standardHeight) {
		this.standardHeight = standardHeight;
	}

	public String getLandAreasize() {
		return landAreasize;
	}

	public void setLandAreasize(String landAreasize) {
		this.landAreasize = landAreasize;
	}

	public String getTotalAreasize() {
		return totalAreasize;
	}

	public void setTotalAreasize(String totalAreasize) {
		this.totalAreasize = totalAreasize;
	}

	public String getBuildingHeight() {
		return buildingHeight;
	}

	public void setBuildingHeight(String buildingHeight) {
		this.buildingHeight = buildingHeight;
	}

	public String getFloorAreasize() {
		return floorAreasize;
	}

	public void setFloorAreasize(String floorAreasize) {
		this.floorAreasize = floorAreasize;
	}

	public Double getConstructionRatio() {
		return constructionRatio;
	}

	public void setConstructionRatio(Double constructionRatio) {
		this.constructionRatio = constructionRatio;
	}

	public Integer getGroundfloor() {
		return groundfloor;
	}

	public void setGroundfloor(Integer groundfloor) {
		this.groundfloor = groundfloor;
	}

	public Integer getUndergroundfloor() {
		return undergroundfloor;
	}

	public void setUndergroundfloor(Integer undergroundfloor) {
		this.undergroundfloor = undergroundfloor;
	}

	public String getPlotRatio() {
		return plotRatio;
	}

	public void setPlotRatio(String plotRatio) {
		this.plotRatio = plotRatio;
	}

	public String getFloorHeight() {
		return floorHeight;
	}

	public void setFloorHeight(String floorHeight) {
		this.floorHeight = floorHeight;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRemainderArea() {
		return remainderArea;
	}

	public void setRemainderArea(String remainderArea) {
		this.remainderArea = remainderArea;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getArtremark() {
		return artremark;
	}

	public void setArtremark(String artremark) {
		this.artremark = artremark;
	}

	public Integer getCustomcatagory1() {
		return customcatagory1;
	}

	public void setCustomcatagory1(Integer customcatagory1) {
		this.customcatagory1 = customcatagory1;
	}

	public Integer getCustomcatagory2() {
		return customcatagory2;
	}

	public void setCustomcatagory2(Integer customcatagory2) {
		this.customcatagory2 = customcatagory2;
	}

	public Integer getCustomcatagory3() {
		return customcatagory3;
	}

	public void setCustomcatagory3(Integer customcatagory3) {
		this.customcatagory3 = customcatagory3;
	}

	public String getGreeningRatio() {
		return greeningRatio;
	}

	public void setGreeningRatio(String greeningRatio) {
		this.greeningRatio = greeningRatio;
	}

	public Integer getParkingCount() {
		return parkingCount;
	}

	public void setParkingCount(Integer parkingCount) {
		this.parkingCount = parkingCount;
	}

	public String getParkingFees() {
		return parkingFees;
	}

	public void setParkingFees(String parkingFees) {
		this.parkingFees = parkingFees;
	}

	public String getLiftBrand() {
		return liftBrand;
	}

	public void setLiftBrand(String liftBrand) {
		this.liftBrand = liftBrand;
	}

	public String getLiftPartition() {
		return liftPartition;
	}

	public void setLiftPartition(String liftPartition) {
		this.liftPartition = liftPartition;
	}

	public String getLiftCount() {
		return liftCount;
	}

	public void setLiftCount(String liftCount) {
		this.liftCount = liftCount;
	}

	public String getGoodsliftcount() {
		return goodsliftcount;
	}

	public void setGoodsliftcount(String goodsliftcount) {
		this.goodsliftcount = goodsliftcount;
	}

	public String getAirconditionerBrand() {
		return airconditionerBrand;
	}

	public void setAirconditionerBrand(String airconditionerBrand) {
		this.airconditionerBrand = airconditionerBrand;
	}

	public String getAirconditionerCount() {
		return airconditionerCount;
	}

	public void setAirconditionerCount(String airconditionerCount) {
		this.airconditionerCount = airconditionerCount;
	}

	public String getAirconditionerOpen() {
		return airconditionerOpen;
	}

	public void setAirconditionerOpen(String airconditionerOpen) {
		this.airconditionerOpen = airconditionerOpen;
	}

	public String getAirconditionerSystem() {
		return airconditionerSystem;
	}

	public void setAirconditionerSystem(String airconditionerSystem) {
		this.airconditionerSystem = airconditionerSystem;
	}

	public String getAirconditionerOvertimebill() {
		return airconditionerOvertimebill;
	}

	public void setAirconditionerOvertimebill(String airconditionerOvertimebill) {
		this.airconditionerOvertimebill = airconditionerOvertimebill;
	}

	public String getLobbyheight() {
		return lobbyheight;
	}

	public void setLobbyheight(String lobbyheight) {
		this.lobbyheight = lobbyheight;
	}

	public String getPhonebill() {
		return phonebill;
	}

	public void setPhonebill(String phonebill) {
		this.phonebill = phonebill;
	}

	public String getBathroom() {
		return bathroom;
	}

	public void setBathroom(String bathroom) {
		this.bathroom = bathroom;
	}

	public String getOuterWall() {
		return outerWall;
	}

	public void setOuterWall(String outerWall) {
		this.outerWall = outerWall;
	}

	public String getPorch() {
		return porch;
	}

	public void setPorch(String porch) {
		this.porch = porch;
	}

	public String getNetsystem() {
		return netsystem;
	}

	public void setNetsystem(String netsystem) {
		this.netsystem = netsystem;
	}

	public String getAerationSystem() {
		return aerationSystem;
	}

	public void setAerationSystem(String aerationSystem) {
		this.aerationSystem = aerationSystem;
	}

	public String getSatellite() {
		return satellite;
	}

	public void setSatellite(String satellite) {
		this.satellite = satellite;
	}

	public String getVent() {
		return vent;
	}

	public void setVent(String vent) {
		this.vent = vent;
	}

	public String getSmartdevices() {
		return smartdevices;
	}

	public void setSmartdevices(String smartdevices) {
		this.smartdevices = smartdevices;
	}

	public Long getLockflagAt() {
		return lockflagAt;
	}

	public void setLockflagAt(Long lockflagAt) {
		this.lockflagAt = lockflagAt / 1000;
	}


	public String getAuditpersonName() {
		return auditpersonName;
	}

	public void setAuditpersonName(String auditpersonName) {
		this.auditpersonName = auditpersonName;
	}

	public Integer getHasAudit() {
		return hasAudit;
	}

	public void setHasAudit(Integer hasAudit) {
		this.hasAudit = hasAudit;
	}

	public Integer getLockCheckedId() {
		return lockCheckedId;
	}

	public void setLockCheckedId(Integer lockCheckedId) {
		this.lockCheckedId = lockCheckedId;
	}

	public Integer getLockCheckedAt() {
		return lockCheckedAt;
	}

	public void setLockCheckedAt(Integer lockCheckedAt) {
		this.lockCheckedAt = lockCheckedAt;
	}

	public Integer getIsfullCheckedId() {
		return isfullCheckedId;
	}

	public void setIsfullCheckedId(Integer isfullCheckedId) {
		this.isfullCheckedId = isfullCheckedId;
	}

	public Integer getIsfullCheckedAt() {
		return isfullCheckedAt;
	}

	public void setIsfullCheckedAt(Integer isfullCheckedAt) {
		this.isfullCheckedAt = isfullCheckedAt;
	}

	public Integer getKongpanNumber() {
		return kongpanNumber;
	}

	public void setKongpanNumber(Integer kongpanNumber) {
		this.kongpanNumber = kongpanNumber;
	}

	public Integer getLockNumber() {
		return lockNumber;
	}

	public void setLockNumber(Integer lockNumber) {
		this.lockNumber = lockNumber;
	}

	public String getLockCheckedName() {
		return lockCheckedName;
	}

	public void setLockCheckedName(String lockCheckedName) {
		this.lockCheckedName = lockCheckedName;
	}

	public String getIsfullCheckedName() {
		return isfullCheckedName;
	}

	public void setIsfullCheckedName(String isfullCheckedName) {
		this.isfullCheckedName = isfullCheckedName;
	}

	public Double getFirstFloorHeight() {
		return firstFloorHeight;
	}

	public void setFirstFloorHeight(Double firstFloorHeight) {
		this.firstFloorHeight = firstFloorHeight;
	}

	public String getDeveloperIntroduction() {
		return developerIntroduction;
	}

	public void setDeveloperIntroduction(String developerIntroduction) {
		this.developerIntroduction = developerIntroduction;
	}
}
