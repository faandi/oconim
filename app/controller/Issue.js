
Ext.define('Bim.controller.Issue', {
    extend: 'Ext.app.Controller',
    
    refs: [{
        ref: 'issuesList',
        selector: 'issueslist'
    },
    {
        ref: 'issueDetails',
        selector: 'issuedetails'
    }],
    
    stores: ['Issues'],
    
    init: function() {
        // Start listening for events on views
        this.control({
            'issueslist': {
                selectionchange: this.onIssueSelect
            }
        });
//        // Listen for an application wide event
//        this.application.on({
//            placeselect: this.onPlaceSelect,
//            scope: this
//        });
    },
    
    onLaunch: function() {
        
    },
    
    onIssueSelect: function(selModel, selections) {
        var selected = selections[0];
        if (selected) {
            // Fire an application wide event
            this.application.fireEvent('issueselect', selected);
            this.getIssueDetails().loadRecord(selected.data);
        }
    }
    
//    onPlaceSelect: function(sender, place) {
////        var store = this.getPicturesStore();
////        store.clearFilter();
////        store.filter('siteid', site.id);      
//  
//        var store = this.getIssuesStore();        
//        store.load({
//            //params: { placeId: place.id },
//            callback: this.onIssuesLoad,
//            scope: this
//        });
//        
//    }
    
});