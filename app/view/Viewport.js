
Ext.define('Bim.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
//        'Bim.view.PicturesList',
//        'Bim.view.PictureDetails',
        'Bim.view.Navigator',
        'Bim.view.Header'       
    ],
    layout: 'border',
    // modal: true,
    border: false,
    bodyBorder: false,

    initComponent: function() {
                
        this.items = [
        {
            region: 'north',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },            
            items: [{
                xtype:'bimHeader'
            }, {
                xtype:'navigator'
            }] 
//        },
//        {
//            region: 'west',
//            xtype: 'pictureslist',            
//            autoScroll: true,
//            width: 300,
//            collapsible: true,
//            split: true
//        },
//        {
//            region: 'center',
//            xtype: 'picturedetails'            
        }];

        this.callParent();
    }
});