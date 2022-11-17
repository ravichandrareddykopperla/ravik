({
    PerformAction : function(component, event, helper) {
        component.set("v.openmodel",true);
    },
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('editDialog');
        var cmpBack = component.find('overlay');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        component.set('v.openmodel',false);
        
    },
    fetchListOfRecordTypes: function(component, event, helper) {
        var action = component.get("c.fetchRecordTypeValues");
        action.setCallback(this, function(response) {
            component.set("v.lstOfRecordType", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})