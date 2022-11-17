({
    initRecords: function(component, event, helper) {
        var action = component.get("c.getAccount");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();                
                component.set("v.AccountList", storeResponse);
            }
        });
        $A.enqueueAction(action);
    },
    
    Save: function(component, event, helper) {
        if (helper.requiredValidation(component, event)){
            var action = component.get("c.saveAccount");
            action.setParams({
                'lstAccount': component.get("v.AccountList")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    component.set("v.AccountList", storeResponse);
                    component.set("v.showSaveCancelBtn",false);
                    alert('Record Updated');
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    cancel : function(component,event,helper){
        $A.get('e.force:refreshView').fire();
    }
 })