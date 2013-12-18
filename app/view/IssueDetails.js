/**
 * @class Bim.view.IssueDetails
 * @extends Ext.panel.Panel
 * @author Andreas Fachathaler
 *  
 */
Ext.define('Bim.view.IssueDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.issuedetails',
    //id: 'img-detail-panel',
    title: 'Angelegenheit Details',

    //width: 150,
    //minWidth: 150,

    tpl: [
        '<div class="details">',
            '<tpl for=".">',
                '<div class="details-info">',
                    '<b>Betreff:</b><span>{subject}</span>',
                    '<b>Datum:</b><span>{dateCreated}</span>',
                    '<b>Art und Umfang:</b><span>{artUndUmfang}</span>',
                    '<b>Verursacher:</b><span>{verursacher}</span>',
                    '<b>Bemerkungen:</b><span>{bemerkungen}</span>',
                    '<b>Kennung – Schriftverkehr:</b><span>{kennung}</span>',
                '</div>',
                '<div class="details-info">',
                    '<img src="http://www.bauphilosophie.com/api/admin/pictures/content.json?id=Wien11_MautnerMarkhofgasse_56-60%2FBauteil+2+West%2FEG%2F2013-10-08+10.12.48.jpg&size=100x100&size=100x100" />',
                    '<img src="http://www.bauphilosophie.com/api/admin/pictures/content.json?id=Wien11_MautnerMarkhofgasse_56-60%2FBauteil+2+West%2FEG%2F2013-10-08+10.12.48.jpg&size=100x100&size=100x100" />',
                    '<img src="http://www.bauphilosophie.com/api/admin/pictures/content.json?id=Wien11_MautnerMarkhofgasse_56-60%2FBauteil+2+West%2FEG%2F2013-10-08+10.12.48.jpg&size=100x100&size=100x100" />',
                '</div>',
            '</tpl>',
        '</div>'
    ],

    initComponent: function() {            
        //this.html = 'ddd';         
         /*
         fbar: [
            { type: 'button', text: 'Button 1' }
          ] 
         */         
        this.callParent();
    },

    loadRecord: function(issue) {
        this.body.hide();
        this.tpl.overwrite(this.body, issue);
        this.body.slideIn('l', {
            duration: 250
        });
    },
    
    clear: function(){
        this.body.update('');
    }
});