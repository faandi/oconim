
Ext.define('Bim.controller.Navigator', {
    extend: 'Ext.app.Controller',
    
    // generates getters, returns instance (this.getXxxx())
    //refs: [{        
    //    ref: 'navigator',
    //    selector: 'navigator'        
    //}],
    
    // generates getters (this.getNavigatorView())
    // getNavigatorView returns class, not instance !
    // use refs to get a view instance
    // views: ['Navigator']
    
    // generates getters
    //stores: ['Projects','Sites','CurrentUser'],
    stores: ['Projects','Sites','Places'],    
    //adminMode: false,    
        
    init: function() {
        this.control({
           'navigator': {
               projectselect: this.onProjectSelect,
               siteselect: this.onSiteSelect,
               placeselect: this.onPlaceSelect,
               scope: this
           }
        });
    },
        
    onLaunch: function() {
        // pass data to view
        var projectsStore = this.getProjectsStore();
        projectsStore.load({
            callback: this.onProjectsLoad,
            scope: this
        });
//        var sitesStore = this.getSitesStore();        
//        sitesStore.load({
//            callback: this.onSitesLoad,
//            scope: this
//        });
    },
        
    onProjectSelect: function(sender, project) {
        this.application.fireEvent('projectselect', this, project);
        var store = this.getSitesStore();
        //store.clearFilter(true);
        //store.filter('projectId', project.id);
        store.load({
            params: { projectId: project.id },
            callback: this.onSitesLoad,
            scope: this
        });
    },
    
    onSiteSelect: function(sender, site) {
        // Fire an application wide event
        this.application.fireEvent('siteselect', this, site);
        var store = this.getPlacesStore();
        store.load({
            params: { siteId: site.id },
            callback: this.onSitesLoad,
            scope: this
        });
    },
    
    onPlaceSelect: function(sender, site) {
        // Fire an application wide event
        this.application.fireEvent('placeselect', this, site);
    }
        
});