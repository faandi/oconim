/**
 * @class Bim.view.IssueDetails
 * @extends Ext.panel.Panel
 * @author Andreas Fachathaler
 *  
 */
Ext.define('Bim.view.IssueDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.issuedetails',
    xtype: 'issueDetails',
    //id: 'img-detail-panel',
    title: 'Angelegenheit Details',

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
        //allowBlank: false,
        readOnly: true
    });
    this.formCreated = Ext.create('Ext.form.field.Text', {     
        name: 'created',
        fieldLabel: 'Angelegt',
        labelWidth: 100,
        //allowBlank: false,
        readOnly: true
    });
    this.formModified = Ext.create('Ext.form.field.Text', {     
        name: 'modified',
        fieldLabel: 'Geändert',
        labelWidth: 100,
        //allowBlank: false,
        readOnly: true
    });
    this.formSubject = Ext.create('Ext.form.field.Text', {     
        name: 'subject',
        fieldLabel: 'Betreff',
        labelWidth: 100,
        //allowBlank: false,
        emptyText: 'Betreff',
        readOnly: true
    });    
    this.formToUser = Ext.create('Ext.form.field.Text', {     
        name: 'tousercombo',
        fieldLabel: 'Kontakt',
        labelWidth: 100,
        //allowBlank: false,
        emptyText: '',
        readOnly: true
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
        anchor: '100%',
        readOnly: true
    });
    this.formVerursacher = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'verursacher',
        fieldLabel: 'Verursacher',
        anchor: '100%',
        readOnly: true
    });
    this.formBemerkungen = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'bemerkungen',
        fieldLabel: 'Bemerkungen',
        anchor: '100%',
        readOnly: true
    });
    this.formKennung = Ext.create('Ext.form.field.TextArea', {        
        grow: true,
        name: 'kennung',
        fieldLabel: 'Kennung',
        anchor: '100%',
        readOnly: true
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
        ]
        ,buttons: [{
          id: 'sendmail',
          text: 'E-Mail senden',
          disabled: false
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
            store: 'AdminIssuePictures',
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
          }]
//        buttons: [{
//            id: 'addPicture',
//            text: 'Bild hinzufügen',
//            disabled: false,
//            scope: this
//          }, {
//            text: 'Bild entfernen',
//            disabled: true,
//            handler: function() {
//              alert('HA!!');
//            },
//            scope: this
//          }]
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
  }
  
});