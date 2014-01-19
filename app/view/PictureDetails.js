/**
 * @class Bim.view.PictureDetails
 * @extends Ext.panel.Panel
 * @author Andreas Fachathaler
 *  
 */
Ext.define('Bim.view.PictureDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.picturedetails',
    //id: 'img-detail-panel',
    title: 'Bild Details',

    //width: 150,
    //minWidth: 150,

    tpl: [
        '<div class="details">',
            '<tpl for=".">',
                  '<img src="{url}&size=400x400" style="height:400px;" />',
//                '<a href="{url}" target="_blank"><img src="{url}&size=400x400" style="height:400px;" /></a>',
//                '<div class="details-info">',
//                    '<b>Name:</b>',
//                    '<span>{name}</span>',                    
//                    '<b>Datum:</b>',
//                    '<span>{date}</span>',
//                    '<b><a href="{curl}" target="_blank">Kommentar</a></b>',
//                    '<b><a href="{bpurl}" target="_blank">Plan</a></b>',
//                '</div>',
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
        this.addEvents('pictureselected');
        this.callParent();
    },

    loadRecord: function(picture) {
        this.body.hide();
        this.tpl.overwrite(this.body, picture);
        this.body.slideIn('l', {
            duration: 250
        });        
        this.el.down('img').on('click', function(){
          this.fireEvent('pictureselected', this, picture);
        }, this);
    },
    
    clear: function(){
        this.body.update('');
    }
});