package com.publiccms.utils;

import com.publiccms.domain.office.Office;

public class OfficeCheckUtils {
	
	   //插入修改对字段null值 做默认赋值
	public static void officeCheck(Office office){
    	if(StringUtils.isEmpty(office.getNameEn())){
    		office.setNameEn("");
    	}
    	if(StringUtils.isEmpty(office.getNameSp())){
    		office.setNameSp("");
    	}
    	if(StringUtils.isEmpty(office.getCityId())){
    		office.setCircleId(0);
    	}
    	if(StringUtils.isEmpty(office.getCityName())){
    		office.setCircleName("");
    	}
    	if(StringUtils.isEmpty(office.getCircleId())){
    		office.setCircleId(0);
    	}
    	if(StringUtils.isEmpty(office.getCircleName())){
    		office.setCircleName("");
    	}
    	if(StringUtils.isEmpty(office.getDistrictId())){
    		office.setDistrictId(0);
    	}
    	if(StringUtils.isEmpty(office.getDistrictName())){
    		office.setDistrictName("");
    	}
    	if(StringUtils.isEmpty(office.getAddress())){
    		office.setAddress("");
    	}
    	if(StringUtils.isEmpty(office.getManagementCompany())){
    		office.setManagementCompany("");
    	}
    	if(StringUtils.isEmpty(office.getManagementMoney())){
    		office.setManagementMoney("0");
    	}
    	if(StringUtils.isEmpty(office.getInvestor())){
    		office.setInvestor("");
    	}
    	if(StringUtils.isEmpty(office.getInvestorContact())){
    		office.setInvestorContact("");
    	}
    	if(StringUtils.isEmpty(office.getInvestorContactphone())){
    		office.setInvestorContactphone("");
    	}
    	if(StringUtils.isEmpty(office.getInvestorJob())){
    		office.setInvestorJob("");
    	}
    	if(StringUtils.isEmpty(office.getDeveloperCompany())){
    		office.setDeveloperCompany("");
    	}
    	if(StringUtils.isEmpty(office.getAgentCompany())){
    		office.setAgentCompany("");
    	}
    	if(StringUtils.isEmpty(office.getTel())){
    		office.setTel("");
    	}
    	if(StringUtils.isEmpty(office.getDesignCompany())){
    		office.setDesignCompany("");
    	}
    	if(StringUtils.isEmpty(office.getStandardHeight())){
    		office.setStandardHeight("0");
    	}
    	if(StringUtils.isEmpty(office.getLandAreasize())){
    		office.setLandAreasize("0");
    	}
    	if(StringUtils.isEmpty(office.getTotalAreasize())){
    		office.setTotalAreasize("0");
    	}
    	if(StringUtils.isEmpty(office.getBuildingHeight())){
    		office.setBuildingHeight("0");
    	}
    	if(StringUtils.isEmpty(office.getFloorAreasize())){
    		office.setFloorAreasize("0");
    	}
    	if(StringUtils.isEmpty(office.getConstructionRatio())){
    		office.setConstructionRatio(0d);
    	}
    	if(StringUtils.isEmpty(office.getGroundfloor())){
    		office.setGroundfloor(0);
    	}
    	if(StringUtils.isEmpty(office.getUndergroundfloor())){
    		office.setUndergroundfloor(0);
    	}
    	if(StringUtils.isEmpty(office.getPlotRatio())){
    		office.setPlotRatio("0");
    	}
    	if(StringUtils.isEmpty(office.getFloorHeight())){
    		office.setFloorHeight("0");
    	}
    	if(StringUtils.isEmpty(office.getPrice())){
    		office.setPrice("0");
    	}
    	if(StringUtils.isEmpty(office.getRemainderArea())){
    		office.setRemainderArea("0");
    	}
    	if(StringUtils.isEmpty(office.getDescription())){
    		office.setDescription("");
    	}
    	if(StringUtils.isEmpty(office.getArtremark())){
    		office.setArtremark("");
    	}
    	if(StringUtils.isEmpty(office.getGreeningRatio())){
    		office.setGreeningRatio("0");
    	}
    	if(StringUtils.isEmpty(office.getParkingCount())){
    		office.setParkingCount(0);
    	}
    	if(StringUtils.isEmpty(office.getParkingFees())){
    		office.setParkingFees("0");
    	}
    	if(StringUtils.isEmpty(office.getLiftBrand())){
    		office.setLiftBrand("");
    	}
    	if(StringUtils.isEmpty(office.getLiftPartition())){
    		office.setLiftPartition("");
    	}
    	if(StringUtils.isEmpty(office.getLiftCount())){
    		office.setLiftCount("");
    	}
    	if(StringUtils.isEmpty(office.getGoodsliftcount())){
    		office.setGoodsliftcount("");
    	}
    	if(StringUtils.isEmpty(office.getAirconditionerBrand())){
    		office.setAirconditionerBrand("");
    	}
    	if(StringUtils.isEmpty(office.getAirconditionerCount())){
    		office.setAirconditionerCount("");
    	}
    	if(StringUtils.isEmpty(office.getAirconditionerOpen())){
    		office.setAirconditionerOpen("");
    	}
    	if(StringUtils.isEmpty(office.getAirconditionerOvertimebill())){
    		office.setAirconditionerOvertimebill("");
    	}
    	if(StringUtils.isEmpty(office.getLobbyheight())){
    		office.setLobbyheight("");
    	}
    	if(StringUtils.isEmpty(office.getPhonebill())){
    		office.setPhonebill("");
    	}
    	if(StringUtils.isEmpty(office.getBathroom())){
    		office.setBathroom("");
    	}
    	if(StringUtils.isEmpty(office.getOuterWall())){
    		office.setOuterWall("");
    	}
    	if(StringUtils.isEmpty(office.getPorch())){
    		office.setPorch("");
    	}
    	if(StringUtils.isEmpty(office.getNetsystem())){
    		office.setNetsystem("");
    	}
    	if(StringUtils.isEmpty(office.getSmartdevices())){
    		office.setSmartdevices("");
    	}
    	if(StringUtils.isEmpty(office.getHot())){
    		office.setHot(0);
    	}
		if (office.getDeveloperIntroduction() == null){
			office.setDeveloperIntroduction("");
		}
		if (office.getFirstFloorHeight() == null){
			office.setFirstFloorHeight(0.0);
		}
    }
}
