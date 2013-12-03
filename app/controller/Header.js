

Ext.define('Bim.controller.Header', {
    extend: 'Ext.app.Controller',
    
    // generates getters (this.getNavigator())
    refs: [{        
        ref: 'header',
        selector: 'bimHeader'        
    }],
    
    // generates getters
    // views: ['Header'],
    
    // generates getters
    //stores: ['CurrentUser'],
        
    init: function() {        
        this.control({
           'bimHeader userdisplay button': {
               click: this.onLogOnOffClicked,
               scope: this
           }
        });
    },
        
    onLaunch: function() {
        // pass data to view
//        var userStore = this.getCurrentUserStore();
//        userStore.load({
//            callback: this.onUserLoad,
//            scope: this
//        });
        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        //this.store = Ext.data.StoreManager.lookup(this.store || 'ext-empty-store');
        //this.store.on('load', this.onDataLoaded, this);
    },
    
    onUserLoad: function(records, operation, success) {        
//        var header = this.getHeader();
//        if (header) {
//            if (records && records.length > 0) {
//                header.setUser(records[0].data);
//            } else {
//                header.setUser(null);
//            }
//        }
    },
    
    onLogOnOffClicked: function() {
        this.application.logOff();
    }
    
});