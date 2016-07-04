package com.publiccms.utils;

import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * Created by Administrator on 2016/3/3.
 */
public class QiniuClient {

    private final String token;
    private final UploadManager manager = new UploadManager();
    private final String host;

    public QiniuClient(String accessKey, String secretKey, String bucket, String expires, String host) {
        Auth auth = Auth.create(accessKey, secretKey);
        token = auth.uploadToken(bucket, null, Long.parseLong(expires), null);
        this.host = host;
    }

    public Response put(MultipartFile file) throws IOException {
        Response response = manager.put(file.getBytes(), uuidName(file.getName()), token);
        return response;
    }

    public Response put(MultipartFile file,String fileName) throws IOException{
        Response response = manager.put(file.getBytes(), fileName, token);
        return response;
    }

    public Response put(byte[] byt,String fileName) throws IOException{
        Response response = manager.put(byt, fileName, token);
        return response;
    }

    public String uuidName(String name){
        return UUID.randomUUID().toString().trim().replaceAll("-", "") + name.substring(name.lastIndexOf("."), name.length());
    }

    public String getHost() {
        return host;
    }

	/*
	public Response put(File file) throws QiniuException{
		Response response = manager.put(file, uuidName(file.getName()), token);
		return response;
	}

	public Response put(File file,String fileName) throws QiniuException{
		Response response = manager.put(file, fileName, token);
		return response;
	}

	public Response put(String filePath, String key, String token) throws QiniuException {
		return manager.put(filePath, key, token, null, null, false);
	}
	*/

}
