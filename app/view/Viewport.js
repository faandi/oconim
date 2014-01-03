
Ext.define('Bim.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Bim.view.PicturesList',
        'Bim.view.PictureDetails',
        'Bim.view.IssuesList',
        'Bim.view.IssueDetails',
        'Bim.view.Navigator',
        'Bim.view.Header',
        'Ext.tab.Panel'
    ],
    layout: 'border',
    // modal: true,
    border: false,
    bodyBorder: false,
    id: 'mainviewport',

    initComponent: function() {
              
        var tabs = Ext.create('Ext.tab.Panel', {            
            tabPosition: 'left',
//            defaults: {
//                bodyPadding: 10
//            },
            items: [{
                title: 'Bilder',    
                layout: { 
                    type: 'border',                
                    border: false,
                    bodyBorder: false
                },
                items: [{
                    region: 'west',
                    xtype: 'pictureslist',            
                    autoScroll: true,
                    width: 300,
                    collapsible: true,
                    split: true
                 }, {
                    region: 'center',
                    xtype: 'picturedetails'
                }]
            },{
                title: 'Angelegenheiten',    
                layout: { 
                    type: 'border',                
                    border: false,
                    bodyBorder: false
                },
                items: [{
                    region: 'west',
                    xtype: 'issueslist',            
                    autoScroll: true,
                    width: 300,
                    collapsible: true,
                    split: true
                 }, {
                    region: 'center',
                    xtype: 'issuedetails'
                }]
            }]
        });
        
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
            },
            {
                region: 'center',
                layout: 'fit',
                items:[tabs]            
            }
        ];
        

        this.callParent();
    }
});