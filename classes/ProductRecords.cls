public class ProductRecords {

    @AuraEnabled
    public static List<Product2> getProductRecs(String searchVal)
    {     
        string sr = '%'+searchVal+'%';    
        List<Product2> prList = [select id, name, family 
                                   from Product2 where name like : sr];
        system.debug(prList);
        return prList;
    }
}