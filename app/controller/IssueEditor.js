
Ext.define('Bim.controller.IssueEditor', {
    extend: 'Ext.app.Controller',
    stores: ['AdminIssues', 'AdminUsers', 'AdminIssuePictures'],
    win: null,
    issue: null,
        
    init: function() {
      this.control({
        '#addPicture': {
          click: function() {
            this.application.getController('PictureViewer').showWindow();
          },
          scope: this
        },
        'pictureviewer picturedetails': {
          pictureselected: function(sender, picture) { 
            this.addPicture(picture);
          },
          scope: this
        }
      });
    },
        
    onLaunch: function() {
      
    },       
    
    addPicture: function(picture) {
      Ext.Ajax.request({
        url: 'api/admin/issue/pictures.json',
        success: function() {
          var picturesStore = this.getAdminIssuePicturesStore();      
          picturesStore.load({
            params: {issueId: this.issue.getId()},
            callback: this.onAdminIssuePicturesLoad,
            scope: this
          });
        },        
        jsonData: { issueId: this.issue.getId(), picturePath: picture.id },
        scope: this
     });
    },
    
    showWindow: function(issue) {      
      
      var picturesStore = this.getAdminIssuePicturesStore();
            
      var issuesStore = this.getAdminIssuesStore(); 
      if (!this.win) {
        this.win = Ext.create('Bim.view.IssueEditor', {
          title: 'Angelegenheit',
          width: 750,
          height: 500,
          plain: true,
          headerPosition: 'top',
          modal: true
        });
//        this.win.on('issuesave', function(sender, i){
//          this.saveIssue(i);
//        }, this);
        issuesStore.on({
            write:  function (aStore, aOperation) {
              this.issue = aOperation.records[0];
              this.win.setIssue(this.issue);
              picturesStore.load({
                params: {issueId: issue.getId()},
                callback: this.onAdminIssuePicturesLoad,
                scope: this
              });
            },
            scope:  this            
        });
      }
      var usersStore = this.getAdminUsersStore();
      usersStore.load({
          //params: { projectId: project.id },
          callback: this.onAdminUsersLoad,
          scope: this
      });
      this.win.show();
      if (!issue) {        
        issue = Ext.create('Bim.model.AdminIssue', {
          'subject': '',
          'artUndUmfang': '',
          'verursacher': '',
          'bemerkungen': '',
          'kennung': '',
          touser_id: null,
          created: null,
          modified: null
        });
        issuesStore.add(issue);
      } else {
        this.win.setIssue(issue);
        picturesStore.load({
          params: {issueId: issue.getId()},
          callback: this.onAdminIssuePicturesLoad,
          scope: this
        });
      }
      this.issue = issue;
  }
  
//  saveIssue: function(issue) {
//    alert(issue.getId());
//  }
  
});