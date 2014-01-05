

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
    stores: ['Companies', 'AdminUsers'],
        
    init: function() {        
        this.control({
           'bimHeader userdisplay button': {
               click: this.onLogOnOffClicked,
               scope: this
           },
           'bimHeader #companies': {
               click: this.onCompaniesClicked,
               scope: this
           },
           'bimHeader #users': {
               click: this.onUsersClicked,
               scope: this
           },
           'bimHeader #pictures': {
               click: this.onPicturesClicked,
               scope: this
           },
           'bimHeader #issues': {
               click: this.onIssuesClicked,
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
    },
    
    onCompaniesClicked: function() {
      var companiesStore = this.getCompaniesStore();
      companiesStore.load({
        callback: function(){
          this.getHeader().openCompaniesWindow(companiesStore);
        },
        scope: this
      });
    },
    
    onUsersClicked: function() {
      var adminUsersStore = this.getAdminUsersStore();
      adminUsersStore.load({
        callback: function(){
          this.getHeader().openUsersWindow(adminUsersStore);
        },
        scope: this
      });
    },
    
    onPicturesClicked: function() {
      this.application.getController('PictureViewer').showWindow();
    },
    
    onIssuesClicked: function() {
      this.application.getController('IssueEditor').showWindow();
    }
});