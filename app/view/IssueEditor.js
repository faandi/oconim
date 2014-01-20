
Ext.define('Bim.view.IssueEditor', {
  extend: 'Ext.window.Window',
  alias: 'widget.issueeditor',
//  requires: [
//    'Bim.view.PictureNavigator',
//    'Bim.view.PictureDetails',
//    'Bim.view.PicturesList'
//  ],
  layout: 'border',
  //border: false,
  //bodyBorder: false,  
  closeAction: 'hide',
  autoScroll: true,
  issue: null,  
  
  initComponent: function() {
    
    this.addEvents('addpicture');
        
    this.formId = Ext.create('Ext.form.field.Text', {     
        name: 'id',
        fieldLabel: 'ID',
        labelWidth: 100,
        allowBlank: false,
        readOnly: true
    });
    this.formCreated = Ext.create('Ext.form.field.Text', {     
        name: 'created',
        fieldLabel: 'Angelegt',
        labelWidth: 100,
        allowBlank: false,
        readOnly: true
    });
    this.formModified = Ext.create('Ext.form.field.Text', {     
        name: 'modified',
        fieldLabel: 'Geändert',
        labelWidth: 100,
        allowBlank: false,
        readOnly: true
    });
    this.formSubject = Ext.create('Ext.form.field.Text', {     
        name: 'subject',
        fieldLabel: 'Betreff',
        labelWidth: 100,
        allowBlank: false,
        emptyText: 'Betreff'
    });
    this.formToUser = Ext.create('Ext.form.field.ComboBox', {     
        name: 'tousercombo',
        fieldLabel: 'Kontakt',
        store: 'AdminUsers',
        displayField: 'username',
        valueField: 'id',
        //tpl: '<tpl for="."><div class="x-boundlist-item" >{name} {surname}</div></tpl>',
        //typeAhead: true,
        queryMode: 'local',
        triggerAction: 'all',
        emptyText: 'Kontakt wählen ...',
        selectOnFocus: true,
        //indent: true,
        forceSelection: true,
        //labelAlign: 'right',
        labelWidth: 100
    });

    var general = {
        xtype: 'fieldset',
        title: 'Allgemein',
        //defaultType: 'textfield',
        defaults: {
            //anchor: '100%'
        },
        items: [
            this.formId,
            this.formCreated,
            this.formModified,
            this.formSubject,
            this.formToUser
        ]
    };

    // 'artUndUmfang', 'verursacher', 'bemerkungen', 'kennung', 'dateCreated'

    this.formArtUndUmfang = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'artUndUmfang',
        fieldLabel: 'Art und Umfang',
        anchor: '100%'
    });
    this.formVerursacher = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'verursacher',
        fieldLabel: 'Verursacher',
        anchor: '100%'
    });
    this.formBemerkungen = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'bemerkungen',
        fieldLabel: 'Bemerkungen',
        anchor: '100%'
    });
    this.formKennung = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'kennung',
        fieldLabel: 'Kennung',
        anchor: '100%'
    });

    var texte = {
        xtype: 'fieldset',
        title: 'Texte',
        defaults: {
            //anchor: '100%'
        },
        items: [
            this.formArtUndUmfang,
            this.formVerursacher,
            this.formBemerkungen,
            this.formKennung
        ]
    };
    
    this.items = [
      {
        region: 'center',
        bodyPadding: 5,
        autoScroll: true,
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        items: [
          general,
          texte
        ],
        buttons: [{
          text: 'Speichern',
          disabled: false,
          formBind: true,
          handler: function() { this.saveIssue(); },
          scope: this
        }]
      },
      {
        //id: 'pictures',
        title: 'Bilder',
        region: 'east',
        xtype: 'panel',
        width: 250,
        collapsible: true,
        split: true,
        hideHeaders: true,
        items: [{        
            xtype: 'dataview',
            emptyText: 'Keine Bilder',
            store: 'AdminIssueEditPictures',
            itemSelector: 'div.tn-wrap',
            tpl: [
                '<tpl for=".">',
                  '<div class="tn-wrap">',
                  '<div class="tn">',
                  '<img src="{url}&size=100x100" style="width:100px;height:100px" />',
                  '</div>',
                  '</div>',
                '</tpl>'
            ]
        }],
        buttons: [{
          id: 'addPicture',
          text: 'Bild hinzufügen',
          disabled: false,
          scope: this
        }
//        ,{
//          id: 'removePicture',
//          text: 'Bild entfernen',
////          disabled: true,
////          handler: function() {
////            alert('HA!!');
////          },
////          scope: this
//        }
        ]
      }
    ];
    
    this.callParent();
  },
  
  setIssue: function(issue) {    
    if (issue) {
      this.formId.setValue(issue.getId());
      this.formCreated.setValue(issue.get('created'));
      this.formModified.setValue(issue.get('modified'));
      this.formSubject.setValue(issue.get('subject'));
      this.formToUser.setValue(issue.get('touser_id'));
      this.formArtUndUmfang.setValue(issue.get('artUndUmfang'));
      this.formVerursacher.setValue(issue.get('verursacher'));
      this.formBemerkungen.setValue(issue.get('bemerkungen'));
      this.formKennung.setValue(issue.get('kennung'));
    }
    this.issue = issue;
  },
  
  saveIssue: function() {
    this.issue.beginEdit();
    this.issue.set('subject', this.formSubject.getValue());
    this.issue.set('touser_id', this.formToUser.getValue());
    this.issue.set('artUndUmfang', this.formArtUndUmfang.getValue());
    this.issue.set('verursacher', this.formVerursacher.getValue());
    this.issue.set('bemerkungen', this.formBemerkungen.getValue());
    this.issue.set('kennung', this.formKennung.getValue());    
    //this.fireEvent('issuesave', this, this.issue);
    this.issue.endEdit();
  }
  
});