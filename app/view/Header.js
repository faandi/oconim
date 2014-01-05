
Ext.define('Bim.view.Header', {
    extend: 'Ext.Container',
    alias: 'widget.bimHeader',
    xtype: 'bimHeader',
    id: 'bim-header',
    requires: [
      'Bim.view.UserDisplay',
      'Ext.window.Window',
      'Ext.grid.Panel',
      'Ext.grid.plugin.RowEditing'
    ],
    height: 52,
    usersWin: null,
    companiesWin: null,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'component',
            html: 'bauphilosophie.com',
            flex: 1,
            id: 'bim-header-title'
        },{
            xtype: 'button',
            id: 'issues',
            text: 'Neue Angelegenheit',
            listeners: {
                scope: this
            }
        },{
            xtype: 'button',
            id: 'pictures',
            text: 'Bilder',
            listeners: {
                scope: this
            }
        },{
            xtype: 'button',
            id: 'companies',
            text: 'Firmen',
            listeners: {
                scope: this
            }
        },{
            xtype: 'button',
            id: 'users',
            text: 'Kontakte',
            listeners: {
                scope: this
            }
        }];
    
//        {
//            xtype: 'userdisplay'
//        }
        
        this.callParent();
    },
    setUser: function(user) {
        this.down('userdisplay').setUser(user);
    },       
    openCompaniesWindow: function(store) {
        if (!this.companiesWin) {
          
          var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
              clicksToMoveEditor: 1,
              autoCancel: false
          });

          // create the grid and specify what field you want
          // to use for the editor at each column.
          var grid = Ext.create('Ext.grid.Panel', {
              store: store,
              columns: [{
                  header: 'Name',
                  dataIndex: 'name',
                  flex: 1,
                  editor: {
                      allowBlank: false
                  }
              }, {
                  header: 'Adresse',
                  dataIndex: 'address',
                  width: 350,
                  editor: {
                      allowBlank: false
                  }              
              }],
              // renderTo: 'editor-grid',
              //width: 600,
              //height: 400,
              title: false,
              frame: true,
              tbar: [{
                  text: 'Neue Firma',
                  handler : function() {
                      rowEditing.cancelEdit();
                      // Create a model instance
                      var r = Ext.create('Bim.model.Company', {
                          name: 'Firma' + store.getCount(),
                          address: 'Adresse'
                      });
                      store.insert(0, r);
                      rowEditing.startEdit(0, 0);
                  }
              }, {
                  itemId: 'removeCompany',
                  text: 'Firma löschen',
                  handler: function() {
                      var sm = grid.getSelectionModel();
                      rowEditing.cancelEdit();
                      store.remove(sm.getSelection());
                      if (store.getCount() > 0) {
                          sm.select(0);
                      }
                  },
                  disabled: true
              }],
              plugins: [rowEditing],
              listeners: {
                  'selectionchange': function(view, records) {
                      grid.down('#removeCompany').setDisabled(!records.length);
                  }
              }
          });
          this.companiesWin = Ext.create('Ext.Window', {
              title: 'Firmen',
              width: 600,
              height: 400,
              plain: true,
              headerPosition: 'top',
              layout: 'fit',
              modal: true,
              // dont't destroy window onClose
              closeAction:'hide',
              items: [
                  grid
              ]
          });
        }
        this.companiesWin.show();
    },       
    openUsersWindow: function(store) {
        if (!this.usersWin) {
          
          var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
              clicksToMoveEditor: 1,
              autoCancel: false
          });

          // create the grid and specify what field you want
          // to use for the editor at each column.
          
          var grid = Ext.create('Ext.grid.Panel', {
              store: store,
              columns: [{
                  header: 'Benutzername',
                  dataIndex: 'username',
                  flex: 1,
                  editor: {
                      allowBlank: false
                  }
              }, {
                  text: 'Email',
                  width: 100,
                  dataIndex: 'email',
                  field: {
                      allowBlank: false
                  }
              },{
                  header: 'Name',
                  dataIndex: 'name',
                  width: 100,
                  editor: {
                      allowBlank: false
                  }
              },{
                  header: 'Nachnahme',
                  dataIndex: 'surname',
                  width: 100,
                  editor: {
                      allowBlank: false
                  }
              },{
                  header: 'Telefon',
                  dataIndex: 'tel',
                  width: 100,
                  editor: {
                      allowBlank: false
                  }
              },{
//                  header: 'IsAdmin',
//                  dataIndex: 'isadmin',
//                  width: 80
////                  editor: {
////                      xtype: 'checkbox',
////                      cls: 'x-grid-checkheader-editor'
////                  }
//              },{
                  header: 'Passwort',
                  dataIndex: 'password',
                  width: 100,
                  editor: {
                      allowBlank: false
                  }
              }],
              // renderTo: 'editor-grid',
              //width: 600,
              //height: 400,
              title: false,
              frame: true,
              tbar: [{
                  text: 'Neuer Kontakt',
                  handler : function() {
                      rowEditing.cancelEdit();
                      // Create a model instance
                      var r = Ext.create('Bim.model.AdminUser', {
                          username: 'Benutzer' + store.getCount(),
                          password: 'geheim' + store.getCount(),
                          name: 'Vorname',
                          surname: 'Nachnahme',
                          email: 'email',
                          tel: 'Telefon'
                          //isadmin: false
                      });
                      store.insert(0, r);
                      rowEditing.startEdit(0, 0);
                  }
              }, {
                  itemId: 'removeUser',
                  text: 'Kontakt löschen',
                  handler: function() {
                      var sm = grid.getSelectionModel();
                      rowEditing.cancelEdit();
                      store.remove(sm.getSelection());
                      if (store.getCount() > 0) {
                          sm.select(0);
                      }
                  },
                  disabled: true
              }],
              plugins: [rowEditing],
              listeners: {
                  'selectionchange': function(view, records) {
                      grid.down('#removeUser').setDisabled(!records.length);
                  }
              }
          });
          this.usersWin = Ext.create('Ext.Window', {
              title: 'Kontakte',
              width: 700,
              height: 400,
              plain: true,
              headerPosition: 'top',
              layout: 'fit',
              modal: true,
              // dont't destroy window onClose
              closeAction:'hide',
              items: [
                  grid
              ]
          });
        }
        this.usersWin.show();
    }
});