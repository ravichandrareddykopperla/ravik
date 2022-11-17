trigger OppLineItemTrigger on OpportunityLineItem (before insert) {
    
    if(trigger.isBefore && trigger.isInsert){
        OLTtriggerHandlerNOV08.doBeforeInsert(trigger.new);
    }
}