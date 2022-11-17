trigger customerTrigger on Customer__c (after insert) {
    
    if(trigger.isInsert){
        List<Customer__Share> custShrs  = new List<Customer__Share>();
        Customer__Share recruiterShr = new Customer__Share();
        
        for(Group gp : [select id, name from Group where name = 'triggerSharing']){
        recruiterShr.UserOrGroupId = gp.id;
        }
        for(Customer__c job : trigger.new){
            recruiterShr.ParentId = job.Id;
            recruiterShr.AccessLevel = 'edit';
            custShrs.add(recruiterShr);
        }
        
        // Insert sharing records and capture save result 
        // The false parameter allows for partial processing if multiple records are passed 
        // into the operation 
        Database.SaveResult[] lsr = Database.insert(custShrs,false);
        system.debug(lsr);
        // Create counter
        Integer i=0;
        
        // Process the save results
        for(Database.SaveResult sr : lsr){
            if(!sr.isSuccess()){
                // Get the first save result error
                Database.Error err = sr.getErrors()[0];
                system.debug(err);
                // Check if the error is related to a trivial access level
                // Access levels equal or more permissive than the object's default 
                // access level are not allowed. 
                // These sharing records are not required and thus an insert exception is 
                // acceptable. 
                if(!(err.getStatusCode() == StatusCode.FIELD_FILTER_VALIDATION_EXCEPTION  
                                               &&  err.getMessage().contains('AccessLevel'))){
                    // Throw an error when the error is not related to trivial access level.
                    trigger.newMap.get(custShrs[i].ParentId).
                      addError(
                       'Unable to grant sharing access due to following exception: '
                       + err.getMessage());
                }
            }
            i++;
        }   
    }
}