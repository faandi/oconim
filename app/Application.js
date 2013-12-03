 
Ext.require('Ext.container.Viewport');

// TODO: get rid of global variable
var BimApp;

 Ext.application({
    name: 'Bim',
//    requires: ['Bim.view.LoginWindow'],    
//    models: ['Picture', 'Project', 'Site', 'User'],
//    stores: ['Pictures', 'Projects', 'Sites', 'Users', 'CurrentUser'],    
//    //stores: ['CurrentUser'],
//    controllers: ['Picture', 'Navigator', 'Header'],
    
    controllers: ['Navigator', 'Header'],
    
    viewport: null,
    autoCreateViewport: false,
        
    launch: function() {
//        // This is fired as soon as the page is ready
//        var userStore = this.getCurrentUserStore();  
//        userStore.load({
//            callback: this.onUserLoad,
//            scope: this
//        });
        BimApp = this;
        
        this.showViewPort();
    },
    
//    onUserLoad: function(records, operation, success) {
//        if (!success) {
//            Ext.Msg.alert('Error', 'Error requesting user.');
//            return;
//        }
//        if (records && records.length > 0) {
//            this.showViewPort();
//        } else {
//            this.showLogin();
//        }
//    },
    
    showViewPort: function() {        
         this.viewport = Ext.create('Bim.view.Viewport');
    }
    
//    showLogin: function() {
//        //this.viewport.destroy();
//        var loginwin = new Bim.view.LoginWindow({
//            modal: true,
//            nobackend: this.nobackend
//        });
//        loginwin.show();
//    },
//    
//    logOff: function() {
//        Ext.Ajax.request({
//            url: 'data/logoff.json',            
//            success: function(response){
//                // quick'n'dirty
//                window.location = '';
//            },
//            scope: this
//        });
//    },
//    
//    logOn: function(options) {
//        if (this.nobackend) {
//            this.nobackendLogOn(options);
//            return;
//        }
//        Ext.Ajax.request({
//            url: 'data/logon.json',
//            method: 'POST',
//            jsonData: {user:options.user,password:options.password},
//            success: function() {
//                options.success.apply(options.scope, [this]); 
//                this.showViewPort();
//            },
//            failure: function() {
//                options.failure.apply(options.scope, [this]);
//            }
//        });
//    },
//    
//    nobackendLogOn: function(options) {
//        var store = this.getStore('CurrentUser');
//        if (options.user === 'user' && options.password === 'user') {
//            store.setProxy({
//                type: 'rest',
//                url : 'data/currentuser-user.json',
//                reader: {
//                    root: 'results'
//                }
//            });
//            store.reload();
//            this.showViewPort();
//            options.success.apply(options.scope, [this]);
//        } else if (options.user === 'admin' && options.password === 'admin') {
//            store.setProxy({
//                type: 'rest',
//                url : 'data/currentuser-admin.json',
//                reader: {
//                    root: 'results'
//                }
//            });
//            store.reload();
//            this.showViewPort();
//            options.success.apply(options.scope, [this]); 
//        } else {
//            options.failure.apply(options.scope, [this]);
//        }
//    }    
});