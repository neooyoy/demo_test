package com.publiccms.utils;

import org.apache.commons.codec.digest.DigestUtils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * AES 算法 对称加密，密码学中的高级加密标准
 *
 * @author Andy Wu
 * @version 2015年11月7日 下午9:16:46
 */
public class AES_DE {

    public static String encrypt2(String content, String token) {
        try {
            SecretKeySpec key = new SecretKeySpec(token.getBytes(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            byte[] byteContent = content.getBytes("utf-8");
            IvParameterSpec ivspec = new IvParameterSpec("uban.com_corpsso".getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, key,ivspec);// 初始化

            return parseByte2HexStr(cipher.doFinal(byteContent)); // 加密
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    /**
     * 解密算法
     *
     * @param content
     * @param token
     * @return
     */
    public static String decrypt2(String content, String token) {
        try {
            byte[] byteContent = _parseHexStr2Byte(content);

            SecretKeySpec key = new SecretKeySpec(token.getBytes(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            IvParameterSpec ivspec = new IvParameterSpec("uban.com_corpsso".getBytes());

            cipher.init(Cipher.DECRYPT_MODE, key, ivspec);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            return new String(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将16进制转换为二进制
     *
     * @param hexStr
     * @return
     * @author
     * @version 2015年11月7日  下午9:22:04
     */
    private static byte[] _parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1)
            return null;
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < hexStr.length() / 2; i++) {
            int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
            int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    /**
     * @param args
     * @author
     * @version 2015年11月7日  下午9:16:46
     */
    public static void main(String[] args) throws Exception {
        String encrypt = encrypt2("19822demo_index", "n0ZkGSdx35PT6fAF");
        String encrypt1 = encrypt2("0请在24小时内登录后台系统-房源管理确认", "d1418925b01249fb");
        String encrypt2 = encrypt2("123", "a82ea97f84f24cdc");
        String encrypt3 = encrypt2("中文", "a82ea97f84f24cdc");
        System.out.println("AES 加密输出：" + encrypt);
        System.out.println("encrypt1：" + encrypt1);
        System.out.println("encrypt2：" + encrypt2);
        System.out.println("encrypt3：" + encrypt3);
        System.out.println("AES+SHA1 加密输出："+DigestUtils.sha1(encrypt.getBytes()));
        System.out.println("AES+SHA1(hex) 加密输出：" + DigestUtils.sha1Hex(encrypt.getBytes()));


        //System.out.println("AES解密输出：" + decrypt2("JIgOWCMij3NBunnCXp8zaQ==", "n0ZkGSdx35PT6fAF"));


        //DigestUtils.
    }

}
