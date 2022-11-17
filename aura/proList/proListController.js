({
	searchingProduct : function(component, event, helper) 
    {
        var action = component.get("c.getProductRecs");
        action.setParams({searchVal : component.get("v.searchProduct")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.productList", response.getReturnValue())
            }
        });
        $A.enqueueAction(action);
	},
    
    addCart : function(component, event, helper) {
        var eventSource = event.getSource();
        var id = eventSource.get('v.name');
        alert(id);
        var createAcountContactEvent = $A.get("e.force:createRecord");
        createAcountContactEvent.setParams({
            "entityApiName": "Cart__c",
            "defaultFieldValues": {
                'Product__c' : id
            }
        });
        createAcountContactEvent.fire();
    },
    closeModal:function(component,event,helper){ 
        component.set('v.openmodel',false);
    },
    handleSuccess : function(component, event, helper) {
        alert("Product Added To Cart");
    }
})