
// TODO: logik in controller (events, etc.)

Ext.define('Bim.view.UserDisplay', {
    extend: 'Ext.container.Container',
    alias: 'widget.userdisplay',   
    //requires: [
    //    'Ext.data.StoreManager'
    //],
    layout: {
        type: 'hbox'
    },    
    baseCls: 'userdisplay',
    cls: ['x-panel-header-text-container-default'],
    
    noUserText: 'Kein Benutzer angemeldet.',
    infoTpl: 'Angemeldet als {name} {surname}.',
    
    user: null,
    buttonItem: null,
    infoItem: null,
        
    initComponent: function() {
        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        //this.store = Ext.data.StoreManager.lookup(this.store || 'ext-empty-store');
        //this.store.on('load', this.onDataLoaded, this);     
        this.infoTpl = Ext.create('Ext.XTemplate', this.infoTpl);
        this.infoItem = Ext.create('Ext.Component', {
            text: this.noUserText,
            autoEl: 'span'
        });  
        this.buttonItem = Ext.create('Ext.Button', {
            text: 'Abmelden'
        });              
        this.items = [
            this.infoItem,
            this.buttonItem
        ];
        this.callParent();
    },
    
    setUser: function(user) {
        if (user) {
            this.infoItem.update(this.infoTpl.apply(user));
            //this.buttonItem.setText('Abmelden');
        } else {
            this.infoItem.update(this.noUserText);
            //this.buttonItem.setText('Anmelden');
        }
    }
    
    //onDataLoaded: function(store, records, successful, operation) {
    //    if (!successful) {
    //        return;
    //    }  
    //    this.update(this.tpl.apply(records[0].data));
    //}
    
    /*
     
    });
     */
});
