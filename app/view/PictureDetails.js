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
                '<a href="{fullurl}" target="_blank"><img src="{nurl}" style="height:400px;" /></a>',
                '<div class="details-info">',
                    '<b>Name:</b>',
                    '<span>{name}</span>',                    
                    '<b>Ort:</b>',
                    '<span>{sitename}</span>',
                    '<b><a href="{curl}" target="_blank">Kommentar</a></b>',
                    '<b><a href="{bpurl}" target="_blank">Plan</a></b>',
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

    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function(picture) {
        this.body.hide();
        this.tpl.overwrite(this.body, picture);
        this.body.slideIn('l', {
            duration: 250
        });
    },
    
    clear: function(){
        this.body.update('');
    }
});