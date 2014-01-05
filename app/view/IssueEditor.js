
Ext.define('Bim.view.IssueEditor', {
  extend: 'Ext.window.Window',
  alias: 'widget.issueeditor',
//  requires: [
//    'Bim.view.PictureNavigator',
//    'Bim.view.PictureDetails',
//    'Bim.view.PicturesList'
//  ],
//  layout: 'border',
//  border: false,
//  bodyBorder: false,
  closeAction: 'hide',
  initComponent: function() {
    
    var subject = Ext.create('Ext.form.field.ComboBox', {     
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
        padding: '0 0 0 5'
    });

    this.items = [            
        subject
    ];        
    
    this.callParent();
  }
});