Ext.define('Admin.view.essai.EssaiList',{
    extend: 'Ext.container.Container',
    xtype: 'essai-list',

    cls: 'shadow',
    
    viewModel: {
        type: 'essai'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onEssaiListAfterRender'
    },

    items: [{
        xtype: 'gridpanel',
        height: 300,
        margin: '0 0 20px 0',
        itemId: 'grid-ujian',
        cls: 'ujian-grid',
        title: 'Data Ujian',
        store: {
            type: 'ujian'
        },
        scrollable: false,
        columns: [{
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            align: 'center',
            width: 70,
            renderer: 'getRowNumberGridUjian',
            text: 'No.'
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'nama',
            text: 'Nama',
            flex: 0.7
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'kelas',
            text: 'Kelas',
            align: 'center',
            flex: 0.7
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'mapel',
            text: 'Mapel',
            align: 'left',
            flex: 1.2
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'tanggal',
            text: 'Tanggal',
            align: 'center',
            flex: 0.7
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'jam',
            text: 'Jam',
            align: 'center',
            flex: 0.5
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'waktu',
            text: 'Waktu',
            align: 'center',
            flex: 0.5
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'guru',
            text: 'Guru',
            align: 'left',
            flex: 1.2
        }],

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: ['->', 
            {
                xtype: 'searchfield',
                flex: 1,
                store: {
                    type: 'ujian'
                }
            }]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            store: {
                type: 'ujian'
            }
        }],
        
        listeners: {
            selectionchange: 'onGridUjianSelectionChange'
        }
        
    },
    {
        xtype: 'panel',
        title: 'Soal Pilihan Ganda',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                reference: 'addButton',
                text:'Baru',
                iconCls:'x-fa fa-plus',
                handler: 'onAddButtonClick'
            }, '->', {
                xtype: 'searchfield',
                flex: 1,
                store: {
                    type: 'pilihanganda'
                }
            }]
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{essai_results}'
        }],

        items: [{
            xtype: 'dataview',
            itemId: 'grid-essai',
            flex: 1,
            maxHeight: 2400,
            cls: 'soal-all',
            bind: {
                store: '{essai_results}'
            },
            tpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="soal">',

                    '<div class="selector">',
                        '<button name="deleteButton" class="deletebtn">Delete</button>',
                        '<button name="editButton" class="editbtn">Edit</button>',
                    '</div>',
                            
                    '<div class="subtitle">PERTANYAAN</div>',
                    '{pertanyaan}',
                            
                    '<div class="subtitle">PEMBAHASAN</div>',
                    '{pembahasan}',

                '</div>',
                '<div style="display: none;">{[MathJax.Hub.Queue(["Typeset", MathJax.Hub])]}</div>',
            '</tpl>'),
            itemSelector: 'div.selector',
            //selectedItemCls: 'item-selected',
            listeners: {
                afterrender: 'onDataViewAfterRender',
                itemclick: 'onDataViewItemClick'
            }
        }]
    }]

});
