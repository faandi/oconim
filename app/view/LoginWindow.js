
// TODO: logik in controller (events, etc.)

Ext.define('Bim.view.LoginWindow', {
    extend: 'Ext.window.Window',
 
    requires: [ 'Ext.window.MessageBox' ],
 
    title: 'Anmelden',
    height: 220,
    width: 320,
    bodyPadding: 10,
    draggable: false,
    closable: false,
    
    // no backend, for testing & debugging
    nobackend: false,
    
    items: [
        {
            xtype:'textfield',
            allowBlank: false,
            fieldLabel: 'Benutzer',
            name: 'user',
            emptyText: 'Ihr Benutzername'
        },
        {
            xtype:'textfield',
            allowBlank: false,
            fieldLabel: 'Passwort',
            name: 'passwd',
            emptyText: 'Ihr Passwort',
            inputType: 'password'
        }        
        //{
        //    xtype:'checkbox',
        //    fieldLabel: 'Remember me',
        //    name: 'remember'
        //}
    ],
    
    initComponent: function() {
        this.buttons= [{ 
            text:'Login',
             listeners: {
                click: {
                    fn: this.onLoginClick,
                    scope: this
                }
            }            
        }];
        if (this.nobackend) {
            this.items.push({
                xtype:'component',
                html:'<b>Zum Testen als Administrator:</b> Benutzer admin, Passwort admin'
            });
            this.items.push({
                xtype:'component',
                html:'<b>Zum Testen als normaler Benutzer:</b> Benutzer user, Passwort user'
            });
        }
        this.callParent(arguments);
    },
 
    onLoginClick: function() {
       var userField = this.down('textfield[name=user]');
       var passwdField = this.down('textfield[name=passwd]');
       if (!userField.validate() || !passwdField.validate()) {
           Ext.Msg.alert('Anmeldung fehlgeschlagen', 'Ungültige Eingabe.');
           return;
       }
       var user = Ext.String.trim(userField.getValue());
       var passwd = Ext.String.trim(passwdField.getValue());      
       this.logOn(user, passwd);
    },
    
    logOn: function(user, passwd) {
        BimApp.logOn({
            user: user,
            password: passwd,
            failure: function() {
                Ext.Msg.alert('Anmeldung fehlgeschlagen', 'Benutzer oder Passwort ungültig.');
            },
            success: function() {
                this.close();
            },
            scope:this
        });
    }
 
});