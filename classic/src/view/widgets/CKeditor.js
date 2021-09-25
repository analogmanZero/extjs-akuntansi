Ext.define('Admin.view.widgets.CKeditor', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'ckeditor',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    height: 370,

    constructor: function (config) {
        
        this.editorId = '_' + Math.random().toString(36).substr(2, 9);
        console.log('Generate:', 'elemen_ID: '+this.editorId);

        Ext.apply(config, {
            items: [{
                xtype: 'component',
                html: '<div id="'+this.editorId+'"></div>',
                flex: 1
            }]
        });

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        console.log('Use:', 'elemen_ID: '+me.editorId);
        ClassicEditor
        .create( document.querySelector( '#'+me.editorId ), {
        })
        .then( editor => {
            console.log( 'Editor was initialized', editor );
            me.editor = editor;

            /*me.editor.model.document.on('change:data', (evt, data) => {
                //console.log(editor.getData());
            });*/

            editor.editing.view.change(writer=>{
                console.log('agregator', me.height);
                writer.setStyle('height', (me.height-70)+'px', editor.editing.view.document.getRoot());
            });

        })
        .catch( err => {
            console.error( err.stack );
        });
    },

    getValue: function() {
        return this.editor.getData();
    },

    setValue: function(data) {
        this.editor.setData(data);
    }
});
