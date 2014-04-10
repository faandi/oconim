
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
    
    stores: ['AdminIssues', 'AdminIssuePictures'],
    
    issue: null,
    
    init: function() {
        // Start listening for events on views
        this.control({
            'issueslist': {
                selectionchange: this.onIssueSelect
            }
        });
        // Listen for an application wide event
//        this.application.on({
//            placeselect: this.onPlaceSelect,
//            scope: this
//        });

        this.control({
           'issueDetails #editissue': {
               click: this.onIssuesClicked,
               scope: this
           },
           'issueDetails #sendmail': {
               click: this.onSendMailClicked,
               scope: this
           }
        });
    },
    
    onLaunch: function() {
        
      var store = this.getAdminIssuesStore();        
      store.load({
          //params: { placeId: place.id },
          callback: this.onIssuesLoad,
          scope: this
      });
        
    },
    
    onIssueSelect: function(selModel, selections) {
        var selected = selections[0];
        if (selected) {
            // Fire an application wide event
            this.application.fireEvent('issueselect', selected);
            this.showIssueDetails(selected.data.id);
        }
    },
    
    showIssueDetails: function(issueId) {
      var issueStore = Ext.create('Ext.data.Store',{
        model: 'Bim.model.AdminIssue',        
        proxy: {
            type: 'rest',
            url : 'api/admin/issues.json/' + issueId,
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }
        },
        autoLoad: false,
        autoSync: true
      });      
      issueStore.load({
        // params: {issueId: issue.getId()},
        callback: function(records) {
          this.issue = records[0];
          this.getIssueDetails().setIssue(records[0]);
          var picturesStore = this.getAdminIssuePicturesStore();
          picturesStore.load({
            params: {issueId: issueId},
            callback: this.onAdminIssuePicturesLoad,
            scope: this
          });
        },
        scope: this
      });      
    },
    
    onIssuesClicked: function() {
      this.application.getController('IssueEditor').showWindow(this.issue);
    },
    
    onSendMailClicked: function() {
      Ext.Ajax.request({
        url: 'api/admin/issues/sendmail.json?id=' + this.issue.getId(),
        success: function(response, opts) {
           if (response) {
               alert("E-Mail gesendet!");
           } else {
               alert("Fehler!");
           }
        },
        failure: function(response, opts) {
           alert("Fehler!");
        }
      });
    }
    
//    onPlaceSelect: function(sender, place) {
//      var store = this.getAdminIssuesStore();        
//      store.load({
//          //params: { placeId: place.id },
//          callback: this.onIssuesLoad,
//          scope: this
//      });
//        
//    }
    
});