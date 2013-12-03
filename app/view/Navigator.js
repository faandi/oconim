
// TODO: logik in controller (events, etc.)

Ext.define('Bim.view.Navigator', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigator',
    id: 'bim-navigator',   
    
    layout: {
        type: 'hbox'
    },
    // config
    adminMode: false,
    projectsCombo: null,    
    sitesCombo: null,
    placesCombo: null,
    // members
    adminMenu: null,
    
    initComponent: function() { 
        
        this.addEvents('projectselect','siteselect','placeselect');
        
        this.projectsCombo = Ext.create('Ext.form.field.ComboBox', {            
            fieldLabel: 'Projekt',
            store: 'Projects',
            displayField: 'name',
            typeAhead: true,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Projekt wählen ...',
            selectOnFocus: true,
            indent: true,
            forceSelection: true,
            labelAlign: 'right',
            labelWidth: 50,
            listeners:  {
                select: this.onProjectSelect,
                scope: this
            }
        });
        this.sitesCombo = Ext.create('Ext.form.field.ComboBox', {     
            name: 'sitecombo',
            fieldLabel: 'Bauplatz',
            store: 'Sites',
            displayField: 'name',
            typeAhead: true,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Bauplatz wählen ...',
            selectOnFocus: true,
            indent: true,
            forceSelection: true,
            labelAlign: 'right',
            labelWidth: 60,
            padding: '0 0 0 5',
            listeners:  {
                select: this.onSiteSelect,
                scope: this
            }
        });
        this.placesCombo = Ext.create('Ext.form.field.ComboBox', {     
            name: 'placecombo',
            fieldLabel: 'Ort',
            store: 'Places',
            displayField: 'name',
            typeAhead: true,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Ort wählen ...',
            selectOnFocus: true,
            indent: true,
            forceSelection: true,
            labelAlign: 'right',
            labelWidth: 25,
            padding: '0 0 0 5',
            listeners:  {
                select: this.onPlaceSelect,
                scope: this
            }
        });
        
        this.items = [            
            this.projectsCombo,
            this.sitesCombo,
            this.placesCombo
        ];
        
        if (this.adminMode) {
            this.tools = [{
                type: 'gear',
                adminTool: true,
                listeners: {
                    click: this.onAdminClicked,
                    scope: this
                }
            }];
        }
        
        this.callParent();
    },
   
    onProjectSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.sitesCombo.clearValue();
            this.fireEvent('projectselect', this, selected.data);
        }
    },
    
    onSiteSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.fireEvent('siteselect', this, selected.data);
        }
    },
    
    onPlaceSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.fireEvent('placeselect', this, selected.data);
        }
    },
    
    onAdminClicked: function (tool) {
        var panel = tool.toolOwner;
        var adminMenu = panel.adminMenu || (panel.adminMenu =
            Ext.widget({
                xtype: 'menu',
                items: [{
                    text: 'Kontakte',
                    checked: panel.region === 'north',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('north');
                    }
                },{
                    text: 'South',
                    checked: panel.region === 'south',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('south');
                    }
                },{
                    text: 'East',
                    checked: panel.region === 'east',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('east');
                    }
                },{
                    text: 'West',
                    checked: panel.region === 'west',
                    group: 'mainregion',
                    handler: function () {
                        panel.setBorderRegion('west');
                    }
                }]
            }));
        adminMenu.showBy(tool.el);
    }
    
});