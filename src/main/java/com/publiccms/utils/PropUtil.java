package com.publiccms.utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Hashtable;
import java.util.Properties;

@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
public class PropUtil {
	public static String ROOT_PATH; // ϵͳĿ¼

	/**
	 * ����ϵͳ��Ŀ¼
	 * 
	 * @param rOOT_PATH
	 *            the rOOT_PATH to set
	 */
	public static void setROOT_PATH(String rOOT_PATH) {
		ROOT_PATH = rOOT_PATH;
	}

	/**
	 * ��ȡProperties�ļ���ֵ
	 * 
	 * @param fname
	 *            �ļ���
	 * @param key
	 *            ��
	 * @return
	 */
	public static String getPropValue(String fname, String key) {

		Properties newprop = loadProp(fname);
		if (newprop != null && newprop.getProperty(key) != null) {
			return newprop.getProperty(key).trim();
		} else {
			return "";
		}

	}

	/**
	 * ��ȡProperties�ļ�
	 * 
	 * @param fname
	 * @return
	 */
	public static Properties loadProp(String fname) {
		try {

			Properties prop = null;
			Hashtable htmlfileHash = new Hashtable();
			Hashtable htmlfileTime = new Hashtable();
			File f = new File(getPROP_ROOT() + fname + ".properties");
			if (!f.exists())
				return null;

			long ftime = f.lastModified();
			Long hftime = (Long) htmlfileTime.get(fname);

			if (hftime == null || hftime.longValue() != ftime) {

				prop = new Properties();
				FileInputStream fis = new FileInputStream(f);
				BufferedInputStream bis = new BufferedInputStream(fis);
				BufferedReader reader = new BufferedReader (new InputStreamReader(bis));

				prop.load(reader);
				reader.close();
				bis.close();
				fis.close();
				
				htmlfileHash.put(fname, prop);
				htmlfileTime.put(fname, new Long(ftime));
			}

			return (Properties) htmlfileHash.get(fname);

		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * ��ȡproperties�����ļ�·��
	 * 
	 * @return the PROP_ROOT
	 */
	public static String getPROP_ROOT() {
		File localFile = new File(ROOT_PATH + "WEB-INF/classes" +File.separatorChar);
		if (localFile.exists()) {
			return ROOT_PATH + "WEB-INF/classes" + File.separatorChar + File.separatorChar;
		}
		return null;
	}

	/**
	 * дProperties�ļ�ֵ ���������ļ�ע�ͻᶪʧ
	 * 
	 * @param fname
	 *            �ļ���
	 * @param key
	 *            ��
	 * @return
	 * @throws IOException
	 */
	private static void setPropValue(String fname, String key, String value)
			throws IOException {
		String fileNamePath = getPROP_ROOT() + fname + ".properties";
		Properties prop = new Properties();
		InputStream in = null;
		OutputStream out = null;
		try {
			in = new FileInputStream(fileNamePath);
			prop.load(in);
			out = new FileOutputStream(fileNamePath);
			prop.setProperty(key, value);
			prop.store(out, key);// ����
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != in)
				in.close();
			if (null != out)
				out.close();
		}
	}
}
