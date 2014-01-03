
Ext.define('Bim.controller.PictureViewer', {
    extend: 'Ext.app.Controller',
    
    // generates getters, returns instance (this.getXxxx())
    refs: [{        
        ref: 'pictureDetails',
        selector: 'pictureviewer picturedetails'        
    }],
    
    // generates getters (this.getNavigatorView())
    // getNavigatorView returns class, not instance !
    // use refs to get a view instance
    // views: ['Navigator']
    
    // generates getters
    //stores: ['Projects','Sites','CurrentUser'],
    stores: ['AdminProjects', 'AdminSites', 'AdminPlaces', 'AdminPictures'],    
    //adminMode: false,    
    win: null,
        
    init: function() {
        this.control({
           'pictureviewer picturenavigator': {
              projectselect: this.onProjectSelect,
              siteselect: this.onSiteSelect,
              placeselect: this.onPlaceSelect,
              scope: this
           },
           'pictureviewer pictureslist': {
              selectionchange: this.onPictureSelect
            }
        });
    },
        
    onLaunch: function() {
        
    },
        
    onProjectSelect: function(sender, project) {
        this.application.fireEvent('projectselect', this, project);
        var store = this.getAdminSitesStore();
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
        var store = this.getAdminPlacesStore();
        store.load({
            params: { siteId: site.id },
            callback: this.onSitesLoad,
            scope: this
        });
    },
    
    onPlaceSelect: function(sender, place) {
        // Fire an application wide event
        //this.application.fireEvent('placeselect', this, site);
        // 'pictureviewer pictureslist'
        // 
        //var list = this.getPicturesList();
        
        var store = this.getAdminPicturesStore();        
        store.load({
            params: { placeId: place.id },
            callback: this.onAdminPicturesLoad,
            scope: this
        });
    },
    
    onPictureSelect: function(selModel, selections) {
        var selected = selections[0];
        if (selected) {
            // Fire an application wide event
            //this.application.fireEvent('pictureselect', selected);
            this.getPictureDetails().loadRecord(selected.data);
        }
    },
    
    showWindow: function(placeId) {
      if (Ext.isDefined(placeId)) {
        var store = this.getAdminPicturesStore();        
        store.load({
            params: { placeId: placeId },
            callback: this.onAdminPicturesLoad,
            scope: this
        });
      } else {
        var projectsStore = this.getAdminProjectsStore();
        projectsStore.load({
            callback: this.onAdminProjectsLoad,
            scope: this
        });
      }
      if (!this.win) {
        this.win = Ext.create('Bim.view.PictureViewer', {
          title: 'Bilder',
          width: 750,
          height: 500,
          plain: true,
          headerPosition: 'top',
          modal: true,
          showNavigator: !Ext.isDefined(placeId)
          //layout: 'fit',
          //modal: true,
          // dont't destroy window onClose
          //closeAction: 'hide',
  //        items: [
  //          grid
  //        ]
        });
      }
      this.win.show();
  }
        
});