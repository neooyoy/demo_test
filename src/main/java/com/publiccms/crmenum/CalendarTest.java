package com.publiccms.crmenum;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;

/**
 * Created by Administrator on 2016/6/24.
 */
public class CalendarTest {
    public  static  void main(String [] args)
    {
         Collection books =new HashSet();
        books.add("11");
        books.add("2");
        books.add("3");
        Iterator it=books.iterator();
        while (it.hasNext())
        {
            String book =(String) it.next();
            if(book.length()==1)
            {
                it.remove();
            }
            book="jiba";
        }
        System.out.println(books);
    }
}
