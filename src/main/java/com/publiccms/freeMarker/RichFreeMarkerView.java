package com.publiccms.freeMarker;

import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;

import com.publiccms.constant.UbanConstant;

import freemarker.ext.servlet.FreemarkerServlet;
import freemarker.ext.servlet.HttpRequestParametersHashModel;
import freemarker.ext.servlet.IncludePage;
import freemarker.template.SimpleHash;

/**
 * 扩展spring的FreemarkerView，加上base属性。
 * 
 * 支持jsp标签，Application、Session、Request、RequestParameters属性
 */
public class RichFreeMarkerView extends FreeMarkerView {
	/**
	 * 部署路径属性名称
	 */
	public static final String CONTEXT_PATH = "base";
	/**
     * JSPATH
     */
    public static final String CONTEXT_JSPATH = "jspath";

	public static final String CONTEXT_PICTURE_URL = "pictureUrl";
	public static final String CONTEXT_PIC_LAST_LIST = "picLastList";
	public static final String CONTEXT_PIC_LAST_DETAIL = "picLastDetail";

	public static final String CSSJS_VERSION = "staticversion";
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void doRender(Map model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		exposeModelAsRequestAttributes(model, request);
		SimpleHash fmModel = buildTemplateModel(model, request, response);
		fmModel.put(FreemarkerServlet.KEY_INCLUDE, new IncludePage(request,response));
		fmModel.put("httpInclude", new HttpInclude(request,response));
		fmModel.put( "param",new HttpRequestParametersHashModel( request ) );
		if (logger.isDebugEnabled())
			logger.debug((new StringBuilder())
					.append("Rendering FreeMarker template [").append(getUrl())
					.append("] in FreeMarkerView '").append(getBeanName())
					.append("'").toString());
		Locale locale = RequestContextUtils.getLocale(request);
		processTemplate(getTemplate(locale), fmModel, response);
	}
	
	/**
	 * 在model中增加部署路径base，方便处理部署路径问题。
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void exposeHelpers(Map model, HttpServletRequest request)
			throws Exception {
		super.exposeHelpers(model, request);
		model.put(CONTEXT_PATH, request.getContextPath());
		model.put(CONTEXT_JSPATH, UbanConstant.JSPATH);
		model.put(CSSJS_VERSION, UbanConstant.STATIC_VERSION);
		model.put(CONTEXT_PICTURE_URL, UbanConstant.PICTURE_URL);
		model.put(CONTEXT_PIC_LAST_LIST, UbanConstant.PIC_LAST_LIST);
		model.put(CONTEXT_PIC_LAST_DETAIL, UbanConstant.PIC_LAST_DETAIL);
	}
}