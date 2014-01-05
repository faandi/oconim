
Ext.define('Bim.controller.IssueEditor', {
    extend: 'Ext.app.Controller',
   
    win: null,
        
    init: function() {
    },
        
    onLaunch: function() {
        
    },       
    
    showWindow: function() {    
      if (!this.win) {
        this.win = Ext.create('Bim.view.IssueEditor', {
          title: 'Angelegenheit',
          width: 750,
          height: 500,
          plain: true,
          headerPosition: 'top',
          modal: true
        });
      }
      this.win.show();
  }
        
});