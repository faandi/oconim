
Ext.define('Bim.view.Header', {
    extend: 'Ext.Container',
    alias: 'widget.bimHeader',
    xtype: 'bimHeader',
    id: 'bim-header',
    requires: ['Bim.view.UserDisplay'],
    height: 52,
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
            xtype: 'userdisplay'
        }];    
        this.callParent();
    },
    setUser: function(user) {
        this.down('userdisplay').setUser(user);
    }
});