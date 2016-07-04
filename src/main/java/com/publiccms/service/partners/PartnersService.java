package com.publiccms.service.partners;

import java.util.List;

import com.publiccms.domain.partners.Partners;

public interface PartnersService {
    public Integer insert(Partners partners);
    public List<Partners> listAll();
    public Integer updateById(Partners partners);
    public Integer partnerscanel(Partners partners);
    public Integer partnersupdate(Partners partners);
    public Integer partnersdelete(Partners partners);
    public List<Partners > selectPublishPartners();
}
