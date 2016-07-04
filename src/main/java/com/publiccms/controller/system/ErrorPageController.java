package com.publiccms.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/errorpage")
public class ErrorPageController {
    
    @RequestMapping("/{ep}")
    public String returnErrorPage(@PathVariable("ep") String ep) throws Exception {
        return "errorpage/" + ep;
    }
    
}
