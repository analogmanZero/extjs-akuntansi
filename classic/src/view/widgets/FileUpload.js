Ext.define('Admin.view.widgets.FileUpload', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'fileupload',
                 
    layout: {
        type: 'vbox'
    },

    dest: './uploads/berkas',
    ext: 'pdf|doc|docx|mp3|mp4',
    filename: '',

    cls: 'fielupload',

    constructor: function (config) {
        var me = this;
        
        var prosesDeleteFile = function() {
            var filedownload = me.down('#filedownload');

            var data = new FormData();
            data.append('ax-file-name', me.filefield);
            data.append('ax-file-path', me.dest);
    
            Ext.Ajax.request({
                method:'POST',
                url: './server/public/file/delete',
                headers: { 'Content-Type':null },
                rawData: data,
                success: function(response) {
                    //console.log('Sukses', response);
                    var json = Ext.JSON.decode(response.responseText);
                    
                    me.filename = '';
                    filedownload.setVisible(false);
                },
    
                failure: function(response) {
                    //console.log('Gagal', response);
                    var json = Ext.JSON.decode(response.responseText);
    
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    
                }
            });
        };

        var processUpload = function(file, destination, ext, start) {
            var file_field   = me.down('#file_field');
            var pgbar        = me.down('#pgbar');
            var filedownload = me.down('#filedownload');
            var fldlText     = me.down('#filedownloadText');
            
            var bytes_per_chunk = 1024 * 1024 * 1;
            var size = file.size;
            var end = (start+bytes_per_chunk)>=size?size:(start+bytes_per_chunk);
            
            var data = new FormData();
            data.append('ax_file_input', file.slice(start, end));
            data.append('ax-file-path', destination);
            data.append('ax-allow-ext', ext);
            data.append('ax-file-name', file.name);
            data.append('ax-max-file-size', '10G');
            data.append('ax-start-byte', end);
            data.append('ax-last-chunk', end==size);
    
            Ext.Ajax.request({
                method:'POST',
                url: './server/public/upload.php',
                headers: { 'Content-Type':null },
                rawData: data,
                success: function(response) {
                    //console.log('Sukses', response);
                    var json = Ext.JSON.decode(response.responseText);
                    
                    var i = end/size;
                    pgbar.updateProgress(i, Math.round(100*i)+'% completed...');
                    if(json['status']==-1) {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: json['info'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn : function(buttonValue, inputText, showConfig) {
                                file_field.setVisible(true);
                                pgbar.setVisible(false);
                                
                                file_field.reset();
                            }
                        });
                    } else                
                    if(end==size) {
                        me.filename = json['name'];
                        //Ext.Msg.alert('Sukses', json['info'], function(btn, text) {    
                            file_field.setVisible(true);
                            pgbar.setVisible(false);
                            filedownload.setVisible(true);

                            fldlText.setHtml('<div class="filedownload"><a href="./server/public/uploads/berkas/'+me.filename+'" target="_blank">'+me.filename+'</a></div>');
                            file_field.reset();
                        //});
                    } else {
                        processUpload(file, destination, ext, end);
                    }
                },
    
                failure: function(response) {
                    //console.log('Gagal', response);
                    var json = Ext.JSON.decode(response.responseText);
    
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['info'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn : function(buttonValue, inputText, showConfig) {
                            file_field.setVisible(true);
                            pgbar.setVisible(false);
                            
                            file_field.reset();
                        }
                    });
                }
            });        
        };

        var onFileChanged = function(filefield) {
            var file_field   = me.down('#file_field');
            var pgbar        = me.down('#pgbar');
            
            file_field.setVisible(false);
            pgbar.setVisible(true);
            
            var file        = file_field.el.down('input[type=file]').dom.files[0];
            var start       = 0;

            pgbar.updateProgress(start, Math.round(100*start)+'% completed...');
            processUpload(file, me.dest, me.ext, start);
        };

        Ext.apply(config, {
            
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'filefield',
                    itemId: 'file_field',
                    width: 100,
                    buttonOnly: true,
                    buttonConfig: {
                        xtype: 'filebutton',
                        width: 100,
                        glyph:'',
                        iconCls: 'x-fa fa-cloud-upload-alt',
                        text: 'Browse'
                    },
                    
                    listeners: {
                        change: onFileChanged
                    },
                    allowBlank: true
                }, {
                    xtype: 'container',
                    itemId: 'filedownload',
                    layout: 'hbox',
                    margin: '0 0 0 5px',
                    items: [{
                        xtype: 'button',
                        width: 100,
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash-alt',
                        handler: prosesDeleteFile
                    }, {
                        xtype: 'component',
                        itemId: 'filedownloadText',
                        html: '<div class="filedownload"><a href="./resources/backsound.mp3" target="_blank">backsound.mp3</a></div>',
                    }],
                    hidden: true 
                }]  
            },
            {
                xtype: 'progressbar',
                width: '100%',
                itemId: 'pgbar',
                hidden: true
            }, 
            {
                xtype: 'component',
                itemId: 'keterangan',
                html: '<div class="keterangan">'+config.keterangan+'</div>',
                hidden: config.keterangan==null||config.keterangan=='' 
            }]

        });

        this.callParent(arguments);
    },

    getValue: function() {
        var me = this;
        return me.filename;
    },

    setValue: function(data) {
        var me = this;
        me.filename = data;
        
        var filedownload = me.down('#filedownload');
        var fldlText = me.down('#filedownloadText');
        
        fldlText.setHtml('<div class="filedownload"><a href="./server/public/uploads/berkas/'+data+'" target="_blank">'+data+'</a></div>');                     
        filedownload.setVisible(data!='');
    }
    
});
