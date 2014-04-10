
// TODO: logik in controller (events, etc.)

Ext.define('Bim.view.IssueNavigator', {
    extend: 'Ext.container.Container',
    alias: 'widget.issuenavigator',
    
    layout: {
        type: 'hbox'
    },    
    projectsCombo: null,    
    sitesCombo: null,
    placesCombo: null,
    
    initComponent: function() { 
        
        this.addEvents('projectselect','siteselect','placeselect');
        
        this.projectsCombo = Ext.create('Ext.form.field.ComboBox', {            
            fieldLabel: 'Projekt',
            store: 'AdminProjects',
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
            store: 'AdminSites',
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
            store: 'AdminPlaces',
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
        
        this.callParent();
    },
   
    onProjectSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.sitesCombo.clearValue();
            this.placesCombo.clearValue();
            this.fireEvent('projectselect', this, selected.data);
        }
    },
    
    onSiteSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.placesCombo.clearValue();
            this.fireEvent('siteselect', this, selected.data);
        }
    },
    
    onPlaceSelect: function(field, selections) {
        var selected = selections[0];
        if (selected) {
            this.fireEvent('placeselect', this, selected.data);
        }
    }
    
});