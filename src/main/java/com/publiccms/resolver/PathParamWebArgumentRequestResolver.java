package com.publiccms.resolver;

import com.publiccms.utils.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;


public class PathParamWebArgumentRequestResolver implements HandlerMethodArgumentResolver {

	 private ConversionService conversionService;

	    public void setConversionService(ConversionService conversionService) {
	        this.conversionService = conversionService;
	    }

	    
	    @Override
	    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory binderFactory) throws Exception {
	        // TODO Auto-generated method stub
	        PathParam pathParam = parameter.getParameterAnnotation(PathParam.class);
	        if (StringUtils.isNotBlank(pathParam.defaultValue())) {
	            return pathParam.defaultValue();
	        }
	        String value = nativeWebRequest.getParameter(parameter.getParameterName());
	        if (value == null) {
	            if (pathParam.required()) {
	                throw new Exception("parameter [" + parameter.getParameterName() + "] is required.");
	            }
	            return value;
	        }

	        value = StringUtils.encoding(value, "ISO-8859-1", "UTF-8");

	        Class<?> requiredType = parameter.getParameterType();
	        if (conversionService.canConvert(String.class, requiredType)) {
	            return conversionService.convert(value, TypeDescriptor.valueOf(String.class), TypeDescriptor.valueOf(requiredType));
	        }
	        return WebArgumentResolver.UNRESOLVED;
	    }

	    @Override
	    public boolean supportsParameter(MethodParameter methodParameter) {
	        // TODO Auto-generated method stub
	        PathParam pathParam = methodParameter.getParameterAnnotation(PathParam.class);
	        if (pathParam == null) {
	            return false;
	        }
	        return true;
	    }
	

}
