
Ext.define('Bim.controller.Picture', {
    extend: 'Ext.app.Controller',
    
    refs: [{
        ref: 'picturesList',
        selector: '#mainviewport pictureslist'
    },
    {
        ref: 'pictureDetails',
        selector: '#mainviewport picturedetails'
    }],
    
    stores: ['Pictures'],
    
    init: function() {
        // Start listening for events on views
        this.control({
            '#mainviewport pictureslist': {
                selectionchange: this.onPictureSelect
            }
        });
        // Listen for an application wide event
        this.application.on({
            placeselect: this.onPlaceSelect,
            scope: this
        });
    },
    
    onLaunch: function() {
        
    },
    
    onPictureSelect: function(selModel, selections) {
        var selected = selections[0];
        if (selected) {
            // Fire an application wide event
            this.application.fireEvent('pictureselect', selected);
            this.getPictureDetails().loadRecord(selected.data);
        }
    },
    
    onPlaceSelect: function(sender, place) {
//        var store = this.getPicturesStore();
//        store.clearFilter();
//        store.filter('siteid', site.id);      
  
        var store = this.getPicturesStore();        
        store.load({
            params: { placeId: place.id },
            callback: this.onPicturesLoad,
            scope: this
        });
        
    }
    
//    onProjectSelect: function(sender, project) {
//        var store = this.getPicturesStore();
//        store.clearFilter();
//        store.filter('siteid', -1);
//    }
    
});